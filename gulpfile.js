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


const plumberJsSetting = {
    errorHandler: notify.onError({
        title: 'Js',
        message: 'Error <%= error.message %>',
        sound: false
    })
};

gulp.task('includeHtml', function(){
    return gulp
        .src('./src/*.html')
        .pipe(plumber(plumberHtmlSetting))
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('includeSass', function (){
   return gulp
       .src('./src/scss/*.scss')
       .pipe(plumber(plumberSassSetting))
       .pipe(sourcemaps.init())
       .pipe(sass())
       // .pipe(groupmedia()) -- Для продакшена, кабы объеденилися медики
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('./dist/css/'))
});

gulp.task('copyImages', function() {
    return gulp
        .src('./src/img/**/*')
        /*.pipe(imagemin({verbose:true}))*/
        .pipe(gulp.dest('./dist/img'));
});


gulp.task('copyFonts', function(){
    return gulp
        .src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
})

gulp.task('js', function(){
    return gulp
        .src('./src/js/**/*')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dist/js'))
})


gulp.task('startServer', function(){
    return gulp
        .src('./dist/')
        .pipe(server(serverSetting));
})

gulp.task('clean', function(done){
    if(fs.existsSync('./dist/'))
    {
        return gulp
            .src('./dist/')
            .pipe(clean())
    }
    done();
})


gulp.task('watch', function (){
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('includeSass'));
    gulp.watch('./src/**/*.html', gulp.parallel('includeHtml'));
    gulp.watch('./src/img/**/*', gulp.parallel('copyImages'));
    gulp.watch('./src/fonts/**/*', gulp.parallel('copyFonts'));
    gulp.watch('./src/js/**/*.js', gulp.parallel('js'));
})

gulp.task('default',
    gulp.series(
        'clean',
        gulp.parallel( 'includeSass', 'includeHtml', 'copyImages', 'copyFonts', 'js'),
        gulp.parallel('startServer', 'watch')
    )
);

