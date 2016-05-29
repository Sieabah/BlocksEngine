var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    watch = require('gulp-watch');

gulp.task('game', function(){
    return gulp.src('src/game/**/*.ts')
        .pipe(ts({
            target: 'ES5',
            out: 'game.js'
        }))
        .pipe(gulp.dest('built/local'));
});

gulp.task('default', ['game'], function () {});

gulp.task('watch', ['default'], function(){
    console.log("Watching...");
    gulp.watch('src/**/*.ts',['default']);
});
