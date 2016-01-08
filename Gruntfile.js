'use strict';
const fs = require('fs');

module.exports = function(grunt) {
  let credentials = JSON.parse(fs.readFileSync('config/server.json', 'utf8'));
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
          "debug/layout.html": "dev/jade/main/layout.jade",
          "debug/blog.html": "dev/jade/blog/*"
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
          "public/index.html": ["dev/jade/main/layout.jade"]/*,
          "public/blog.html": "dev/jade/blog/*",
          "public/colormeans.html": "dev/jade/main/colormeans.jade",
          "public/dirsortjs.html": "dev/jade/main/dirsortjs.jade"*/
        },
        compile: {
          expand: true
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
        src: ['dev/js/*.js', 'dev/js/vendor/jquery-throttle-debounce-plugin-1.1.min.js'],
        dest: 'public/assets/js/index.js'
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
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: credentials.SERVER,
          port: credentials.PORT,
          authKey: 'key1'
        },
        src: credentials.SRC,
        dest: credentials.DEST,
        exclusions: ['public/**/.DS_Store']
      }
    },
    copy: {
      images: {
        files: [
          {expand: true, cwd:'dev/assets/images/', src: ['*'], dest: 'public/assets/img/', filter: 'isFile'},

        ]
      }
    },
    clean: {
      public: ["public/"]
    },
    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['concat:js', 'uglify:js'],
        options: {
          spawn: false,
        },
      },
      jade: {
        files: ['**/*.jade'],
        tasks: ['jade:debug', 'jade:release'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['**/*.css'],
        tasks: ['concat:basic', 'concat:extras', 'cssmin:main', 'cssmin:blog'],
        options: {
          spawn: false,
        },
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ftp-deploy')
  //grunt.task.requires()
  grunt.registerTask('default', ['concat:basic', 'jade:release', 
                                 'concat:js', 'uglify:js', 'cssmin:main', 'watch']);
  grunt.registerTask('build', ['clean', 'concat:basic', 'jade:release', 
                               'concat:js', 'uglify:js', 'cssmin:main', 'copy']);

  grunt.registerTask('deploy', ['ftp-deploy']);
};

/*
# Only concat CSS files
grunt concat:css 

# Concat CSS and JS files, but don't do anything else
grunt concat
*/