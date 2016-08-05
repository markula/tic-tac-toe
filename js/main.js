define(function(require) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var GameBoardView = require('views/GameBoardView');
  var GameModel = require('models/GameModel');

  $(document).ready(function() {

    var gameBoardView = new GameBoardView({
      el: '.board',
      model: new GameModel(gameData)
    });
  });
});