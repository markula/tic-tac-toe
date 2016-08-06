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

    handleCellClick: function(e) {
      this.socket.emit('bob', { id: 1 });
      console.log($(e.currentTarget));
    }
  });
});