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

function checkGameStatusAndAddTile(gd, MaxScore){
  var state;
  var pool = [];
  gd.tileSet.forEach(function(row, keyRow){
    row.forEach(function(elem, keyCol){
      if(elem.v >= MaxScore){
        state = true;
      }else if (elem.v === 0){
        pool.push({x: keyRow, y: keyCol});
      }
    });
  });
  //console.log(gd.tileSet);
  if(state === true){
    gd.status = 'win';
    return gd;
  }
  if(pool.length === 0){
    gd.status = 'lose';
    return gd;
  }
  var pos = pool[Math.floor(Math.random() * pool.length)];
  var tile = getRandomTile();
  return fillTile(gd, pos, tile);
}

function clearTileSetStatus(gd){
  gd.tileSet.forEach(function(row, keyRow){
    row.forEach(function(elem, keyCol){
      gd.tileSet[keyRow][keyCol].isNew = false;
      gd.tileSet[keyRow][keyCol].isMerged = false;
    });
  });
  return gd;
}

function getRandomTile(){
  var set = [2, 2, 2, 2, 2, 4];
  var num = set[Math.floor(Math.random() * set.length)];
  return {v: num, isNew: true, isMerged: false};
}

function fillTile(gd, pos, tile){
  gd.tileSet[pos.x][pos.y] = tile;
  return gd;
}


function startGame(){
  var score = 0;
  var bestScore = window.localStorage.getItem('bestScore');
  bestScore = bestScore ? bestScore : 0;
  var status = 'runing';
  var MapLen = 4;
  var MaxScore = 2048;
  var gameData = init(MapLen);
  var gd = {tileSet: gameData, scoreBoard: {score: score, bestScore: bestScore}, status: status};
  for(i = 0; i < 2; i++){
    gd = addNewTile(gd, MaxScore);
  }
  return gd;
}

function addNewTile(gd, MaxScore){
  var gd = checkGameStatusAndAddTile(gd, MaxScore);
  return gd;
}


function slideTo(direction, gd){
  switch(direction){
    case 'up':
      gd = clearTileSetStatus(gd);
      gd = slideToTop(gd);
    break;

    case 'down':
      gd = clearTileSetStatus(gd);
      gd = slideToBottom(gd);
    break;

    case 'left':
      gd = clearTileSetStatus(gd);
      gd = slideToLeft(gd);
    break;

    case 'right':
      gd = clearTileSetStatus(gd);
      gd = slideToRight(gd);
    break;
  }
  gd = addNewTile(gd, 2048);
  return gd;
}

function slideToTop(gd){
  var tl = gd.tileSet.length;
  var changed = false;
  var notfull = false;
  for (var i = 0; i < tl; i++ ){

    var np = tl;
    var n = 0; // 统计每一列中非零值的个数

    // 向上移动非零值，如果有零值元素，则用非零元素进行覆盖
    for(var x = 0; x < np; x++) {
      if (gd.tileSet[x][i].v != 0) {
        gd.tileSet[n][i].v = gd.tileSet[x][i].v;
        if (n != x) {
          changed = true; // 标示数组的元素是否有变化
        }
        n++;
      }
    }
    if (n < tl) {
      notfull = true;
    }
    np = n;
    // 向上合并所有相同的元素
    for( var u = 0; u < np-1; u++) {
      if (gd.tileSet[u][i].v == gd.tileSet[u+1][i].v) {
        gd.tileSet[u][i].v *= 2;
        gd.tileSet[u][i].isMerged = true;
        gd.tileSet[u+1][i] = {v: 0, isNew: false, isMerged: false};
        gd.scoreBoard.score += gd.tileSet[u][i].v * 2; // 计算游戏分数
        if(gd.scoreBoard.score > gd.scoreBoard.bestScore){
          gd.scoreBoard.bestScore = gd.scoreBoard.score;
          window.localStorage.setItem('bestScore', gd.scoreBoard.bestScore);
        }
        u++;
        changed = true;
      }
    }
    // 合并完相同元素以后，再次向上移动非零元素
    n = 0;
    for (var t = 0; t < np; t++) {
      if (gd.tileSet[t][i].v != 0 ){
        gd.tileSet[n][i] = gd.tileSet[t][i]
        n++
      }
    }
    // 对于没有检查的元素
    for (var o = n; o < tl; o++) {
      gd.tileSet[o][i] = {v: 0, isNew: false, isMerged: false};
    }
  }
  return gd;
}

function slideToBottom(gd) {
  gd = MirrorV(gd);
  gd = slideToTop(gd);
  gd = MirrorV(gd);
  return gd;
}

function slideToLeft(gd){
  gd = Right90(gd);
  gd = slideToTop(gd);
  gd = Left90(gd);
  return gd;
}

function slideToRight(gd){
  gd = Left90(gd);
  gd = slideToTop(gd);
  gd = Right90(gd);
  return gd;
}

function Right90(gd){
  var MapLen = gd.tileSet.length;
  var newGd = init(MapLen);
  gd.tileSet.forEach(function(row, x){
    row.forEach(function(elem, y){
      newGd[y][MapLen-x-1] = elem;
    });
  })
  gd.tileSet = newGd;
  return gd;
}

function Left90(gd) {
  var MapLen = gd.tileSet.length;
  var newGd = init(MapLen);
  gd.tileSet.forEach(function(row, x){
    row.forEach(function(elem, y){
      newGd[MapLen-y-1][x] = elem;
    });
  })
  gd.tileSet = newGd;
  return gd;
}

function MirrorV(gd) {
  var MapLen = gd.tileSet.length;
  var newGd = init(MapLen);
  gd.tileSet.forEach(function(row, x){
    row.forEach(function(elem, y){
      newGd[MapLen-x-1][y] = elem;
    });
  })
  gd.tileSet = newGd;
  return gd;
}
