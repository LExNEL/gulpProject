import {gulp, browserSync} from '../modules'

browserSync.create()

gulp.task('browser-sync', () => {
    browserSync.init({
        reloadDelay: 500,
        server: {
            baseDir: './dist/'
        },
        open: false
    })
})
