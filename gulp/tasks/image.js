import {imagePaths, spritePaths} from '../config'
import {gulp, gulpIf, folder, path, spritesmith, svgSprite} from '../modules'

gulp.task('image', () => {
    return gulp.src([`${imagePaths.src}/**`, `!${imagePaths.src}/{sprites,sprites/**}`])
        .pipe(gulp.dest(imagePaths.dest))
})

gulp.task('sprite:png', folder(spritePaths.src, (folder) => {
    return gulp.src(path.join(spritePaths.src, folder, '*.{png,jpg,jpeg}'))
        .pipe(spritesmith({
            imgName: `../images/${folder}.png`,
            cssName: `_${folder}.styl`,
            cssFormat: 'stylus',
            algorithm: 'top-down'
        }))
        .pipe(gulpIf('*.styl', gulp.dest('src/stylus/_sprites')))
        .pipe(gulpIf('*.png', gulp.dest(imagePaths.dest)))
}))

gulp.task('sprite:svg', folder(spritePaths.src, (folder) => {
    return gulp.src(path.join(spritePaths.src, folder, '*.svg'))
        .pipe(svgSprite({
            mode: {
                css: {
                    render: {
                        styl: {dest: `_${folder}.styl`}
                    },
                    dest: '',
                    prefix: '.',
                    dimensions: '',
                    sprite: `../images/${folder}.svg`,
                    bust: false
                }
            }
        }))
        .pipe(gulpIf('*.styl', gulp.dest('src/stylus/_sprites')))
        .pipe(gulpIf('*.svg', gulp.dest(imagePaths.dest)))
}))
