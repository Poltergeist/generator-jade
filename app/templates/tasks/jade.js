/**
 * grunt-contirb-jade options
 * @type {Object}
 */
var fs = require('fs'),
  path = require('path'),
  walk = function(dir, directory) {
    var results = [];
    directory = directory || '';
    fs.readdirSync(dir).forEach(function(file) {
      var absolutePath = path.resolve(dir, file),
        relativePath = path.join(directory, file),
        stat = fs.statSync(absolutePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(absolutePath, relativePath));
      } else if(/^(?!_).*/g.test(file)) {
        results.push(relativePath);
      }
    });
    return results;
  };

module.exports = {
  html: {
    files: [{
      expand: true,
      cwd: '<%= folders.app %>/jade',
      src: walk(path.resolve(__dirname, '../app/jade')),
      dest: '.tmp/',
      ext: '.html'
    }],
    options: {
      client: false,
      pretty: true,
      basedir: '<%= folders.app %>/jade'
    }
  }
};
