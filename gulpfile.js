// Variables
const gulp = require('gulp');

// Loads all gulp plugins from package.json with the prefix 'gulp-' e.g. 'gulp-plugin-name' can be referneced as '$.pluginName'
const gulpPlugins = require('gulp-load-plugins')();
const $ = gulpPlugins;

const browserSync = require('browser-sync');
const reload = browserSync.reload;

const del = require('del');

const paths = {
  src: 'src',
  dest: 'dist',
  gulp: './gulp/'
};


// Imports gulp tasks in the gulp folder passing them gulp, gulp plugins and paths to use in tasks.
const taskList = require('fs').readdirSync(`${paths.gulp}`);

taskList.forEach(function (taskFile) {
  require(`${paths.gulp}` + taskFile)(gulp, gulpPlugins, paths);
});


// Serve
gulp.task('serve', ['templateHTML', 'styles', 'scripts', 'fonts', 'icons'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', `${paths.src}`],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    `${paths.src}/*.html`,
    `${paths.src}/images/**/*`,
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch(`${paths.src}/templates/**/*.html`, ['templateHTML']);
  gulp.watch(`${paths.src}/styles/**/*.scss`, ['styles']);
  gulp.watch(`${paths.src}/scripts/**/*.js`, ['scripts']);
  gulp.watch(`${paths.src}/images/icons/**/*.{svg,yaml}`, ['icons']);
  gulp.watch(`${paths.src}/fonts/**/*`, ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});


gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});


gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch(`${paths.src}/scripts/**/*.js`, ['scripts']);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});


// Inject bower components
gulp.task('wiredep', ['wiredepStyles', 'wiredepHTML']);


// Build
gulp.task('extras', () => {
  return gulp.src([
    `${paths.src}/*.*`,
    `!${paths.src}/*.html`
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'icons', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});


// Default, clean and build
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

gulp.task('dist', ['clean'], () => {
  gulp.start('build');
});
