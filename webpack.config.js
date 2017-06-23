const webpack = require( 'webpack' );
const path = require( 'path' );

const config = {
  context: path.resolve( __dirname, './src' ),
  entry: {
    javascript: './js/entry',
    html: './index.html',
    css: '../css/styles.css'
  },
  output: {
    path: path.resolve( __dirname, './dist' ),
    filename: '[name].bundle.js'
  },

  resolve: {
    extensions: [ '.js', '.jsx', '.json' ]
  },

  module: {
    rules: [
      /* {
        enforce: 'pre',
        test: /(\.jsx|\.js)?$/,
        loader: 'eslint-loader',
        options: {
          cache: true
        }
      }, */
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [ 'react', 'es2015' ]
        }
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  devtool: 'source-map'

  // plugins: [ new webpack.optimize.UglifyJsPlugin( { minimize: true } ) ]
};

module.exports = config;
