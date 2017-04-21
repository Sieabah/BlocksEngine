var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('system', function(){
    return gulp.src([
        require('systemjs').scriptSrc,
        require.resolve('pixi.js')
    ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('public'));
});