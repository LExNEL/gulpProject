import {gulp, webpack, browserSync, webpackDevMiddleware, webpackHotMiddleware} from '../modules'
import webpackConfig from '../../webpack.config.babel'

let bundler = webpack(webpackConfig)

browserSync.create()

gulp.task('browser-sync', () => {
    browserSync.init({
        reload: false,
        server: {
            baseDir: './dist/',
            middleware: [
                webpackDevMiddleware(bundler, {
                    hot: true,
                    publicPath: webpackConfig.output.publicPath,
                    stats: { colors: true }
                }),
                webpackHotMiddleware(bundler)
            ],
        },
        open: false,
    })
})
