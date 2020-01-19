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

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/less/index.less')
      ]
    },
    i18n: {
      locale: 'n',
      fallbackLocale: 'n',
      localeDir: 'locales',
      enableInSFC: false
    }
  },

  outputDir: 'dist/createapi',
  publicPath: process.env.NODE_ENV === 'production' ? '/createapi/' : '/',
}
