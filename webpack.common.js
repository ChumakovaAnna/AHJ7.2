const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Хеширование файлов только в production mode
function addHash(fileName, buildMode, hash = 'contenthash') {
  return buildMode === 'production' ? fileName.replace(/\.[^.]+$/, `.[${hash}]$&`) : fileName;
}

module.exports = (buildMode) => ({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: addHash('[name].js', buildMode),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
        ],
      },
      {
        test: /\.(svg|mp3|mp4)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 3072,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'src/img/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: addHash('[name].css', buildMode),
      chunkFilename: addHash('[id].css', buildMode),
    }),
  ],
});
