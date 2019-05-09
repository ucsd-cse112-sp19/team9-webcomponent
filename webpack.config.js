const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    components: ['./util/disableTestingHooks.js', './web_component/HelloAxios.js'],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    watchContentBase: true,
    proxy: {
      "/messages": {
        target: "http://localhost:5000",
        secure: false,
      },
    },
  },
  watchOptions: { // https://webpack.js.org/configuration/watch/#watchoptionsignored
    ignored: [/node_modules/],
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),

    // https://www.npmjs.com/package/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: 'Runtime Terror',
      filename: 'index.html',
      template: 'web_component/HelloAxios.html',
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};