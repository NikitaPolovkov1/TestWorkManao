const gulp = require("gulp");

require('./gulp/dev.js');
require('./gulp/docs.js');



gulp.task('default',
    gulp.series(
        'clean:dev',
        gulp.parallel( 'includeSass:dev', 'includeHtml:dev', 'copyImages:dev', 'copyFonts:dev', 'js:dev'),
        gulp.parallel('startServer:dev', 'watch:dev')
    )
);


gulp.task('docs',
    gulp.series(
        'clean:docs',
        gulp.parallel( 'includeSass:docs', 'includeHtml:docs', 'copyImages:docs', 'copyFonts:docs', 'js:docs'),
        gulp.parallel('startServer:docs')
    )
);