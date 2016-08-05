define(function(require) {
  var Backbone = require('backbone');
  var GameBoardView = require('views/GameBoardView');
  var GameModel = require('models/GameModel');

  var gameBoardView = new GameBoardView({
    el: '.board',
    model: new GameModel(gameData)
  });
});