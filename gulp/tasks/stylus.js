import {stylusPaths, isProduction} from '../config'
import {gulp, gulpIf, rename, plumber, notify, sourcemaps, stylus, koutoSwiss, rupture, postcss, lost, autoprefixer, csscomb, clean, browserSync} from '../modules'

gulp.task('stylus', () => {
    return gulp.src(stylusPaths.src)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulpIf(!isProduction, sourcemaps.init()))
        .pipe(stylus({
            use: [
                koutoSwiss(),
                rupture()
            ]
        }))
        .pipe(postcss([
            lost()
        ]))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulpIf(!isProduction, sourcemaps.write()))
        .pipe(gulpIf(isProduction, csscomb()))
        .pipe(gulp.dest(stylusPaths.dest))
        .pipe(gulpIf(isProduction, clean()))
        .pipe(gulpIf(isProduction, rename({
            suffix: '.min'
        })))
        .pipe(gulp.dest(stylusPaths.dest))
        .pipe(browserSync.stream())
})
