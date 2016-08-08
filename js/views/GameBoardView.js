define(function() {
  var Backbone = require('backbone');

  return Backbone.View.extend({
    events: {
      'click .cell': 'handleCellClick'
    },

    initialize: function(options) {
      this.socket = options.socket;
      this.attachSocketListeners();
    },

    attachSocketListeners: function() {
      var that = this;

      this.socket.on('gameMove', function(move) {
        that.makeMove(move);
        that.socket.emit('gameMove', move);
      });

      this.socket.on('moveSuccess', function(move) {
        that.model.get('moves').push(move);
      });

      this.socket.on('moveError', function(move) {
        that.removeErrMove(move);
      });

      this.socket.on('gameWon', function() {
        that.renderGameStatus('you win');
      });

      this.socket.on('gameOver', function() {
        that.renderGameStatus('you lose');
      });
    },

    renderGameStatus: function(message) {
      this.$el.find('.game-status').show().html(message);
    },

    makeMove: function(move) {
      //update model
      this.model.set('rows['+move.row+'].cells['+move.cell+'].val', move.pId);
      //update cell
      this.renderMadeMove(move);
    },

    renderMadeMove: function(move) {
      var $cell = this.$el.find('.row'+move.row+' .cell'+move.cell);
      var cellText = move.pId === 1 ? 'X' : 'O';
      $cell.attr('data-nomove', true);
      $cell.find('.cell-content').html(cellText);
    },

    removeErrMove: function(move) {
      var $cell = this.$el.find('.row'+move.row+' .cell'+move.cell);
      $cell.attr('data-nomove', null);
      $cell.find('.cell-content').html('');
    },

    handleCellClick: function(e) {
      var $el = $(e.currentTarget);

      if(!$el.attr('data-nomove')) {   
        var move = {
          gId: this.model.get('id'),
          pId: this.model.get('pId'),
          row: $el.parents('.row').attr('data-id'),
          cell: $el.attr('data-id')
        }

        this.renderMadeMove(move);
        this.socket.emit('makeMove', move); 
      }
    }
  });
});