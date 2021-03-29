const path = require('path')
//判断是否为生产环境
const isProd = process.env.NODE_ENV === 'production'

const devServerPort = 8777 // TODO: get this variable from setting.ts
const name = 'app' // TODO: get this variable from setting.ts

const publicPath = process.env.VUE_APP_PUBLIC_PATH
console.log(publicPath)
const mockServer = 'http://172.17.20.226:8010/mockjsdata/15'
// const mockServer = 'http://172.17.20.222:8080'

module.exports = {
  publicPath: publicPath,
  lintOnSave: true,
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: !isProd,
  devServer: {
    port: devServerPort,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/API': {
        target: mockServer,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          ['^/API']: ''
        }
      }
    }
  },
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        modules: {
          localIdentName: '[name]_[hash:base64:8]'
        },
        localsConvention: 'camelCaseOnly'
      }
    }
  },
  pluginOptions: {
    // 'style-resources-loader': {
    //   preProcessor: 'scss',
    //   patterns: [path.resolve(__dirname, 'src/styles/_variables.scss'), path.resolve(__dirname, 'src/styles/_mixins.scss')]
    // }
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)

    // https://webpack.js.org/configuration/devtool/#development
    config.when(!isProd, config => config.devtool('cheap-eval-source-map'))

    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    if (isProd) {
      config.optimization.minimize(true) // 代码压缩
      // 移除 prefetch 插件
      config.plugins.delete('prefetch')
    }

    // remove vue-cli-service's progress output
    config.plugins.delete('progress')

    config.when(!isProd, config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'src/components'),
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
