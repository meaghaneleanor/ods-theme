const fractal = require('./fractal.js');
const logger = fractal.cli.console;
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const styleDir = 'fractal/**/*.scss';

gulp.task('appStyle', (done) => {
  gulp.src([styleDir, '!fractal/theme/**', '!fractal/build/**'])
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./fractal/public/styles'));
    done();
});

gulp.task('sass', (done) => {
  gulp.src('fractal/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest((f) => {
      return f.base;
    }));
    done();
});

gulp.task('watch', (done) => {
  gulp.watch(styleDir, { ignoreInitial: false }, gulp.series('sass', 'appStyle'));
  done();
});

gulp.task('fractal:dev', () => {
  const server = fractal.web.server({
    sync: true
  });

  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.url}`);
  });
});

gulp.task('default', gulp.series(['fractal:dev', 'watch']));
