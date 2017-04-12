// Import modules
import gulp_ from 'gulp'
import gulp_watch from 'gulp-watch'
import gulp_batch from 'gulp-batch'

import gulp_babel from 'gulp-babel'
import gulp_flowtype from 'gulp-flowtype'

import webpack_ from 'webpack'
import webpack_stream from 'webpack-stream'

import gulp_stylus from 'gulp-stylus'
import gulp_pug from 'gulp-pug'
import gulp_spritesmith from 'gulp.spritesmith'
import gulp_folder from 'gulp-folders'
import path_ from 'path'
import fs_ from 'fs'
import es_ from 'event-stream'

import nib_ from 'nib'
import jeet_ from 'jeet'

import gulp_autoprefixer from 'gulp-autoprefixer'
import gulp_csscomb from 'gulp-csscomb'

import gulp_sourcemaps from 'gulp-sourcemaps'

import gulp_plumber from 'gulp-plumber'
import gulp_notify from 'gulp-notify'
import gulp_if from 'gulp-if'

import browser_sync from 'browser-sync'

// Export modules
export const gulp = gulp_
export const watch = gulp_watch
export const batch = gulp_batch

export const babel = gulp_babel
export const flow = gulp_flowtype

export const webpack = webpack_
export const webpackStream = webpack_stream

export const stylus = gulp_stylus
export const pug = gulp_pug
export const spritesmith = gulp_spritesmith
export const folder = gulp_folder
export const path = path_
export const fs = fs_
export const es = es_

export const nib = nib_
export const jeet = jeet_

export const autoprefixer = gulp_autoprefixer
export const csscomb = gulp_csscomb

export const sourcemaps = gulp_sourcemaps

export const plumber = gulp_plumber
export const notify = gulp_notify
export const gulpIf = gulp_if

export const browserSync = browser_sync
