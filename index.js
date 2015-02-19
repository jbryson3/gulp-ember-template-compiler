var compiler = require('ember-template-compiler');
var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');

const PLUGIN_NAME = 'gulp-ember-template-compiler';

var defaultProcessName = function (name) {
  var n = path.extname(name).length;
  return n === 0 ? name : name.slice(0, -n);
};

function templateCompiler(options) {
  var stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      var processName = options.processName || defaultProcessName;
      var fileName = processName(file.relative);
      var compilerOutput = compiler.precompile(file.contents.toString(), false);

      file.contents = new Buffer("Ember.TEMPLATES['" + fileName.replace(path.sep, '/') +"'] = Ember.Handlebars.template(" + compilerOutput + ");");
    }

    this.push(file);
    cb();
  });

  return stream;
}

module.exports = templateCompiler;
