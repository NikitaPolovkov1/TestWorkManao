const gulp = require("gulp");
const fileInclude = require("gulp-file-include");
const sass = require("gulp-sass")(require('sass'));
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const webpack = require('webpack-stream');


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


gulp.task('includeHtml:dev', function(){
    return gulp
        .src('./src/*.html')
        .pipe(plumber(plumberHtmlSetting))
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(gulp.dest('./build/'))
});

gulp.task('includeSass:dev', function (){
    return gulp
        .src('./src/scss/*.scss')
        .pipe(plumber(plumberSassSetting))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css/'))
});

gulp.task('copyImages:dev', function() {
    return gulp
        .src('./src/img/**/*')
        .pipe(gulp.dest('./build/img'));
});


gulp.task('copyFonts:dev', function(){
    return gulp
        .src('./src/fonts/**/*')
        .pipe(gulp.dest('./build/fonts'));
})

gulp.task('js:dev', function(){
    return gulp
        .src('./src/js/**/*')
        .pipe(webpack(require('../webpack.config.js')))
        .pipe(gulp.dest('./build/js'))
})


gulp.task('startServer:dev', function(){
    return gulp
        .src('./build/')
        .pipe(server(serverSetting));
})

gulp.task('clean:dev', function(done){
    if(fs.existsSync('./build/'))
    {
        return gulp
            .src('./build/')
            .pipe(clean())
    }
    done();
})


gulp.task('watch:dev', function (){
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('includeSass:dev'));
    gulp.watch('./src/**/*.html', gulp.parallel('includeHtml:dev'));
    gulp.watch('./src/img/**/*', gulp.parallel('copyImages:dev'));
    gulp.watch('./src/fonts/**/*', gulp.parallel('copyFonts:dev'));
    gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
})

