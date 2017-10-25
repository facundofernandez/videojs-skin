const
    gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload;

/* Tarea Server */
gulp.task('server', ['sass'], function(){
    browserSync.init({
        server: "./"
    });

    /* Lugares donde el evento watch escucha cambios en archivos */
    gulp.watch(['sass/**/*.scss'], ['sass']);
    gulp.watch("*.html").on('change', reload );
});

/* Tarea Sass */
gulp.task('sass',function(){
    let stream = gulp.src(['sass/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());

    return stream;
});

gulp.task('default', ['server']);