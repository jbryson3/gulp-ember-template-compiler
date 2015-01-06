var compiler = require('ember-template-compiler');
var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');

const PLUGIN_NAME = 'gulp-ember-template-compiler';

function templateCompiler() {
  var stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      var n = path.extname(file.relative).length;
      var fileName = n === 0 ? file.relative : file.relative.slice(0, -n);
      var compilerOutput = compiler.precompile(file.contents.toString(), false);

      file.contents = new Buffer("Ember.TEMPLATES['" + fileName.replace(path.sep, '/') +"'] = Ember.Handlebars.template(" + compilerOutput + ");");
    }

    this.push(file);
    cb();
  });

  return stream;
}

module.exports = templateCompiler;
