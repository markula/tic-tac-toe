const _ = require('lodash');

let Game = function(options) {
  this.numRows = _.get(options, 'boardSize', 3);
  this.numCols = _.get(options , 'boardSize', 3);
}

module.exports = Game;