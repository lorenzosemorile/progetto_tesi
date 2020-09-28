const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const TerserPlugin = require('terser-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const CleanPlugin = require('clean-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    'layouts': './layouts/index.js'
  },
  target: 'web',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, './dist/layouts'),
  },
  devtool: 'source-map',
  node: false,
  resolve: {
    mainFields: [ 'module', 'js', 'jsnext:main', 'browser', 'main' ],
    modules: ['node_modules'],
    alias: {
      Mocks: path.resolve(__dirname, 'mocks')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$|\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-syntax-import-meta',
              ['@babel/plugin-proposal-nullish-coalescing-operator', {loose: true}],
              ['@babel/plugin-proposal-optional-chaining', {loose: true}],
              ['babel-plugin-bundled-import-meta', { importStyle: 'baseURI'}]
            ],
            presets: [
              [
                '@babel/preset-env', 
                {
                  targets: [
                    'and_chr 78', 'chrome 78', 'chrome 77', 
                    'edge 18', 'edge 17', 
                    'firefox 71', 'firefox 70', 
                    'ios_saf 13.2', 'ios_saf 13.0-13.1', 'ios_saf 12.2-12.4', 'ios_saf 12.0-12.1',
                    'safari 13', 'safari 12.1', 'safari 12'
                  ],
                  exclude: ['@babel/plugin-transform-template-literals'],
                  useBuiltIns: false,
                  modules: false
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'css-loader',
          {
            loader: 'sass-loader',
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          'css-loader'
        ]
      },
      {
        test: /\.(eot|svg|woff|ttf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        sourceMap: true,
        cache: true,
        parallel: true,
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ],
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanPlugin(),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      inject: true,
      filename: 'layouts-index.html',
    }),
  ]
};
