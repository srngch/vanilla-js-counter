const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: ['@babel/polyfill', './src/js/index.js', './src/css/style.css'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'css/style.css' })],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src/js')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          // publicPath: '../css',
          // outputPath: 'asset',
          name: '[name].[ext]?[hash]',
        },
      },
      // {
      //   test: /\.(ico|png|jpg|jpeg|gif|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   loader: 'url-loader',
      //   options: {
      //     // publicPath: 'dist/asset',
      //     // outputPath: 'dist/asset',
      //     name: '[name].[ext]?[hash]',
      //     limit: 10000, // 10kb
      //     fallback: 'file-loader',
      //   },
      // },
      // {
      //   test: /\.svg$/i,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         generator: (content) => svgToMiniDataURI(content.toString()),
      //       },
      //     },
      //   ],
      // },
    ],
  },
  devtool: 'source-map',
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development',
};
