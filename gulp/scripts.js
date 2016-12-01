const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

const browserSync = require('browser-sync');
const reload = browserSync.reload;


module.exports = function (gulp, $, paths) {

  // Compiles ES6 to ES5 with Babel and allows modules using Browserify
  gulp.task('scripts', () => {
    const browserifyBundle = browserify({
      entries: `${paths.src}/scripts/main.js`,
      transform: babelify,
      debug: true
    });

    return browserifyBundle.bundle()
      .pipe(source('bundle.js'))
      .pipe($.plumber())
      .pipe(buffer())
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('.tmp/scripts'))
      .pipe(reload({stream: true}))
      .on('error', errorHandler);
  });

  // Lints scripts
  function lint(files, options) {
    return gulp.src(files)
      .pipe(reload({ stream: true, once: true }))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
      .on('error', errorHandler);
  }

  gulp.task('lint', () => {
    return lint(`${paths.src}/scripts/**/*.js`, {
      fix: true
    })
      .pipe(gulp.dest(`${paths.src}/scripts`));
  });

  gulp.task('lint:test', () => {
    return lint('test/spec/**/*.js', {
      fix: true,
      env: {
        mocha: true
      }
    })
      .pipe(gulp.dest('test/spec/**/*.js'));
  });

  // Handle the error
  function errorHandler (error) {
    console.log(error);
    this.emit('end');
  }
};
