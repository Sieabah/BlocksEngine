var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

gulp.task('game', function(){
    return gulp.src('src/game/**/*.ts')
        .pipe(ts({
            target: 'ES5',
            out: 'game.js'
        }))
        .pipe(gulp.dest('built/local'));
});

gulp.task('prod', ['game'], function () {
    return gulp.src('built/local/game.js')
        .pipe(uglify())
        .pipe(gulp.dest('built/prod'));
});

gulp.task('default', ['game'], function () {});

gulp.task('watch', ['default'], function(){
    console.log("Watching...");
    gulp.watch('src/**/*.ts',['default']);
});
