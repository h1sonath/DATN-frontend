var webpack = require('webpack');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      }),
      // new BundleAnalyzerPlugin()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src/')
      }
    }
  },
  assetsDir: 'admin-static',
};
