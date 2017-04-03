import {imagePaths} from '../config'
import {gulp, gulpIf, folder, path, spritesmith} from '../modules'

gulp.task('sprite', folder(imagePaths.src, (folder) => {
    return gulp.src(path.join(imagePaths.src, folder, '*.*'))
        .pipe(spritesmith({
            imgName: `../images/${folder}.png`,
            cssName: `_${folder}.styl`,
            cssFormat: 'stylus',
            algorithm: 'top-down'
        }))
        .pipe(gulpIf('*.styl', gulp.dest('src/stylus/_sprites')))
        .pipe(gulpIf('*.png', gulp.dest(imagePaths.dest)))
}))
