/*global require*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['**/*.scss'],
        tasks: [ 'sass:dev']
      },
      requirejs: {
        files: [ 'js/models/*.js', 'js/*.js', 'js/views/*.js' ],
        tasks: [ 'requirejs:compile' ]
      },
      express: {
        files:  [ '**/*.html', 'index.js', 'server/**/*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'js',
          skipDirOptimize: true,
          dir: 'public/js/build',
          // out: 'public/js/build/main.js',
          optimizeAllPluginResources: true,
          mainConfigFile: 'js/mainConfig.js',
          preserveLicenseComments: true
        }
      }
    },
    express: {
      dev: {
        options: {
          script: 'index.js'
        }
      }
    },
    sass: {
      dev: {
        options: {
          includePaths: require('node-bourbon').includePaths,
          sourceMap: true,
          sourceMapRoot: '/css/',
          outputStyle: 'compressed'
        },
        files: [
          {
            expand: true,
            cwd: 'public/css/sass',
            src: ['!sass/modules/*.scss', '**/*.scss'],
            dest: 'public/css/',
            ext: '.css'
          }
        ]
      }
    },
    symlink: {
      options: {
        overwrite: true
      },
      expanded: {
        files: [
          {
            src: ['sass'],
            dest: 'public/css/sass'
          },
          {
            src: ['js'],
            dest: 'public/js'
          }
        ]
      }
    },
    clean: {
      buildDirs: {
        src: [
        'public/js',
        'public/css'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-symlink');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-express-server');

  // Default task(s).
  grunt.registerTask('default', [
    'clean',
    'symlink',
    'sass:dev',
    'requirejs:compile',
    'express:dev',
    'watch'
  ]);
};
