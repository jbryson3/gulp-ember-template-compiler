# gulp-ember-template-compiler

Precompile Handlebars templates for Ember.js.

## Usage

First, install ```gulp-ember-template-compiler```:

```shell
npm install gulp-ember-template-compiler --save-dev
```

Then, add this to your gulpfile.js:

```javascript
var gulp = require('gulp');
var concat = require('gulp-concat');
var templateCompiler = require('gulp-ember-template-compiler');

gulp.task('templates', function () {
  gulp.src('/app/templates/*.hbs')
    .pipe(templateCompiler())
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('/app/templates'));
});
```

## Usage Tips

* This plugin fit for Emberjs (>=)1.9.0 & Handlebars 2.0.0
