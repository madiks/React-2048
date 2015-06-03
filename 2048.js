function init(n){
  var gameMap = [];
  for (var i = 0; i < n; i++) {
    var tmp = [];
    for (var j = 0; j < n; j++) {
      tmp.push(0);
    }
    gameMap.push(tmp);
  }
  return gameMap;
}

var MapLen = 4;
var MaxScore = 2048;
var gameData = init(MapLen);

function display(gameData){
  gameData.forEach(function(elem){
    console.log(elem);
  });
}

//display(gameData);

function checkGameStatusOrAddTile(gameData, MaxScore){
  var state;
  var pool = [];
  gameData.forEach(function(row, keyRow){
    row.forEach(function(elem, keyCol){
      if(elem >= MaxScore){
        state = true;
      }else if (elem === 0){
        pool.push({x: keyCol, y: keyRow});
      }
    });
  });
  if(state === true){
    return true;
  }
  if(pool.length === 0){
    return false;
  }
  var pos = pool[Math.floor(Math.random() * pool.length)];
  return pos;
}

function getRandomNum(){
  var set = [2, 2, 2, 4];
  var num = set[Math.floor(Math.random() * set.length)];
  return num;
}

function fillTile(gameData, tile, num){
  gameData[tile.x][tile.y] = num;
  return gameData;
}


var tile = checkGameStatusOrAddTile(gameData, MaxScore);
//console.log(tile);
var num = getRandomNum();
//console.log(num);

gameData = fillTile(gameData, tile, num);

tile = checkGameStatusOrAddTile(gameData, MaxScore);
//console.log(tile);
num = getRandomNum();
//console.log(num);

gameData = fillTile(gameData, tile, num);
display(gameData);

function slideTo(direction, gameData){
  switch(direction){
    case 'top':
      var gd = slideToTop(gameData);
    break;

    case 'bottom':
      var gd = slideToBottom(gameData);
    break;

    case 'left':
      var gd = slideToLeft(gameData);
    break;

    case 'right':
      var gd = slideToRight(gameData);
    break;
  }
  return gd;
}

function slideToTop(gd){
  var gd = MirrorV(gd);
  gd = MirrorV(gd);
  var MapLen = gd.length;
  for(var y = 1; y < MapLen; y++){
    //console.log(gd[y]);
    for (var x = 0; x < MapLen; x++) {
      //console.log(gd[y][x]);
      var tmpY = y;
      while(tmpY > 0){
        if(gd[tmpY][x] !== 0){
          if(gd[tmpY][x] === gd[tmpY-1][x]){
            gd[tmpY-1][x] = 2 * gd[tmpY][x];
            gd[tmpY][x] = 0;
          }else if(gd[tmpY-1][x] === 0){
            gd[tmpY-1][x] = gd[tmpY][x];
            gd[tmpY][x] = 0;
          }
        }
        tmpY--;
      }
    };
  }
  return gd;
}

function slideToBottom(gameData) {
  var gd = MirrorV(gameData);
  gd = slideToTop(gd);
  gd = MirrorV(gd);
  return gd;
}

function slideToLeft(gameData){
  var gd = Right90(gameData);
  gd = slideToTop(gd);
  gd = Left90(gd);
  return gd;
}

function slideToRight(gameData){
  var gd = Left90(gameData);
  gd = slideToTop(gd);
  gd = Right90(gd);
  return gd;
}

function Right90(gameData){
  var MapLen = gameData.length;
  var gd = init(MapLen);
  gameData.forEach(function(row, x){
    row.forEach(function(elem, y){
      gd[y][MapLen-x-1] = elem;
    });
  })
  return gd;
}

function Left90(gameData) {
  var MapLen = gameData.length;
  var gd = init(MapLen);
  gameData.forEach(function(row, x){
    row.forEach(function(elem, y){
      gd[MapLen-y-1][x] = elem;
    });
  })
  return gd;
}

function MirrorV(gameData) {
  var MapLen = gameData.length;
  var gd = init(MapLen);
  gameData.forEach(function(row, x){
    row.forEach(function(elem, y){
      gd[MapLen-x-1][y] = elem;
    });
  })
  return gd;
}

console.log('source:')
display(gameData);
var gd = slideTo('top', gameData);
console.log('slideTo top');
display(gd);

console.log('source:')
display(gameData);
var gd = slideTo('bottom', gameData);
console.log('slideTo bottom');
display(gd);

console.log('source:')
display(gameData);
var gd = slideTo('left', gameData);
console.log('slideTo left');
display(gd);

console.log('source:')
display(gameData);
var gd = slideTo('right', gameData);
console.log('slideTo right');
display(gd);
