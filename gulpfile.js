// 必要プラグインの読み込み (var gulp = ~ でも可)
const gulp     = require("gulp");
const sass     = require("gulp-sass");
const pleeease = require('gulp-pleeease');
const plumber  = require('gulp-plumber');
const notify   = require('gulp-notify');
const cached   = require('gulp-cached');

gulp.task('sass', () => {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cached())
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe(pleeease({
      autoprefixer: {grid: true, "browsers": ["last 4 versions"]}, //ベンダープレフィックス
      mqpacker    : true,
      minifier    : true, //圧縮の有無 true/false
      rem         : ["10px"]
    }))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('watch', function () {
  gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
