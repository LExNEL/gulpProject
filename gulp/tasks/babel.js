import {babelPaths} from '../config'
import {gulp, plumber, notify, sourcemaps, babel, flow, eslint, browserSync} from '../modules'

gulp.task('babel', () => {
    return gulp.src(babelPaths.src)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(flow({
            all: false,
            weak: false,
            declarations: './declarations',
            killFlow: false,
            beep: true,
            abort: false
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [
                'env',
                'flow'
            ]
        }))
        .pipe(eslint({
            configFile: '.eslintrc.yml'
        }))
        .pipe(eslint.format())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(babelPaths.dest))
        .pipe(browserSync.stream())
})
