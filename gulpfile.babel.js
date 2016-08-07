'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'
import flow from 'gulp-flowtype'
import stylus from 'gulp-stylus'
import pug from 'gulp-pug'
import spritesmith from 'gulp.spritesmith'
import folder from 'gulp-folders'
import path from 'path'

import nib from 'nib'
import jeet from 'jeet'

import sourcemaps from 'gulp-sourcemaps'

import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import gulpIf from 'gulp-if'
import mainBowerFiles from 'main-bower-files'

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

const imagePaths = {
    src: `${dirs.src}/images/`,
    dest: `${dirs.dest}/images/`
}

gulp.task('pug', () => {
    return gulp.src(pugPaths.src)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
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
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
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
                'es2015'
            ],
            plugins: [
                'syntax-flow',
                'transform-flow-strip-types'
            ]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(babelPaths.dest))
        .pipe(browserSync.stream())
})

gulp.task('sprite', folder(imagePaths.src, (folder) => {
    return gulp.src(path.join(imagePaths.src, folder, '*.png'))
        .pipe(spritesmith({
            imgName: `${folder}.png`,
            cssName: `_${folder}.styl`,
            cssFormat: 'stylus',
            algorithm: 'top-down'
        }))
        .pipe(gulpIf('*.styl', gulp.dest('src/stylus/_sprites')))
        .pipe(gulpIf('*.png', gulp.dest(imagePaths.dest)))
}))

gulp.task('bower', () => {
	return gulp.src(mainBowerFiles())
		.pipe(gulp.dest('dist/script/lib'))
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

gulp.task('default', ['pug', 'stylus', 'babel', 'bower', 'watch', 'browser-sync'])
