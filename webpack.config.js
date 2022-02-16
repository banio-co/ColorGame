const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: dist,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'index.js',
    path: dist,
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
    }),
  ],
};
