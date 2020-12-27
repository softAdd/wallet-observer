const gulp = require('gulp')
const i18nextParser = require('i18next-parser').gulp;
const i18nextConfig = require('./i18next-parser.config');

gulp.task('i18next', function () {
  return gulp.src('src/**')
    .pipe(new i18nextParser(i18nextConfig))
    .pipe(gulp.dest('./public'));
});