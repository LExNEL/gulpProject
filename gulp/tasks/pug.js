import {pugPaths, isProduction} from '../config'
import {gulp, gulpIf, plumber, notify, sourcemaps, pug, browserSync} from '../modules'

gulp.task('pug', () => {
    return gulp.src(pugPaths.src)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulpIf(!isProduction, sourcemaps.init()))
        .pipe(pug({
            pretty: '    '
        }))
        .pipe(gulpIf(!isProduction, sourcemaps.write()))
        .pipe(gulp.dest(pugPaths.dest))
        .pipe(browserSync.stream())
})
