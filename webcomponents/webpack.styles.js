const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// eslint-disable-next-line import/no-extraneous-dependencies
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// eslint-disable-next-line import/no-extraneous-dependencies
const CleanPlugin = require('clean-webpack-plugin');

const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

/** @type {import('webpack').Configuration} */
module.exports = (env) => {
  console.log(env.development);

  let plugins = [
    new CleanPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ];
  if (env.development) {
    plugins = [...plugins, new Serve({ liveReload: true })];
  }

  return {
    mode: env.production ? 'production' : 'development',
    watch: env.production ? false : true,
    entry: {
      rainews: '../../scss/main.scss',
      fonts: '../../scss/fonts.scss',
      client: 'webpack-plugin-serve/client'
    },
    output: {
      path: path.resolve(__dirname, './dist/scss'),
    },
    node: false,
    resolve: {
      modules: ['node_modules']
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
            {
              loader: 'sass-loader',
            }
          ]
        },
        {
          test: /\.(woff|eot|ttf|svg)$/,
          loader: 'file-loader'
        }
      ],
    },
    plugins,
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            safe: true,
          },
        }),
      ]
    },
  };
};
