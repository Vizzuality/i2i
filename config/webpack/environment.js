const { environment } = require('@rails/webpacker');

environment.config.merge({
  module: {
    rules: [
      {
        test: /\.sql$/,
        use: 'raw-loader'
      }
    ]
  }  
})

module.exports = environment
