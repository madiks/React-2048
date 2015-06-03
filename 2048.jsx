var Heading_Socre_Board = React.createClass({
  render: function(){
    return (
      <div className="score-container">{this.props.score}</div>
    );
  }
});

var Heading_Bestsocre_Board = React.createClass({
  render: function(){
    return (
      <div className="best-container">{this.props.bestScore}</div>
    );
  }
});

var Game_Heading = React.createClass({
  render: function(){
    return (
      <div className="heading">
        <h1 className="title">2048</h1>
        <div className="scores-container">
          <Heading_Socre_Board score={this.props.scoreBoard.score} />
          <Heading_Bestsocre_Board bestScore={this.props.scoreBoard.bestScore} />
        </div>
      </div>
    );
  }
});

var Restart_Btn = React.createClass({
  render: function(){
    return (
      <a className="restart-button" onClick={this.props.handleNewGame} >New Game</a>
    );
  }
});

var Game_Toolbar = React.createClass({
  render: function(){
    return (
      <div className="above-game">
        <p className="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p>
        <Restart_Btn handleNewGame={this.props.handleNewGame} />
      </div>
    );
  }
});

var TryAgain_Btn = React.createClass({
  render: function(){
    return (
      <a className="retry-button" onClick={this.props.handleNewGame} >Try again</a>
    );
  }
});

var KeepPlaying_Btn = React.createClass({
  render: function(){
    return (
      <a className="keep-playing-button" onClick={this.props.handleNewGame} >Keep going</a>
    );
  }
});

var Game_Msg = React.createClass({
  calGameStatus: function(){
    var classArr = ["game-message"];
    var msg = "";
    if(this.props.status === 'lose'){
      classArr.push("game-over");
      msg = "You lose!";
    }
    if(this.props.status === 'win'){
      classArr.push("game-won");
      msg = "You Win!";
    }
    return {classStr: classArr.join(" "), msg: msg};
  },
  render: function(){
    var gameStatus = this.calGameStatus();
    return (
      <div className={gameStatus.classStr}>
        <p>{gameStatus.msg}</p>
        <div className="lower">
          <KeepPlaying_Btn handleNewGame={this.props.handleNewGame} />
          <TryAgain_Btn handleNewGame={this.props.handleNewGame} />
        </div>
      </div>
    );
  }
});

var Grid_Container = React.createClass({
  render: function(){
    return (
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
      </div>
    );
  }
});

var Tile = React.createClass({
  calTileClass: function(){
    var classArr = ["tile"];
    classArr.push("tile-"+this.props.tile.v);
    classArr.push("tile-position-"+(this.props.keyCol+1)+"-"+(this.props.keyRow+1));
    if(this.props.tile.isNew){
      classArr.push("tile-new");
    }
    if(this.props.tile.isMerged){
      classArr.push("tile-merged");
    }
    return classArr.join(" ");
  },
  render: function(){
    return (
      <div className={this.calTileClass()}>
        <div className="tile-inner">{this.props.tile.v}</div>
      </div>
    );
  }
});

var Tile_Container = React.createClass({
  render: function(){
    var tiles = [];
    this.props.tileSet.forEach(function(row, keyRow){
      row.forEach(function(elem, keyCol){
        if(elem.v > 0){
          tiles.push(<Tile tile={elem} keyCol={keyCol} keyRow={keyRow} />);
        }
      }.bind(this));
    }.bind(this));
    return (
      <div className="tile-container">
        {tiles}
      </div>
    );
  }
});

var Game_Container = React.createClass({
  render: function(){
    return (
      <div className="game-container">
        <Game_Msg handleNewGame={this.props.handleNewGame} status={this.props.gameData.status} />
        <Grid_Container />
        <Tile_Container tileSet={this.props.gameData.tileSet} />
      </div>
    );
  }
});

var Game2048 = React.createClass({
  getInitialState: function(){
    return {gameData: startGame()};
  },
  handleNewGame: function(){
    this.setState({gameData: startGame()});
  },
  handleKeyPress: function(e){
    console.log(e.which);
    var gd = slideTo(e.which, this.state.gameData);
    this.setState({gameData: gd});
  },
  componentDidMount: function(){
    $(document).keydown(this.handleKeyPress);
  },
  render: function(){
    return (
      <div id="game2048">
        <Game_Heading scoreBoard={this.state.gameData.scoreBoard} />
        <Game_Toolbar handleNewGame={this.handleNewGame} />
        <Game_Container gameData={this.state.gameData} handleNewGame={this.handleNewGame} />
      </div>
    );
  }
});

React.render(
  <Game2048 />,
  document.getElementById('stage')
);
