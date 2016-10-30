var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  del = require('del');

  var css     = 'stylesheets';
  var cssSrc  = 'dev/stylesheets/';
  var cssDest = 'public/stylesheets';

  var js     = 'javascripts';
  var jsSrc  = 'dev/javascripts/';
  var jsDest = 'public/javascripts';

  var img     = 'images';
  var imgSrc  = 'dev/images/';
  var imgDest = 'public/images';


/*validate code and output error and concat into one file and add a minimized version, save it to the dest */
gulp.task(css, function() {
  return sass(cssSrc + 'main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(cssDest))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest(cssDest))
    .pipe(notify({ message: 'Styles task complete' }));
});

/*validate code and output error and concat into one file and add a minimized version, save it to the dest */
gulp.task(js, function() {
  return gulp.src(jsSrc+'**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest))
    .pipe(notify({ message: 'Scripts task complete' }));
});

/*take any img in the folder x and minimize based on the number, save it to the dest folder y*/
gulp.task(img, function() {
  return gulp.src(imgSrc+'**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(imgDest))
    .pipe(notify({ message: 'Images task complete' }));
});

/*clean up the dir before exec.. a gulp task*/
gulp.task('clean', function() {
  return del([cssDest, jsDest, imgDest]);
});

/*runt this we one cmd: gulp*/
gulp.task('default', ['clean'], function() {
  gulp.start(css, js, img);
});

/*cmd: gulp watch
  if one make changes in the dir:__ run gulp tasks and check your web page
*/
gulp.task('watch', function() {
  gulp.watch(cssSrc+'**/*.scss', [css]);
  gulp.watch(jsSrc+'**/*.js', [js]);
  gulp.watch(imgSrc+'**/*', [img]);

  livereload.listen();
  gulp.watch(['dev/**']).on('change', livereload.changed);
});
