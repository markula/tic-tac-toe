define(function() {
  var Backbone = require('backbone');

  return Backbone.View.extend({
    events: {
      'click .cell': 'handleCellClick'
    },

    initialize: function(options) {
      this.socket = options.socket;
      console.log(this.model.attributes);
    },

    makeMoveString: function(row, cell) {
      return row + ':' + cell;
    },

    handleCellClick: function(e) {
      var $el = $(e.currentTarget);

      this.socket.emit(
        'bob', 
        { move: this.makeMoveString($el.parents('.row').attr('data-id'), $el.attr('data-id')) }
      );
      // console.log($(e.currentTarget));
    }
  });
});