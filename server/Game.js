const crypto = require('crypto');
const _ = require('lodash');
const Promise = require('bluebird');
const jsonfile = require('jsonfile');

const Game = function(gData) {
  this.boardSize = _.get(gData, 'boardSize', 3);
  this.id = _.get(gData, 'id', this.generateId());
  this.rows = _.get(gData, 'rows', this.createRows());
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
  console.log('saving game');

  return new Promise((resolve, reject) => {
    jsonfile.writeFile(fileName, this, (err, stats) => {
      if(err) {
        // console.log('err', err);
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
}

module.exports = Game;