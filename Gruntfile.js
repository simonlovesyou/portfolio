module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jade: {
      debug: {
        options: {
          data: {
            debug: true
          },
          pretty: true
        },
        files: {
          "debug/layout.html": "dev/jade/layout.jade",
          "debug/blog.html": "dev/jade/blog.jade"
        }
      },
      release: {
        options: {
          data: {
            debug: false
          },
          pretty: false
        },
        files: {
          "public/layout.html": "dev/jade/layout.jade",
          "public/blog.html": "dev/jade/blog.jade"
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      basic: {
        src: ['dev/css/bootstrap.css', 'dev/css/normalize.css', 'dev/css/main/*.css'],
        dest: 'public/assets/css/main.css',
      },
      extras: {
        src: ['dev/css/bootstrap.css', 'dev/css/normalize.css', 'dev/css/blog/*.css'],
        dest: 'public/assets/css/blog.css',
      },
      js: {
        src: 'dev/js/*.js',
        dest: 'public/js/index.js'
      }
    },
    cssmin: {
      main: {
        src: 'public/assets/css/main.css',
        dest: 'public/assets/css/main.min.css'
      },
      blog: {
        src: 'public/assets/css/blog.css',
        dest: 'public/assets/css/blog.min.css'
      }
    },
    uglify: {
      js: {
        options: {
          preserveComments: false
        },
        files: {
          'public/assets/js/index.min.js': 'public/assets/js/index.js'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.task.requires()
  grunt.registerTask('default', [ 'concat:basic', 'concat:extras', 'concat:js', 'uglify:js', 'cssmin:main', 'cssmin:blog']);
};

/*
# Only concat CSS files
grunt concat:css 

# Concat CSS and JS files, but don't do anything else
grunt concat
*/