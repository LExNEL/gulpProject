import {libPaths} from '../config'
import {gulp, fs, es} from '../modules'

let buffer,
    packages,
    package_names

buffer = fs.readFileSync('./package.json')
packages = JSON.parse(buffer.toString())
package_names = []

for (let key in packages.dependencies) {
    package_names.push(key)
}

gulp.task('libs', () => {
    return es.merge(package_names.map((name) => {
        return gulp.src(libPaths.src + name + '/**/*.*')
            .pipe(gulp.dest(libPaths.dest + name))
    }))
})
