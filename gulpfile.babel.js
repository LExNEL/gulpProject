import gulp from 'gulp'
import requireDir from 'require-dir'

requireDir('./gulp', {recurse: true})

gulp.task('default', ['pug', 'stylus', 'babel', 'watch', 'browser-sync'])
