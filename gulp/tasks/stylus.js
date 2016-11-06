import {stylusPaths} from '../config'
import {gulp, plumber, notify, sourcemaps, stylus, nib, jeet, autoprefixer, csscomb, browserSync} from '../modules'

gulp.task('stylus', () => {
    return gulp.src(stylusPaths.src)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: [
                nib(),
                jeet()
            ]
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9'],
            cascade: false
        }))
        .pipe(csscomb())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(stylusPaths.dest))
        .pipe(browserSync.stream())
})
