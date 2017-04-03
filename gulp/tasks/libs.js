import {libPaths} from '../config'
import {gulp} from '../modules'

gulp.task('libs', () => {
    return gulp.src(libPaths.src)
        .pipe(gulp.dest(libPaths.dest))
})
