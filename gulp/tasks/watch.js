import {gulp, watch, batch} from '../modules'

gulp.task('watch', () => {
    watch('./src/pug/**/*.pug', batch((events, done) => {
        gulp.start('pug', done)
    }))
    watch('./src/stylus/**/*.styl', batch((events, done) => {
        gulp.start('stylus', done)
    }))
    watch('./src/babel/**/*.js', batch((events, done) => {
        gulp.start('babel', done)
    }))
})
