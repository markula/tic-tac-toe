define(function() {
  console.log('bob');
  var Backbone = require('backbone');

  return Backbone.View.extend({
    events: {
      'click .cell': 'handleCellClick'
    },

    initialize: function() {
      console.log(this.model.attributes);
    },

    handleCellClick: function(e) {
      console.log($(e.currentTarget));
    }
  });
});