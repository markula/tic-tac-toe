requirejs.config({
  modules: [
    {
      name: 'main'
    }
  ],
  paths: {
    'jquery': 'js/libs/jquery-3.1.0',
    'underscore': 'js/libs/underscore',
    'backbone': 'js/libs/backbone'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': { exports: '_' },
    'jquery' : { exports: ['$', 'jQuery']}
  }
});
