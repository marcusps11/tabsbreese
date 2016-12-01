const browserSync = require('browser-sync');
const reload = browserSync.reload;

const wiredep = require('wiredep').stream;

const stylelint = require('stylelint');
const postcssReporter = require('postcss-reporter');
const postcssSyntaxScss = require('postcss-scss');


module.exports = function (gulp, $, paths) {

  // Compiles SASS, autoprefixes, sourcemaps, rem fallback and style lints
  gulp.task('styles', () => {
    return gulp.src(`${paths.src}/styles/*.scss`)
      .pipe($.plumber())
      .pipe($.postcss([
        stylelint(),
        postcssReporter({
          clearMessages: true,
          throwError: false
        })
      ], { syntax: postcssSyntaxScss }))
      .pipe($.sourcemaps.init())
      .pipe($.sass.sync({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.']
      }).on('error', $.sass.logError))
      .pipe($.pixrem())
      .pipe($.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('.tmp/styles'))
      .pipe(reload({ stream: true }));
  });

  // Inject styles required from bower components
  gulp.task('wiredepStyles', () => {
    gulp.src(`${paths.src}/styles/*.scss`)
      .pipe(wiredep({
        ignorePath: /^(\.\.\/)+/
      }))
      .pipe(gulp.dest(`${paths.src}/styles`));
  });

};
