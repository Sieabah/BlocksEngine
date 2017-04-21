var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('system', function(){
    return gulp.src(require('systemjs').scriptSrc)
        .pipe(concat('system.js'))
        .pipe(gulp.dest('public'));
});