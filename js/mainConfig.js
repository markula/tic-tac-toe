requirejs.config({
  paths: {
    'jquery': 'libs/jquery-3.1.0',
    'underscore': 'libs/underscore',
    'backbone': 'libs/backbone',
    'socket.io': 'libs/socket.io-1.4.5'
  },
  modules: [
    {
      name: 'main',
      "insertRequire": ['main']
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
