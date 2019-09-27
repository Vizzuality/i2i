const webpack = require('webpack');
const { environment } = require('@rails/webpacker');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

// resolve-url-loader must be used before sass-loader
environment.loaders.get('sass').use.splice(-1, 0, {
  loader: 'resolve-url-loader',
  options: {
    attempts: 1
  }
});

environment.config.merge({
  module: {
    rules: [
      {
        test: /\.(sql|cartocss)$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        FSP_CARTO_TABLE: JSON.stringify(process.env.FSP_CARTO_TABLE)
      }
    })
  ]
})

module.exports = environment
