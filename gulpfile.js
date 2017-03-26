const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');

const directorioBase = './www';
// Servidor con Browsersync
gulp.task('servidor', ['stylus'], function() {
    browserSync.init({
        server: {
            baseDir: directorioBase,
        },
        open: false
    });
    gulp.watch('./styl/*.styl', ['stylus']);
    gulp.watch(directorioBase + '/js/*.js').on('change', browserSync.reload);
    gulp.watch(directorioBase + '/*.html').on('change', browserSync.reload);
});

// Tarea de stylus para convertirlo en CSS
gulp.task('stylus', function () {
  return gulp.src('./styl/estilos.styl')
    .pipe(stylus())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(directorioBase + '/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['servidor']);