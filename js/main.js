define(function(require) {
  var Backbone = require('backbone');
  var GameBoardView = require('views/GameBoardView');
  var GameModel = require('models/GameModel');

  // var gameBoardView = new GameBoardView({
  //   el: '.board',
  //   model: new GameModel(gameData)
  // });

    var $ = require('jquery');
    var Backbone = require('backbone');
    var GameBoardView = require('views/GameBoardView');
    var GameModel = require('models/GameModel');
    var io = require('socket.io');

    $(document).ready(function() {
      var socket = io.connect(window.location.origin);

      socket.emit('bob', { text: 'jomama' });
      socket.on('dodo', function(data) {
        console.log(data);
      });

      var gameBoardView = new GameBoardView({
        el: '.board',
        model: new GameModel(gameData),
        socket: socket
      });
    });
});