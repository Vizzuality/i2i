process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

module.exports = environment.toWebpackConfig()

// // webpack.config.js
// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.sql$/,
//         use: 'raw-loader'
//       }
//     ]
//   }
// }
