'use strict';

// Load dependencies
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const babel = require ('gulp-babel');
const cleanCss = require('gulp-clean-css');
const concat = require ('gulp-concat');
const eslint = require('gulp-eslint');
const imagemin = require ('gulp-imagemin');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');

const source = {
    sass: './src/sass/custom/**/*.scss',
    bootstrap: './src/sass/bootstrap/*.scss',
    scripts: {
        custom: './src/js/*.js',
        vendor: './src/js/vendor/**/*.js'
    },
    images: './src/img/**/*'
};

const watch = {
    sass: './src/sass/custom/**/*.scss',
    bootstrap: './src/sass/bootstrap/*.scss',
    scripts: {
        custom: './src/js/*.js',
        vendor: './src/js/vendor/**/*.js'
    },
    images: './src/img/**/*',
    handlebars: './views/**/*.handlebars'
};

const output = {
    sass: './public/assets/css',
    bootstrap: './public/assets/css/bootstrap',
    scripts: './public/assets/js',
    images: './public/img'
};

const imageSettings = [
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
];

const autoprefixerBrowsers = [
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

// Compile and automatically prefix stylesheets
gulp.task('sass', () => {
    return gulp.src(source.sass)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.sass))
        .pipe(browserSync.stream());
});

// Compile Bootstrap scss
gulp.task('bootstrap', () => {
    return gulp.src(source.bootstrap)
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.bootstrap))
        .pipe(browserSync.stream());
});

// Process all custom Javascript files
gulp.task('scripts-custom', () => {
    return gulp.src(source.scripts.custom)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ['es2015']}))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.scripts));
});

// Process all vendor Javascript files
gulp.task('scripts-vendor', () => {
    return gulp.src(source.scripts.vendor)
        .pipe(gulp.dest(output.scripts));
});

// Image optimalisation 
gulp.task('images', () => {
    return gulp.src(source.images)
        .pipe(imagemin(imageSettings))
        .pipe(gulp.dest(output.images))
});

// Sets browsersync
gulp.task('serve', ['sass', 'bootstrap', 'scripts-custom', 'scripts-vendor', 'images'], () => {
    browserSync.init({
        proxy: "localhost:3000",
        port: 4000
    });

    gulp.watch(watch.sass, ['sass']);
    gulp.watch(watch.bootstrap, ['bootstrap']);
    gulp.watch(watch.scripts.custom, ['scripts-custom']).on('change', browserSync.reload);
    gulp.watch(watch.scripts.vendor, ['scripts-vendor']).on('change', browserSync.reload);
    gulp.watch(watch.images, ['images']).on('change', browserSync.reload);
    gulp.watch(watch.handlebars).on('change', browserSync.reload);
});
   
// Initialize default task
gulp.task('default', ['serve']);