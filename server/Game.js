const crypto = require('crypto');
const _ = require('lodash');
const Promise = require('bluebird');
const jsonfile = require('jsonfile');

const defaultWinData = {
  winner: false,
  pId: 0
}

const Game = function(gData) {
  this.boardSize = _.get(gData, 'boardSize', 3);
  this.pId = _.get(gData, 'pId', 1);
  this.id = _.get(gData, 'id', this.generateId());
  this.rows = _.get(gData, 'rows', this.createRows());
  this.moves = _.get(gData, 'moves', []);
  this.winData = _.get(gData, 'winData', _.clone(defaultWinData));
  return this;
}

Game.prototype.generateId = function() {
  let secret = Date.now()+'';
  return crypto.createHash('md5').update(secret).digest('hex');
}

Game.prototype.createRows = function(boardSize) {
  let i = 0;
  let rows = [];
  while(i < this.boardSize) {
    rows.push(this.createRow(i+1));
    i++;
  }
  return rows;
}

Game.prototype.createRow = function(id) {
  let row = { id: id, cells: [] };
  let i = 0;

  while(i < this.boardSize) {
    row.cells.push({ id: i+1, val: 0 });
    i++;
  }
  return row;
}

Game.prototype.saveGame = function() {
  let fileName = `/tmp/${this.id}.json`;

  return new Promise((resolve, reject) => {
    let gameData = _.omit(this, 'pId');
    jsonfile.writeFile(fileName, gameData, (err, stats) => {
      if(err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
}

Game.prototype.addMove = function(move) {
  let pId = +move.pId;
  let row = +move.row - 1;
  let cell = +move.cell - 1;

  this.moves.push(move);
  this.rows[row].cells[cell].val = pId;
}

Game.prototype.userCanMove = function(move) {
  if(!this.moves.length) {
    return +move.pId === 1;
  }

  let lastMove = this.moves[this.moves.length - 1];
  return +lastMove.pId !== +move.pId;
}

Game.prototype.makeMove = function(move) {
  let that = this;
  let pId = +move.pId;
  let row = +move.row - 1;
  let cell = +move.cell - 1;

  // console.log(that.winData);

  return new Promise((resolve, reject) => {
    if(that.userCanMove(move) 
       && that.winData.pId === 0
       && that.rows[row].cells[cell].val === 0) {
      that.rows[row].cells[cell].val = pId;
      that.moves.push(move);
      that.checkForWin();
      that.saveGame();
      resolve(that.winData);
    } else {
      reject({ message: 'invalid move', move: move });
    }
  });
}

// validation
Game.prototype.checkForWin = function() {
  let p1val = this.boardSize;
  let p2val = this.boardSize * 2;
  console.log(p1val, p2val);
  let winData = _.clone(defaultWinData);
  //rows
  winData = _.assignIn(winData, this.checkRowsForWin(p1val, p2val));
  //cols
  winData = _.assignIn(winData, this.checkColsForWin(p1val, p2val));
  //diagonal
  winData = _.assignIn(winData, this.checkDiagonalsForWin(p1val, p2val));

  return winData;
}

Game.prototype.checkRowsForWin = function(p1, p2) {
  let winData = {};

  _.forEach(this.rows, (row) => {
    let cellCount = 0;
    let rowSum = _.sumBy(row.cells, (cell) => { 
      if(cell.val > 0) {
        cellCount++;
      }
      return cell.val 
    });

    if(rowSum === p1 && cellCount === this.boardSize) {
      winData = _.assignIn(defaultWinData, { winner: true, pId: 1 });
      return false;
    } else if (rowSum === p2) {
      winData = _.assignIn(defaultWinData, { winner: true, pId: 2 });
      return false;
    }
  });

  return {};
}

Game.prototype.checkColsForWin = function(p1, p2) {
  let i = 0;
  let winData = {};

  while (i < this.boardSize) {
    let cellCount = 0;
    let colSum = _.sumBy(this.rows, (row) => {
      if(row.cells[i].val > 0) {
        cellCount++;
      } 
      return row.cells[i].val;
    });

    if(colSum === p1 && cellCount === this.boardSize) {
      winData = _.assignIn(defaultWinData, { winner: true, pId: 1 });
      break;
    } else if (colSum === p2) {
      winData = _.assignIn(defaultWinData, { winner: true, pId: 2 });
      break;
    }

    i++;
  }

  return winData;
}

Game.prototype.checkDiagonalsForWin = function(p1, p2) {
  let tDown = 0;
  let bUp = 0;
  let tDownCount = 0;
  let bUpCount = 0;
  let winData = {};
  let that = this;

  _.forEach(this.rows, (row) => {
    if(row.cells[row.id-1].val > 0) {
      tDownCount++;
    }

    if(row.cells[that.boardSize-row.id].val > 0) {
      bUpCount++;
    }
    tDown += row.cells[row.id-1].val;
    bUp += row.cells[that.boardSize-row.id].val;
  });

  if(tDown === p1 || bUp === p1 && (tDownCount === this.boardSize || bUpCount === this.boardSize)) {
    winData = _.assignIn(defaultWinData, { winner: true, pId: 1 });
  } else if (tDown === p2 || bUp === p2) {
    winData = _.assignIn(defaultWinData, { winner: true, pId: 2 });
  }

  return winData;
}


module.exports = Game;