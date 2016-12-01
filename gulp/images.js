
module.exports = function (gulp, $, paths) {

  // Compresses image files but not icon src files
  gulp.task('images', () => {
    return gulp.src([`${paths.src}/images/**/*`, `!${paths.src}/images/icons{,/**}`])
      .pipe($.cache($.imagemin({
        progressive: true,
        interlaced: true,
        svgoPlugins: [{ cleanupIDs: false }]
      })))
      .pipe(gulp.dest('dist/images'));
  });

  // Create SVG icon spritesheet
  gulp.task('icons', function () {
    return gulp.src(`${paths.src}/images/icons/**/*.svg`)
      .pipe($.svgSprite({
        mode: {
          symbol: { dest: '', sprite: 'icons.svg' }
        },
        shape: {
          meta: `${paths.src}/images/icons/icons-meta.yaml`,
          id: { generator: 'icon-%s' }
        }
      }))
      .pipe(gulp.dest(`${paths.src}/images`));
  });

};
