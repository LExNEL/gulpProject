'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'
import stylus from 'gulp-stylus'
import pug from 'gulp-pug'

import nib from 'nib'
import jeet from 'jeet'

import sourcemaps from 'gulp-sourcemaps'

import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

import browserSync from 'browser-sync'

const dirs = {
    src: 'src',
    dest: 'dist'
}

const pugPaths = {
    src: `${dirs.src}/pug/*.pug`,
    dest: `${dirs.dest}/`
}

const stylusPaths = {
    src: `${dirs.src}/stylus/*.styl`,
    dest: `${dirs.dest}/style/`
}

const babelPaths = {
    src: `${dirs.src}/babel/*.js`,
    dest: `${dirs.dest}/script/`
}

gulp.task('pug', () => {
    return gulp.src(pugPaths.src)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(sourcemaps.init())
        .pipe(pug({
            pretty: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(pugPaths.dest))
        .pipe(browserSync.stream())
})

gulp.task('stylus', () => {
    return gulp.src(stylusPaths.src)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: [
                nib(),
                jeet()
            ]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(stylusPaths.dest))
        .pipe(browserSync.stream())
})

gulp.task('babel', () => {
    return gulp.src(babelPaths.src)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(babelPaths.dest))
        .pipe(browserSync.stream())
})

browserSync.create()

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    })
})

gulp.task('watch', () => {
    gulp.watch('./src/pug/**/*.pug', ['pug'])
    gulp.watch('./src/stylus/**/*.styl', ['stylus'])
    gulp.watch('./src/babel/**/*.js', ['babel'])
})

gulp.task('default', ['pug', 'stylus', 'babel', 'watch', 'browser-sync'])
