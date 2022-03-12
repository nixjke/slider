const HtmlWebpaclPlugin = require('html-webpack-plugin')

let mode = 'development'

if (process.env.NODE_ENV === 'production') {
  mode = 'production'
}

module.exports = {
  mode: mode,
  entry: './src/demo/index.js',

  output: {
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.hbs/,
        loader: 'handlebars-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpaclPlugin({
      template: './src/demo/index.html',
    }),
  ],
  devServer: {
    static: './src/demo/index.html',
    hot: true,
  },
  resolve: {
    extensions: ['*', '.js', '.ts'],
  },
}
