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
      express: {
        files:  [ '**/*.js', '**/*.scss', '**/*.html' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'js',
          skipDirOptimize: true,
          dir: 'public/js/build',
          optimizeAllPluginResources: true,
          mainConfigFile: 'public/js/mainConfig.js',
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
            src: ['**/*.scss', '!sass/modules/*.scss'],
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
    'express:dev',
    'watch'
  ]);
};
