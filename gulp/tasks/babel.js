import {babelPaths, isProduction} from '../config'
import {gulp, gulpIf, rename, plumber, notify, sourcemaps, uglify, webpack, webpackStream, browserSync} from '../modules'
import webpackConfig from '../../webpack.config.babel'

gulp.task('babel', () => {
    return gulp.src(babelPaths.src)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(gulpIf(!isProduction, sourcemaps.init()))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulpIf(!isProduction, sourcemaps.write()))
        .pipe(gulp.dest(babelPaths.dest))
        .pipe(gulpIf(isProduction, uglify()))
        .pipe(gulpIf(isProduction, rename({
            suffix: '.min'
        })))
        .pipe(gulp.dest(babelPaths.dest))
        // .pipe(browserSync.stream())
})
