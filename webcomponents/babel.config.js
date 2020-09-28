module.exports = function config(api) {
  api.cache(true);
  const plugins = [
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    'babel-plugin-transform-async-to-promises'
  ];

  return {
    sourceMaps: true,
    inputSourceMap: true,
    plugins,
  };
}