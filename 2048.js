function init(n){
  var gameMap = [];
  for (var i = 0; i < n; i++) {
    var tmp = [];
    for (var j = 0; j < n; j++) {
      tmp.push({v: 0, isNew: false, isMerged: false});
    }
    gameMap.push(tmp);
  }
  return gameMap;
}

function display(gameData){
  gameData.forEach(function(elem){
    console.log(elem);
  });
}

function checkGameStatusOrAddTile(gameData, MaxScore){
  var state;
  var pool = [];
  gameData.forEach(function(row, keyRow){
    row.forEach(function(elem, keyCol){
      if(elem.v >= MaxScore){
        state = true;
      }else if (elem.v === 0){
        pool.push({x: keyCol, y: keyRow});
      }
      elem.isNew = false;
      elem.isMerged = false;
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

function getRandomTile(){
  var set = [2, 2, 2, 2, 2, 4];
  var num = set[Math.floor(Math.random() * set.length)];
  return {v: num, isNew: true, isMerged: false};
}

function fillTile(gameData, pos, tile){
  gameData[pos.x][pos.y] = tile;
  return gameData;
}


function startGame(){
  var score = 0;
  var bestScore = 0;
  var status = 'runing';
  var MapLen = 4;
  var MaxScore = 2048;
  var gameData = init(MapLen);
  for(i = 0; i < 2; i++){
    var pos = checkGameStatusOrAddTile(gameData, MaxScore);
    var tile = getRandomTile();
    gameData = fillTile(gameData, pos, tile);
  }
  return {tileSet: gameData, scoreBoard: {score: score, bestScore: bestScore}, status: status};
}

function addNewTile(gd){
  var pos = checkGameStatusOrAddTile(gd.gameData, 2048);
  if(pos === true){
    return true;
  }
  if(pos === false){
    return false;
  }
  var tile = getRandomTile();
  var gameData = fillTile(gd.gameData, pos, tile);
  return {gameData: gameData, scoreBoard: gd.scoreBoard};
}

// var tile = checkGameStatusOrAddTile(gameData, MaxScore);
// //console.log(tile);
// var num = getRandomTile();
// //console.log(num);

// gameData = fillTile(gameData, tile, num);

// tile = checkGameStatusOrAddTile(gameData, MaxScore);
// //console.log(tile);
// num = getRandomTile();
// //console.log(num);

// gameData = fillTile(gameData, tile, num);
// display(gameData);

function slideTo(keyCode, gameData){
  switch(keyCode){
    case 38:
      var gd = slideToTop(gameData);
    break;

    case 40:
      var gd = slideToBottom(gameData);
    break;

    case 37:
      var gd = slideToLeft(gameData);
    break;

    case 39:
      var gd = slideToRight(gameData);
    break;
  }
  return gd;
}

function slideToTop(gameData){
  var MapLen = gameData.gameData.length;
  for(var y = 1; y < MapLen; y++){
    //console.log(gameData.gameData[y]);
    for (var x = 0; x < MapLen; x++) {
      //console.log(gameData.gameData[y][x]);
      var tmpY = y;
      while(tmpY > 0){
        if(gameData.gameData[tmpY][x].v !== 0){
          if(gameData.gameData[tmpY][x].v === gameData.gameData[tmpY-1][x].v){
            gameData.gameData[tmpY-1][x].v = 2 * gameData.gameData[tmpY][x].v;
            gameData.gameData[tmpY-1][x].isMerged = true;
            gameData.scoreBoard.score += 2 * gameData.gameData[tmpY][x].v;
            if(gameData.scoreBoard.score > gameData.scoreBoard.bestScore){
              gameData.scoreBoard.bestScore = gameData.scoreBoard.score;
            }
            gameData.gameData[tmpY][x] = {v: 0, isNew: false, isMerged: false};
          }else if(gameData.gameData[tmpY-1][x].v === 0){
            gameData.gameData[tmpY-1][x].v = gameData.gameData[tmpY][x].v;
            gameData.gameData[tmpY][x] = {v: 0, isNew: false, isMerged: false};
          }
        }
        tmpY--;
      }
    };
  }
  return gameData;
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
  var MapLen = gameData.gameData.length;
  var gd = init(MapLen);
  gameData.gameData.forEach(function(row, x){
    row.forEach(function(elem, y){
      gd[y][MapLen-x-1] = elem;
    });
  })
  return {gameData: gd, scoreBoard: gameData.scoreBoard};
}

function Left90(gameData) {
  var MapLen = gameData.gameData.length;
  var gd = init(MapLen);
  gameData.gameData.forEach(function(row, x){
    row.forEach(function(elem, y){
      gd[MapLen-y-1][x] = elem;
    });
  })
  return {gameData: gd, scoreBoard: gameData.scoreBoard};
}

function MirrorV(gameData) {
  var MapLen = gameData.gameData.length;
  var gd = init(MapLen);
  gameData.gameData.forEach(function(row, x){
    row.forEach(function(elem, y){
      gd[MapLen-x-1][y] = elem;
    });
  })
  return {gameData: gd, scoreBoard: gameData.scoreBoard};
}

// console.log('source:')
// display(gameData);
// var gd = slideTo('top', gameData);
// console.log('slideTo top');
// display(gd);

// console.log('source:')
// display(gameData);
// var gd = slideTo('bottom', gameData);
// console.log('slideTo bottom');
// display(gd);

// console.log('source:')
// display(gameData);
// var gd = slideTo('left', gameData);
// console.log('slideTo left');
// display(gd);

// console.log('source:')
// display(gameData);
// var gd = slideTo('right', gameData);
// console.log('slideTo right');
// display(gd);
