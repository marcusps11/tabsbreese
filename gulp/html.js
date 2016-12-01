const wiredep = require('wiredep').stream;


module.exports = function (gulp, $, paths) {

  // Compress all files and pipes to dist
  gulp.task('html', ['templateHTML', 'styles', 'scripts'], () => {
    return gulp.src([`${paths.src}/*.html`, `!${paths.src}/templates{,/**}`])
      .pipe($.useref({ searchPath: ['.tmp', `${paths.src}`, '.'] }))
      .pipe($.if('*.js', $.uglify()))
      .pipe($.if('*.css', $.cssnano({ safe: true, autoprefixer: false })))
      .pipe($.if('*.html', $.htmlmin({ collapseWhitespace: true, removeComments: true })))
      .pipe(gulp.dest('dist'));
  });

  // Injects required files from bower components into all html files
  gulp.task('wiredepHTML', () => {
    gulp.src(`${paths.src}/**/*.html`)
      .pipe(wiredep({
        exclude: ['bootstrap-sass'],
        ignorePath: /^(\.\.\/)*\.\./
      }))
      .pipe(gulp.dest(`${paths.src}`));
  });

  // Creates html pages from template in src/templates
  gulp.task('templateHTML', function() {
    return gulp.src(`${paths.src}/templates/pages/**/*.html`)
    .pipe($.nunjucksRender({
        path: [`${paths.src}/templates/layouts`, `${paths.src}/templates/modules`]
      }))
    .pipe(gulp.dest(`${paths.src}`))
  });

};
