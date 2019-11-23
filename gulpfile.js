const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const  svgSprite = require('gulp-svg-sprite');
var sassFiles = 'scss/**/*.scss', cssDest = './css';  // what if i use const here??c
var svgFiles = 'https://res.cloudinary.com/ilaki/image/sprite/svg-sprite' , svgDest = "./css";

 config = {
  
mode: {
    symbol: {
        sprite: "../sprite.svg",
        css: {
            render: {
              css: true
            }
          }
    }
}
};

function createSprite() {
    return gulp.src(svgFiles , { cwd : ''})
    .pipe(svgSprite(config))
    .on('error' , function(error){
        console.log("error for svg Creation");
    })
    .pipe(gulp.dest(svgDest));
}

function styles() {
    return gulp.src(sassFiles)
    .pipe(sass().on('error' , sass.logError))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(cleanCSS())
    .pipe(gulp.dest(cssDest))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server : {
            baseDir : './'
        }
    });
    gulp.watch(sassFiles , styles);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/*.js').on('change', browserSync.reload);
    gulp.watch('./css/symbol/svg/sprite.symbol.svg').on('change' , browserSync.reload);
}
exports.styles = styles;
exports.watch = watch;
exports.svg = createSprite;
exports.default = (styles , watch);