/* eslint-disable */

const {
  override,
  addLessLoader,
  addWebpackPlugin,
  fixBabelImports,
  addBundleVisualizer,
} = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    style: true,
  }),
  addBundleVisualizer(
    {
      openAnalyzer: true,
    },
    !isProduction,
  ),
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
  addLessLoader({
    javascriptEnabled: true,
  }),
);
