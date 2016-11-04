import gulp from 'gulp'
import watch from 'gulp-watch'
import batch from 'gulp-batch'

import babel from 'gulp-babel'
import flow from 'gulp-flowtype'
import stylus from 'gulp-stylus'
import pug from 'gulp-pug'
import spritesmith from 'gulp.spritesmith'
import folder from 'gulp-folders'
import path from 'path'

import nib from 'nib'
import jeet from 'jeet'

import autoprefixer from 'gulp-autoprefixer'
import csscomb from 'gulp-csscomb'

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

const fontPaths = {
    src: `${dirs.src}/fonts/**/*.*`,
    dest: `${dirs.dest}/fonts/`
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
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9'],
            cascade: false
        }))
        .pipe(csscomb())
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
            imgName: `../images/${folder}.png`,
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

gulp.task('fonts', () => {
    return gulp.src(fontPaths.src)
        .pipe(gulp.dest(fontPaths.dest))
})

browserSync.create()

gulp.task('browser-sync', () => {
    browserSync.init({
        reloadDelay: 500,
        server: {
            baseDir: './dist/'
        },
        open: false
    })
})

gulp.task('watch', () => {
    watch('./src/pug/**/*.pug', batch(function (events, done) {
        gulp.start('pug', done);
    }));
    watch('./src/stylus/**/*.styl', batch(function (events, done) {
        gulp.start('stylus', done);
    }));
    watch('./src/babel/**/*.js', batch(function (events, done) {
        gulp.start('babel', done);
    }));
})

gulp.task('default', ['pug', 'stylus', 'babel', 'watch', 'browser-sync'])
