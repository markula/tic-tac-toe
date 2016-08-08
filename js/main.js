define(function(require) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var GameBoardView = require('views/GameBoardView');
  var GameModel = require('models/GameModel');
  var io = require('socket.io');

  $(document).ready(function() {
    var socket = io.connect(window.location.origin+'/game');
    socket.on('connect', function() {
      socket.emit('initGame', gameData);
    });

    var gameBoardView = new GameBoardView({
      el: '.board',
      model: new GameModel(gameData),
      socket: socket
    });
  });
});