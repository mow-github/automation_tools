const gulp      = require('gulp'),
  sass          = require('gulp-ruby-sass'),
  autoprefixer  = require('gulp-autoprefixer'),
  cssnano       = require('gulp-cssnano'),
  eslint        = require('gulp-eslint'),
  uglify        = require('gulp-uglify'),
  imagemin      = require('gulp-imagemin'),
  rename        = require('gulp-rename'),
  concat        = require('gulp-concat'),
  notify        = require('gulp-notify'),
  cache         = require('gulp-cache'),
  livereload    = require('gulp-livereload'),
  del           = require('del'),
  babel         = require('gulp-babel');

const   css   = 'stylesheets',
  cssSrc      = 'dev/stylesheets/',
  cssDest     = 'public/stylesheets',

  js          = 'javascripts',
  jsSrc       = 'dev/javascripts/main/',
  jsDest      = 'public/javascripts',

  img         = 'images',
  imgSrc      = 'dev/images/',
  imgDest     = 'public/images';

const   eslintSettings = {
  rules: {
    "indent": ["error", 2 ],
    /*    "linebreak-style": [
     "error",
     "windows"
     ],*/
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
  },
  globals: [
    'jQuery',
    '$'
  ],
  envs: [
    'browser'
  ]
};


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
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(eslint(eslintSettings))
    .pipe(eslint.format())
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
