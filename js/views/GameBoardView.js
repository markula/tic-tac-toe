define(function() {
  console.log('bob');
  var Backbone = require('backbone');

  return Backbone.View.extend({
    initialize: function() {
      console.log(this.model.attributes);
    }
  });
});