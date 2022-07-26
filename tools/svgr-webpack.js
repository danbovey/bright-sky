// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const loaderFinder = require('razzle-dev-utils/makeLoaderFinder');

const addSvgrWebpack = webpackConfig => {
  const fileLoaderConfig = loaderFinder('file-loader');
  const fileLoaderRule = webpackConfig.module.rules.find(fileLoaderConfig);
  const { use } = fileLoaderRule;

  delete fileLoaderRule.use;
  fileLoaderRule.oneOf = [
    {
      test: /\.svg$/,
      resourceQuery: /component/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false
              }
            }
          }
        }
      ]
    },
    { use }
  ];
};

module.exports = addSvgrWebpack;
