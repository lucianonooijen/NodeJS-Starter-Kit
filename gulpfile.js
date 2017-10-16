'use strict';

// Load dependencies
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');

const paths = {
    scripts: './src/js/*.js',
    sass: './src/sass/custom/*.sass',
    bootstrap: './src/sass/bootstrap/*.scss'
};

const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Lint JavaScript
gulp.task('lint', () => {
    gulp.src(paths.scripts)
        .pipe(eslint({
            rules: {
                'strict': 1
            },
            globals: [
                'jQuery',
                '$'
            ]
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
});

gulp.task('scripts', () => {
    return gulp.src(paths.scripts)
        .pipe(minify({
            ext:{
                src:'.js',
                min:'.min.js'
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/assets/js'));
});

// Compile and automatically prefix stylesheets
gulp.task('sass', () => {
    return gulp.src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('./public/assets/css'))
        .pipe(browserSync.stream());
});

// Compile Bootstrap scss
gulp.task('bootstrap', () => {
    return gulp.src(paths.bootstrap)
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/assets/css/bootstrap'))
        .pipe(browserSync.stream());
});

// Rerun the task when a file changes 
gulp.task('watch', () => {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.sass, ['sass'])
    gulp.watch(paths.bootstrap, ['bootstrap']);
});

// Browser sync
gulp.task('browser-sync', () => {
    browserSync.init({
        proxy: "localhost:3000"
    });
})
gulp.task('scripts-script', ['js'], function (done) {
    browserSync.reload();
    done();
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', [ 'scripts', 'sass', 'bootstrap', 'watch']);