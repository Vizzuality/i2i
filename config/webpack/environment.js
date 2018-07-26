const { environment } = require('@rails/webpacker');

environment.config.merge({
  module: {
    rules: [
      {
        test: /\.(sql|cartocss)$/,
        use: 'raw-loader'
      }
    ]
  }
})

module.exports = environment
