import {stylusPaths, isProduction} from '../config'
import {gulp, gulpIf, plumber, notify, sourcemaps, stylus, nib, jeet, autoprefixer, csscomb, browserSync} from '../modules'

gulp.task('stylus', () => {
    return gulp.src(stylusPaths.src)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulpIf(!isProduction, sourcemaps.init()))
        .pipe(stylus({
            use: [
                nib(),
                jeet()
            ]
        }))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulpIf(!isProduction, sourcemaps.write()))
        .pipe(gulpIf(isProduction, csscomb()))
        .pipe(gulp.dest(stylusPaths.dest))
        .pipe(browserSync.stream())
})
