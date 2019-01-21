const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-clean-css');
// const rename = require('gulp-rename');
const styleMaster = 'src/ods-theme.scss';
const styleDir = 'src/**/*.scss';

gulp.task('sass', (done) => {
  gulp.src(styleMaster)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(concat('ods-theme.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
    done();
});

gulp.task('sass-minify', (done) => {
  gulp.src(styleMaster)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(concat('ods-theme.min.css'))
    .pipe(minify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
    done();
});

gulp.task('watch', (done) => {
  gulp.watch(styleDir, { ignoreInitial: false }, gulp.series('sass'));
  done();
});

gulp.task('default', gulp.series('watch'));

gulp.task('deploy', gulp.series('sass-minify'));
