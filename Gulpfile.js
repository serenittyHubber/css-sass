const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const watch = require('gulp-watch');
const DIST = "./public/dist";
const HTML_SOURCE = "./public/**/*.html";
const SCRIPT_SOURCE = "./public/js/**/*.js";
const CSS_SOURCE = "./public/css/**/*.css";

gulp.task('styles', ()=>{
    return gulp
      .src(CSS_SOURCE)
      .pipe(concat("styles.css"))
      .pipe(gulp.dest(DIST + "/css"))
      .pipe(browserSync.stream());
});

gulp.task("scripts", () => {
    gulp
        .src(SCRIPT_SOURCE)
        .pipe(
            plumber(err => {
                console.log("THIS IS THE ERRORRRRR /n/n/n/n/ " + err);
                this.emit("end");
            })
        )
        .pipe(sourcemaps.init())
        .pipe(
            babel({
                presets: ["env"]
            })
        )
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/dist/js/"))
        .pipe(browserSync.stream());
    console.log("scripts");
});

gulp.task("watch", () => {
    gulp.watch([SCRIPT_SOURCE, HTML_SOURCE, CSS_SOURCE], ["scripts", "styles"]);
});
gulp.task("default", ["scripts", "watch"], function() {
  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
});
