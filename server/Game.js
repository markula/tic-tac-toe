const crypto = require('crypto');
const _ = require('lodash');
const Promise = require('bluebird');
const jsonfile = require('jsonfile');

const Game = function(gData) {
  this.boardSize = _.get(gData, 'boardSize', 3);
  this.pId = _.get(gData, 'pId', 1);
  this.id = _.get(gData, 'id', this.generateId());
  this.rows = _.get(gData, 'rows', this.createRows());
  this.moves = _.get(gData, 'moves', []);
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
  this.moves.push(move);
}

Game.prototype.userCanMove = function(move) {
  console.log(this.moves);

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

  return new Promise((resolve, reject) => {
    if(that.userCanMove(move) 
       && that.rows[row].cells[cell].val === 0) {

      that.rows[row].cells[cell].val = pId;
      that.moves.push(move);
      that.saveGame();
      resolve();
    } else {
      reject({ message: 'invalid move', move: move });
    }
  });
}

// validation
Game.prototype.isValidMove

module.exports = Game;