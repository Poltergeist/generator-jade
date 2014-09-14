/* global describe, beforeEach, it */

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');


describe('Webapp generator test', function() {
  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        return done(err);
      }

      this.webapp = helpers.createGenerator('jade:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ]);
      done();
    }.bind(this));
  });

  it('the generator can be required without throwing', function() {
    // not testing the actual run of generators yet
    this.app = require('../app');
  });

  it('creates expected files in stylus mode', function(done) {
    var expected = [
      'bower.json',
      'package.json',
      'Gruntfile.js',
      '.editorconfig',
      '.gitignore',
      '.jshintrc',
      'app/jade/layouts/_default.jade',
      'app/jade/index.jade',
      'app/styles/main.styl',
      'app/scripts/main.js'
    ];

    helpers.mockPrompt(this.webapp, {
      cssProcessor: 'stylus'
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertFile(expected);
      done();
    });
  });

  it('creates expected files in sass mode', function(done) {
    var expected = [
      'bower.json',
      'package.json',
      'Gruntfile.js',
      '.editorconfig',
      '.gitignore',
      '.jshintrc',
      'app/jade/layouts/_default.jade',
      'app/jade/index.jade',
      'app/styles/main.sass',
      'app/scripts/main.js'
    ];

    helpers.mockPrompt(this.webapp, {
      cssProcessor: 'sass'
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertFile(expected);
      done();
    });
  });

  it('creates expected files in css mode', function(done) {
    var expected = [
      'bower.json',
      'package.json',
      'Gruntfile.js',
      '.editorconfig',
      '.gitignore',
      '.jshintrc',
      'app/jade/layouts/_default.jade',
      'app/jade/index.jade',
      'app/styles/main.css',
      'app/scripts/main.js'
    ];

    helpers.mockPrompt(this.webapp, {
      cssProcessor: 'css'
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertFile(expected);
      done();
    });
  });

  it('creates expected ".gitignore" content in stylus mode', function(done) {
    var expected = /.*\s\n/g,
      file = '.gitignore';

    helpers.mockPrompt(this.webapp, {
      cssProcessor: 'stylus'
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertNoFileContent(file,expected);
      done();
    });
  });

  it('creates expected ".gitignore" content in sass mode', function(done) {
    var expected = /.*\s\n/g,
      file = '.gitignore';

    helpers.mockPrompt(this.webapp, {
      cssProcessor: 'sass'
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertNoFileContent(file,expected);
      done();
    });
  });

  it('creates expected ".gitignore" content in css mode', function(done) {
    var expected = /.*\s\n/g,
      file = '.gitignore';

    helpers.mockPrompt(this.webapp, {
      cssProcessor: 'css'
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertNoFileContent(file,expected);
      done();
    });
  });

  it('creates autoprefixer in stylus mode', function(done) {
    var expected = /autoprefixer/g,
      file = 'Gruntfile.js';

    helpers.mockPrompt(this.webapp, {
      cssProcessor: 'stylus',
      autoprefixer: true
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertFileContent(file,expected);
      done();
    });
  });

  it('creates autoprefixer in sass mode', function(done) {
    var expected = /autoprefixer/g,
      file = 'Gruntfile.js';

    helpers.mockPrompt(this.webapp, {
      cssProcessor: 'sass',
      autoprefixer: true
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertFileContent(file,expected);
      done();
    });
  });

  it('creates autoprefixer in css mode', function(done) {
    var expected = /autoprefixer/g,
      file = 'Gruntfile.js';

    helpers.mockPrompt(this.webapp, {
      cssProcessor: 'css',
      autoprefixer: true
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertFileContent(file,expected);
      done();
    });
  });

  it('don\'t creates autoprefixer in stylus mode', function(done) {
    var expected = /autoprefixer/g,
      file = 'Gruntfile.js';

    helpers.mockPrompt(this.webapp, {
      cssProcessor: 'stylus',
      autoprefixer: false
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertNoFileContent(file,expected);
      done();
    });
  });

  it('don\'t creates autoprefixer in sass mode', function(done) {
    var expected = /autoprefixer/g,
      file = 'Gruntfile.js';

    helpers.mockPrompt(this.webapp, {
      cssProcessor: 'sass',
      autoprefixer: false
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertNoFileContent(file,expected);
      done();
    });
  });

  it('don\'t creates autoprefixer in css mode', function(done) {
    var expected = /autoprefixer/g,
      file = 'Gruntfile.js';

    helpers.mockPrompt(this.webapp, {
      cssProcessor: 'css',
      autoprefixer: false
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertNoFileContent(file,expected);
      done();
    });
  });

  it('autoprefixer is not added to package.json if not selected', function(done) {
    var expected = /autoprefixer/g,
      file = 'package.json';

    helpers.mockPrompt(this.webapp, {
      autoprefixer: false
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertNoFileContent(file,expected);
      done();
    });
  });

  it('autoprefixer is added to package.json if selected', function(done) {
    var expected = /autoprefixer/g,
      file = 'package.json';

    helpers.mockPrompt(this.webapp, {
      autoprefixer: true
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertFileContent(file,expected);
      done();
    });
  });

  it('creates expected files in config mode', function(done) {
    var expected = [
      'develop_config.js',
      'build_config.js'
    ];

    helpers.mockPrompt(this.webapp, {
      config: true
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertFile(expected);
      done();
    });
  });

  it('doesn\'t creates expected files in config mode', function(done) {
    var expected = [
      'develop_config.js',
      'build_config.js'
    ];

    helpers.mockPrompt(this.webapp, {
      config: false
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertNoFile(expected);
      done();
    });
  });

  it('configBuild is not added to the Gruntfile if selected', function(done) {
    var expected = /configBuild:/g,
      file = 'Gruntfile.js';

    helpers.mockPrompt(this.webapp, {
      config: false
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertNoFileContent(file,expected);
      done();
    });
  });

  it('configBuild is added to Gruntfile if selected', function(done) {
    var expected = /configBuild:/g,
      file = 'Gruntfile.js';

    helpers.mockPrompt(this.webapp, {
      config: true
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertFileContent(file,expected);
      done();
    });
  });
  it('configDevelop is not added to the Gruntfile if selected', function(done) {
    var expected = /configDevelop:/g,
      file = 'Gruntfile.js';

    helpers.mockPrompt(this.webapp, {
      config: false
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertNoFileContent(file,expected);
      done();
    });
  });

  it('configDevelop is added to Gruntfile if selected', function(done) {
    var expected = /configDevelop:/g,
      file = 'Gruntfile.js';

    helpers.mockPrompt(this.webapp, {
      config: true
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertFileContent(file,expected);
      done();
    });
  });

  it('config is not added to the watch task if selected', function(done) {
    var expected = /copy:configDevelop/g,
      file = 'Gruntfile.js';

    helpers.mockPrompt(this.webapp, {
      config: false
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertNoFileContent(file,expected);
      done();
    });
  });

  it('config is not added to the buil task if selected', function(done) {
    var expected = /copy:configBuild/g,
      file = 'Gruntfile.js';

    helpers.mockPrompt(this.webapp, {
      config: false
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertNoFileContent(file,expected);
      done();
    });
  });

  it('config is added to the watch task if selected', function(done) {
    var expected = /copy:configDevelop/g,
      file = 'Gruntfile.js';

    helpers.mockPrompt(this.webapp, {
      config: true
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertFileContent(file,expected);
      done();
    });
  });

  it('config is added to the build task if selected', function(done) {
    var expected = /copy:configBuild/g,
      file = 'Gruntfile.js';

    helpers.mockPrompt(this.webapp, {
      config: true
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertFileContent(file,expected);
      done();
    });
  });

  it('config is not added to layout if selected', function(done) {
    var expected = /config\.js/g,
      file = 'app/jade/layouts/_default.jade';

    helpers.mockPrompt(this.webapp, {
      config: false
    });

    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      helpers.assertNoFileContent(file,expected);
      done();
    });
  });

  it('config is added to layout if selected', function(done) {
    var expected = /config\.js/g,
      file = 'app/jade/layouts/_default.jade';

    helpers.mockPrompt(this.webapp, {
      config: true
    });

    this.webapp.options['skip-install'] = true;

    console.log('test');
    this.webapp.run({}, function() {
      helpers.assertFileContent(file,expected);
      done();
    });
  });
});
