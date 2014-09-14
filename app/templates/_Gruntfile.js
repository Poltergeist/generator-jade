// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // configurable paths
  var folders = {
    app: 'app',
    dist: 'dist',
    tmp: '.tmp'
  };

  grunt.initConfig({
    folders: folders,
    watch: {<% if (cssProcessor === 'stylus') { %>
      stylus: {
        files: '<%%= folders.app %>/styles/**/*.styl',
        <% if (autoprefixer) { %>tasks: ['stylus', 'autoprefixer']<% } else { %>tasks: ['stylus']<% } %>
      },<% } else if (cssProcessor === 'sass') { %>
      compass: {
        files: ['<%%= folders.app %>/styles/{,*/}*.{scss,sass}'],
        <% if (autoprefixer) { %>tasks: ['compass:server', 'autoprefixer']<% } else { %>tasks: ['compass:server']<% } %>
      },<% } else { %>
      css: {
        files: '<%%= folders.app %>/styles/{,*/}*.css',
        <% if (autoprefixer) { %>tasks: ['copy:css', 'autoprefixer']<% } else { %>tasks: ['copy:css']<% } %>
      },
      <% }%>
      server: {
        options: {
          livereload: true
        },
        files: [
          '<%%= folders.tmp %>/*.html',
          '<%%= folders.tmp %>/styles/{,*/}*.css',
          '{.tmp,<%%= folders.app %>}/scripts/{,*/}*.js',
          '<%%= folders.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      jade: {
        files: '<%%= folders.app %>/jade/**/*.jade',
        tasks: ['jade']
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost',
        livereload: true
      },
      server: {
        options: {
          open: true,
          base: [
            '<%%= folders.tmp %>',
            '<%%= folders.app %>'
          ]
        }
      },
      test: {
        options: {
          base: [
            '<%%= folders.tmp %>',
            'test',
            '<%%= folders.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: [
            '<%%= folders.dist %>'
          ],
          livereload: false
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%%= folders.tmp %>',
            '<%%= folders.dist %>/*',
            '!<%%= folders.dist %>/.git*'
          ]
        }]
      },
      server: '<%%= folders.tmp %>'
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%%= connect.options.port %>/index.html']
        }
      }
    },<% if (cssProcessor === 'stylus') { %>
    stylus: {
      compile: {
        files: [{
          expand: true,
          cwd: '<%%= folders.app %>/styles',
          src: ['{,*/}*.styl', '!**/_*'],
          dest: '<%%= folders.tmp %>/styles',
          ext: '.css'
        }],
        options: {
          compress: false,
          // convert the css url() declaration into nib inline imaging function
          // this converts images smaller than 30kb to data url
          urlfunc: 'url'
        }
      }
    },<% } else if (cssProcessor === 'sass') { %>
    compass: {
      options: {
        sassDir: '<%%= folders.app %>/styles',
        cssDir: '<%%= folders.tmp %>/styles',
        imagesDir: '<%%= folders.app %>/images',
        javascriptsDir: '<%%= folders.app %>/scripts',
        fontsDir: '<%%= folders.app %>/styles/fonts',
        importPath: '<%%= folders.app %>/bower_components',
        relativeAssets: true
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },<% } %>
    <% if (autoprefixer) { %>autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= folders.tmp %>/styles',
          dest: '<%%= folders.tmp %>/styles',
          src: '{,*/}*.css'
        }]
      }
    },<% } %>
    jade: {
      html: {
        files: [{
          expand: true,
          cwd: '<%%= folders.app %>/jade',
          src: ['{,*/}*.jade', '!**/_*'],
          dest: '.tmp/',
          ext: '.html'
        }],
        options: {
          client: false,
          pretty: true,
          basedir: '<%%= folders.app %>/jade',
          data: function(dest, src) {

            var page = src[0].replace(/app\/jade\/(.*)\/index.jade/, '$1');

            if (page == src[0]) {
              page = 'index';
            }

            return {
              page: page
            };
          }
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%%= folders.dist %>/scripts/{,*/}*.js',
            '<%%= folders.dist %>/styles/{,*/}*.css',
            '<%%= folders.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%%= folders.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%%= folders.tmp %>/index.html',
      options: {
        dest: '<%%= folders.dist %>'
      }
    },
    usemin: {
      html: ['<%%= folders.dist %>/{,*/}*.html'],
      css: ['<%%= folders.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%%= folders.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= folders.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%%= folders.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= folders.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%%= folders.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%%= folders.dist %>/styles/main.css': [
            '<%%= folders.tmp %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/folders/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%%= folders.tmp %>',
          src: '{,*/}*.html',
          dest: '<%%= folders.dist %>'
        }]
      }
    },
    copy: {<% if (config === true) { %>
      configDevelop: {
        files: [{
          cwd: './',
          dest: '<%%= folders.tmp %>/scripts/config.js',
          src: 'develop_config.js'
        }]
      },
      configBuild: {
        files: [{
          cwd: './',
          dest: '<%%= folders.dist %>/scripts/config.js',
          src: 'build_config.js'
        }]
      },<% } %>
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= folders.app %>',
          dest: '<%%= folders.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/*'
          ]
        }]
      },
      js: {
        files: [{
          expand: true,
          cwd: '<%%= folders.app %>',
          dest: '<%%= folders.tmp %>',
          src: [
            'scripts/{,*/}*js', 'bower_components/**/*js'
          ]
        }]
      },
      css: {
        files: [{
          expand: true,
          cwd: '<%%= folders.app %>',
          dest: '<%%= folders.tmp %>',
          src: [
            'styles/{,*/}*css'
          ]
        }]
      },
      assets: {
        files: [{
          expand: true,
          cwd: '<%%= folders.app %>',
          dest: '<%%= folders.dist %>',
          src: [
            'assets/{,*/}*.*'
          ]
        }]
      }
    },
    concurrent: {
      server: [<% if (cssProcessor === 'stylus') { %>
        'stylus'<% } else if (cssProcessor === 'sass') { %>
        'compass:server'<% } %>
      ],
      test: [<% if (cssProcessor === 'stylus') { %>
        'stylus'<% } else if (cssProcessor === 'sass') { %>
        'compass'<% } %>
      ],
      dist: [<% if (cssProcessor === 'stylus') { %>
        'stylus',<% } else if (cssProcessor === 'sass') { %>
        'compass:dist',<% } %>
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    release: {
      options: {<% if (isPrivate) { %>
        npm: false<% } %>
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      build: ['<%%= folders.app %>/scripts/**/*js']
    }
  });

  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'jade',<% if (config) { %>
      'copy:configDevelop',<% } %>
      'concurrent:server',
      <% if (autoprefixer) { %>'autoprefixer',<% } %>
      'connect:server',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jade',
    'copy'
    'copy:js',<% if (config) { %>
    'copy:configBuild',<% } %>
    'copy:css',
    'useminPrepare',
    'concurrent:dist',
    <% if (autoprefixer) { %>'autoprefixer',<% } %>
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'copy:assets',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
