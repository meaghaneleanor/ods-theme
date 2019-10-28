const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');
const gulpif = require('gulp-if');

const distDir = 'dist';
const srcDir = 'src/**';
const styleDir = 'src/sass/**';

/**
 * @param {{
 *   compress:boolean,
 *   sourcemaps:boolean,
 *   callback:function,
 *   [debug]:boolean
 * }} opts Configuration options
 */
const processSass = (opts) => {

  const sassOptions = {
    outputStyle: 'expanded',
  };

  if (opts.debug) {
    sassOptions.sourceComments = true;
  }

  gulp.src('src/sass/ods-theme.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(concat(gulpif(opts.compress, 'ods-theme.min.css', 'ods-theme.css')))
    .pipe(gulpif(opts.sourcemaps, sourcemaps.init()))
    .pipe(gulpif(opts.compress, minify()))
    .pipe(gulpif(opts.sourcemaps, sourcemaps.write('.')))
    .pipe(gulp.dest(`${distDir}/css/`));

  if (opts.callback) {
    opts.callback();
  }
};

gulp.task('sass', (done) => {
  processSass({
    compress: false,
    sourcemaps: true,
    debug: false,
    callback: done
  });
});

gulp.task('sass-minify', (done) => {
  processSass({
    compress: true,
    sourcemaps: true,
    callback: done,
  });
});

gulp.task('sass:both', gulp.parallel('sass', 'sass-minify'));

gulp.task('assets-move', (done) => {
  gulp.src([srcDir, styleDir], {base: './src'})
    .pipe(gulp.dest(distDir));
  done();
});

gulp.task('watch', (done) => {
  gulp.watch(styleDir, {ignoreInitial: false}, gulp.parallel('sass:both'));
  done();
});

gulp.task('clean', (done) => {
  del(distDir);
  done();
});

gulp.task('deploy', gulp.series('clean', gulp.parallel('assets-move', 'sass:both')));

gulp.task('default', gulp.series('watch'));
