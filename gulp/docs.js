const gulp = require("gulp");
const fileInclude = require("gulp-file-include");
const sass = require("gulp-sass")(require('sass'));
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const groupmedia = require('gulp-group-css-media-queries');
const imagemin = require('gulp-imagemin');
const webpack = require('webpack-stream');
const csso = require('gulp-csso');
const  htmlclean = require('gulp-htmlclean');

const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file'
};

const serverSetting = {
    livereload: true,
    open: true
}

const plumberSassSetting = {
    errorHandler: notify.onError({
        title: 'Styles',
        message: 'Error <%= error.message %>',
        sound: false
    })
};

const plumberHtmlSetting = {
    errorHandler: notify.onError({
        title: 'Html',
        message: 'Error <%= error.message %>',
        sound: false
    })
};


gulp.task('includeHtml:docs', function(){
    return gulp
        .src('./src/*.html')
        .pipe(plumber(plumberHtmlSetting))
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(htmlclean())
        .pipe(gulp.dest('./docs/'))
});

gulp.task('includeSass:docs', function (){
    return gulp
        .src('./src/scss/*.scss')
        .pipe(plumber(plumberSassSetting))
        .pipe(sass())
        .pipe(groupmedia())
        .pipe(sourcemaps.write())
        .pipe(csso())
        .pipe(gulp.dest('./docs/css/'))
});

gulp.task('copyImages:docs', function() {
    return gulp
        .src('./src/img/**/*')
        .pipe(imagemin({verbose:true}))
        .pipe(gulp.dest('./docs/img'));
});


gulp.task('copyFonts:docs', function(){
    return gulp
        .src('./src/fonts/**/*')
        .pipe(gulp.dest('./docs/fonts'));
})

gulp.task('js:docs', function(){
    return gulp
        .src('./src/js/**/*')
        .pipe(webpack(require('../webpack.config.js')))
        .pipe(gulp.dest('./docs/js'))
})


gulp.task('startServer:docs', function(){
    return gulp
        .src('./docs/')
        .pipe(server(serverSetting));
})

gulp.task('clean:docs', function(done){
    if(fs.existsSync('./docs/'))
    {
        return gulp
            .src('./docs/')
            .pipe(clean())
    }
    done();
})


