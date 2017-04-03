import {pugPaths} from '../config'
import {gulp, plumber, notify, sourcemaps, pug, browserSync} from '../modules'

gulp.task('pug', () => {
    return gulp.src(pugPaths.src)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(sourcemaps.init())
        .pipe(pug({
            pretty: '    '
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(pugPaths.dest))
        .pipe(browserSync.stream())
})
