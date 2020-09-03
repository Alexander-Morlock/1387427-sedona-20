const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

const gulpWebp = require("gulp-webp");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const del = require("del");
const replace = require('gulp-replace');

const uglify = require('gulp-uglify-es').default;

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series(html)).on("change", sync.reload);
  gulp.watch("source/js/**/*.js", gulp.series("javascript"));
}


// Gulp WebP

const webp = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(gulpWebp())
    .pipe(gulp.dest("source/img"))
};

exports.web = gulpWebp;

// Images optimization

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.mozjpeg({ progressive: true }),
      imagemin.svgo()
    ]))
}
exports.images = images;

// SVG Sprite

const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}
exports.sprite = sprite;

// Production

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
};
exports.copy = copy;

// Clean «Build» folder

const clean = () => {
  return del("build");
};
exports.clean = clean;

const html = () => {
  return gulp.src("./source/*.html")
    .pipe(replace('script.js', 'script.min.js'))
    .pipe(gulp.dest("build"));
};

const javascript = () => {
  return gulp.src("./source/js/script.js")
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build"));
};
exports.javascript = javascript;

// Build

const build = gulp.series(
  clean,
  copy,
  styles,
  sprite,
  html,
  javascript
);
exports.build = build;

// Default
exports.default = gulp.series(
  build,
  server,
  watcher,
);
