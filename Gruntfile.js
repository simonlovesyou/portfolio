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
        src: ['dev/css/bootstrap.css', 'dev/css/main/*.css'],
        dest: 'public/css/main.css',
      },
      extras: {
        src: ['dev/css/bootstrap.css', 'dev/css/blog/*.css'],
        dest: 'public/css/blog.css',
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.registerTask('default', [ 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js' ]);

};