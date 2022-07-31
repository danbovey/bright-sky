// eslint-disable-next-line @typescript-eslint/no-var-requires
const addSvgrWebpack = require('./tools/svgr-webpack');

module.exports = {
  options: {
    verbose: true,
    enableReactRefresh: true,
    enableTargetBabelrc: false,
    enableBabelCache: false
  },
  plugins: [{ name: 'typescript', options: { useBabel: true } }, 'offline'],
  modifyWebpackConfig: ({ webpackConfig }) => {
    addSvgrWebpack(webpackConfig);

    return webpackConfig;
  }
};
