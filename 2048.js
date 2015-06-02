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

function checkGameStatusOrAddTile(gameData, MapLen, MaxScore){
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


var tile = checkGameStatusOrAddTile(gameData, MapLen, MaxScore);
//console.log(tile);
var num = getRandomNum();
//console.log(num);

gameData = fillTile(gameData, tile, num);

tile = checkGameStatusOrAddTile(gameData, MapLen, MaxScore);
//console.log(tile);
num = getRandomNum();
//console.log(num);

gameData = fillTile(gameData, tile, num);
display(gameData);

function slideTo(direction, gameData){
  switch(direction){
    case 'top':

    break;

    case 'bottom':
    break;

    case 'left':
    break;

    case 'right':
    break;
  }
  return gameData;
}

function slideToTop(gameData){
  console.log('top');
  for(var y = 1; y < gameData.length; y++){
    console.log(gameData[y]);
    console.log('---');
    for (var x = 0; x < gameData[y].length; x++) {

    };
  }
  return gameData;
}

var gameData = slideToTop(gameData);
display(gameData);
