var gulp = require('gulp');
var less = require('gulp-less');
// var sass = require('gulp-sass');
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var watch = require('gulp-watch-less');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var del = require('del');

const buildDir = './build';

// gulp.task('del-css', function(cb) {
//     del(['./css/*.css'], cb);
// });
// gulp.task('del-html', function(cb) {
//     del(['*.html', './modules/**/*.html'], cb);
// });
gulp.task('del', function(cb) {
    // del([buildDir + '/**/*'], cb);
});

gulp.task('pug', function () {
    gulp.src('./src/pug/**/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty:true
        }))
        .pipe(gulp.dest(buildDir))
});

gulp.task('compile-less', function () {
    gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest(buildDir + '/css'))
        .pipe(concat('style.css'))
        .pipe(cleanCSS())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(buildDir + '/css'));
});

// gulp.task('compile-sass', function () {
//     gulp.src('./node_modules/bootstrap/scss/*.scss')
//         .pipe(sass())
//         .pipe(concat('bootstrap.css'))
//         .pipe(gulp.dest('./css'))
//         .pipe(cleanCSS())
//         .pipe(rename({suffix: ".min"}))
//         .pipe(gulp.dest('./css'))
// });

gulp.task('watch-less', function() {
    gulp.watch('./src/less/**/*.less' , ['compile-less']).on('change', browserSync.reload);
});

gulp.task('watch-pug', function () {
    gulp.watch('./src/pug/**/*.pug' , ['pug']).on('change', browserSync.reload);
});

// gulp.task('watch-sass', function() {
//     gulp.watch('./node_modules/bootstrap/scss/*.scss' , ['compile-sass']).on('change', browserSync.reload);
// });

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

// gulp.task('resources', function() {
//     gulp.src('resources/**')
//         .pipe(gulp.dest(buildDir + '/resources'));
// });
// gulp.task('ttt', function() {
//     gulp.src('scripts/**')
//         .pipe(gulp.dest(buildDir + '/scripts'));
// });
// gulp.task('scripts', function() {
// });
gulp.task('resources', function() {
    gulp.src('./resources/**')
        .pipe(gulp.dest(buildDir + '/resources'));
});

gulp.task('scripts', function() {
    gulp.src('./scripts/**')
        .pipe(gulp.dest(buildDir));
});

gulp.task('res', ['resources', 'scripts']);

gulp.task('default', ['del', 'res', 'pug', 'watch-pug', 'compile-less', 'watch-less', /*'compile-sass', 'compile-sass', 'watch-sass',*/ 'browser-sync']);
