import gulp from 'gulp'
import requireDir from 'require-dir'

requireDir('./gulp', {recurse: true})

gulp.task('default', [
    'image',
    'sprite:png',
    'sprite:svg',
    'fonts',
    'libs',
    'pug',
    'stylus',
    'babel',
    'watch',
    'browser-sync'
])
