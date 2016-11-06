const dirs = {
    src: 'src',
    dest: 'dist'
}

export const pugPaths = {
    src: `${dirs.src}/pug/*.pug`,
    dest: `${dirs.dest}/`
}

export const stylusPaths = {
    src: `${dirs.src}/stylus/*.styl`,
    dest: `${dirs.dest}/style/`
}

export const babelPaths = {
    src: `${dirs.src}/babel/*.js`,
    dest: `${dirs.dest}/script/`
}

export const imagePaths = {
    src: `${dirs.src}/images/`,
    dest: `${dirs.dest}/images/`
}

export const fontPaths = {
    src: `${dirs.src}/fonts/**/*.*`,
    dest: `${dirs.dest}/fonts/`
}
