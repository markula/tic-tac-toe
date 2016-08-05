requirejs.config({
  paths: {
    'jquery': 'libs/jquery-3.1.0',
    'underscore': 'libs/underscore',
    'backbone': 'libs/backbone'
  },
  modules: [
    {
      name: 'main'
    }
  ],
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': { exports: '_' },
    'jquery' : { exports: ['$', 'jQuery']}
  }
});
