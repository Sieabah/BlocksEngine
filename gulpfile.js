var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat');

gulp.task('packages', function(){
    return gulp.src('src/packages/**/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('built/local'));
});

gulp.task('game', ['packages'], function(){
    return gulp.src('src/game/**/*.ts')
        .pipe(ts({
            target: 'ES5',
            out: 'game.js'
        }))
        .pipe(gulp.dest('built/local'));
});

gulp.task('prod', ['game'], function () {
    return gulp.src(['built/local/game.js','built/local/vendor.js'])
        .pipe(uglify())
        .pipe(gulp.dest('built/prod'));
});

gulp.task('default', ['game'], function () {});

gulp.task('watch', ['default'], function(){
    console.log("Watching...");
    gulp.watch('src/**/*.ts',['default']);
});
