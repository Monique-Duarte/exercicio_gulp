const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens () {
    return gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'));
}

function comprimeJs () {
    return gulp.src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'));
}

function compilaSass() {
    return gulp.src('./src/styles/main.scss')
    .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

exports.default = function() {
    gulp.watch('./src/styles/*.scss', { ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./src/scripts/*.js', { ignoreInitial: false}, gulp.series(comprimeJs));
    gulp.watch('./src/img/*', { ignoreInitial: false}, gulp.series(comprimeImagens));
}
exports.javascript = comprimeJs;     
exports.images = comprimeImagens;