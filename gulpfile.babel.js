'use strict'

import gulp from 'gulp'
import babel from 'gulp-babel'
import stylus from 'gulp-stylus'
import pug from 'gulp-pug'

const dirs = {
	src: 'src',
	dest: 'dest'
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
	dest: `${dirs.dest}/babel/`
}

gulp.task('pug', () => {
	return gulp.src(pugPaths.src)
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(pugPaths.dest))
})

gulp.task('stylus', () => {
	return gulp.src(stylusPaths.src)
		.pipe(stylus())
		.pipe(gulp.dest(stylusPaths.dest))
})

gulp.task('babel', () => {
	return gulp.src(babelPaths.src)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(babelPaths.dest))
})

gulp.task('watch', () => {
	gulp.watch('./src/pug/**/*.pug', ['pug'])
	gulp.watch('./src/stylus/**/*.styl', ['stylus'])
	gulp.watch('./src/script/**/*.js', ['babel'])
})

gulp.task('default', ['pug', 'stylus', 'babel', 'watch'])
