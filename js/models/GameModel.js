define(function(require) {
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      id: '',
      pId: 1,
      rows: [],
      moves: []
    }
  })
});