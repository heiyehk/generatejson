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
        'F:\\code\\frontend\\platform\\createapiweb\\src\\less\\index.less'
      ]
    },
    i18n: {
      locale: 'n',
      fallbackLocale: 'n',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}