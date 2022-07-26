// eslint-disable-next-line @typescript-eslint/no-var-requires
const addSvgrWebpack = require('./tools/svgr-webpack');

module.exports = {
  plugins: [{ name: 'typescript', options: { useBabel: true } }, 'offline'],
  modifyWebpackConfig: ({ env, webpackConfig }) => {
    console.log(env);

    addSvgrWebpack(webpackConfig);

    return webpackConfig;
  }
};
