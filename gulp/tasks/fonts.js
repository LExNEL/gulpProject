import {fontPaths} from '../config'
import {gulp} from '../modules'

gulp.task('fonts', () => {
    return gulp.src(fontPaths.src)
        .pipe(gulp.dest(fontPaths.dest))
})
