const path = require('path');
const { createCompatibilityConfig, createDefaultConfig } = require('@open-wc/building-webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

// if you need to support IE11 use "modern-and-legacy-config" instead.
// const { createCompatibilityConfig } = require('@open-wc/building-webpack');
// module.exports = createCompatibilityConfig({
//   input: path.resolve(__dirname, './index.html'),
// });


module.exports = (env, argv) => {
  let configs;
  let indexHTMLConfig = {
    input: path.resolve(__dirname, './index.html'),
  };

  if (argv.mode === 'production') {
    indexHTMLConfig = {
      ...indexHTMLConfig,
      plugins : {
        workbox : false
      },
      webpackIndexHTMLPlugin: {
        polyfills: {
          coreJs: true,
          regeneratorRuntime: true,
          webcomponents: true,
          fetch: true,
          intersectionObserver: true,
          customPolyfills: [
            {
              name: 'element-closest',
              test: '!Element.prototype.closest',
              path: require.resolve('./extensions/custom-polyfills/element-closest.min.js'),
              sourcemapPath: require.resolve('./extensions/custom-polyfills/element-closest.min.js.map'),
            }
          ]
        }
      }
    }
  }


  if (argv.modern) {
    const cfg = createDefaultConfig(indexHTMLConfig);
    configs = [cfg];
  } else {
    configs = createCompatibilityConfig(indexHTMLConfig);
  }

  const configurations = configs.map((config) => {

    const prodConfig = {};
    if (config.mode === 'production') {
      prodConfig.output = {
        ...config.output,
        publicPath: '/assets/js/webcomponents/',
        filename: '[name].js',
        chunkFilename: '[name].js'
      };
      /*
      prodConfig.optimization = {
        ...config.optimization,
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
      };
*/
      prodConfig.optimization = {
        minimize: argv.mode === 'production',
        minimizer: [
          new TerserPlugin({
            sourceMap: true,
            cache: true,
            parallel: true,
            terserOptions: {
              output: {
                comments: false
              },
              compress: {
                pure_funcs: ['console.info', 'console.debug', 'console.info'],
              }
            }
          })
        ]
      };
    }
  
    const cfg = merge.strategy({
      optimization: 'replace'
    })(config, {
      devtool : 'source-map',
      module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
              'css-loader',
              {
                loader: "sass-loader",
              }
            ],
          },
          {
            test: /\.worker\.js$/,
            use: {
              loader: 'worker-loader',
              options: {
                inline : true,
                name: '[contenthash].worker.js'
              }
            }
          },
        ]
      },
      resolve: {
        ...config.resolve,
        alias: {
          Mocks: path.resolve(__dirname, 'mocks')
        }
      }
    }, prodConfig);
  
    console.log(cfg);
  
    return cfg;
  });
  
  return configurations;
};
