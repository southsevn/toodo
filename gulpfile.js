const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cssnano = require("cssnano");
const concat = require('gulp-concat');
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require('gulp-uglify-es').default;

// BrowserSync
// Таск для автоматической перезагрузки бразуера при изменениях
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./src"
        }
    });
    done();
}

// BrowserSync - перезагрузка страницы, при изменениях
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Компиляция Sass в CSS
function css() {
    return gulp
        .src("./src/styles/src/**/*.sass")
        .pipe(plumber())
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(gulp.dest("./src/styles/dist/"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest("./src/styles/dist/"))
        .pipe(browsersync.stream());
}

// Компиляция и минификация js файлов
function js() {
    return gulp
        .src(['./src/scripts/src/**/*.js',])
        .pipe(concat('index.js'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify())
        .pipe(plumber())
        .pipe(gulp.dest('./src/scripts/dist'))
}

// Конкатенация всех JS библиотек в один файл и минификаци
// function jsLibs() {
//     return gulp
//         .src([
//             './node_modules/jquery/dist/jquery.min.js',
//             './node_modules/uikit/dist/js/uikit.min.js'
//         ])
//         .pipe(concat('libs.js'))
//         .pipe(rename({ suffix: ".min" }))
//         .pipe(uglify())
//         .pipe(gulp.dest('./src/scripts/dist'))
// }

// Конкатенация всех CSS библиотек в один файл и минификаци
function cssLibs() {
    return gulp
        .src([
            './node_modules/bootstrap/dist/css/bootstrap.min.css',
        ])
        .pipe(concat('libs.css'))
        .pipe(plumber())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest('./src/styles/dist'))
}

// Watch files
function watchFiles() {
    gulp.watch("./src/styles/src/**/*", css);
    gulp.watch("./src/scripts/src/**/*", js);
    gulp.watch("./src/scripts/dist/*", browserSyncReload);
    gulp.watch("./src/styles/dist/*", browserSyncReload);
    gulp.watch("./src/index.html", browserSyncReload)
}

function buildFiles() {
    gulp.src('./src/styles/dist/*').pipe(gulp.dest('./dist/styles/dist'));
    gulp.src('./src/scripts/dist/*').pipe(gulp.dest('./dist/scripts/dist'));
    gulp.src('./src/index.html').pipe(gulp.dest('./dist/'));
}


// define complex tasks
const build = buildFiles;


//Add jsLibs task
const watch = gulp.parallel(cssLibs, js, watchFiles, browserSync);

// export tasks
exports.css = css;
exports.cssLibs = cssLibs;
// exports.jsLibs = jsLibs;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = watch;
