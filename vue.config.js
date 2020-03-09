const path = require('path');
module.exports = {
  chainWebpack: config => {
    config.module.rule('md')
    .test(/\.md$/)
    .use('html-loader')
    .loader('html-loader')
    .end()
    .use('markdown-loader')
    .loader('markdown-loader')
    .end()
  },

  outputDir: 'dist/generatejson',
  publicPath: process.env.NODE_ENV === 'production' ? '/generatejson/' : '/',

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/less/index.less')
      ]
    },
    i18n: {
      locale: 'zh',
      fallbackLocale: 'zh',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
