const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/js/index.js', './src/css/style.css'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
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
        test: /\.css/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/css/',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /.+(assets\/icons\/).+(\.svg)/i,
        type: 'asset/inline',
      },
      {
        test: /\.(png|ico)/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
    ],
  },
  devtool: 'source-map',
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development',
};
