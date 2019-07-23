module.exports = {
  entry: "./view.js",
  output: {
    path: __dirname,
    filename: "clientbundle.js"
  },
  module: {
    loaders: [
      {test: /\.scss$/, use: [{loader: "style-loader"}, {loader: "css-loader"}, {loader: "sass-loader"}]},
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  },
  watch: true,
  devtool: 'eval-source-map',
  node: {
    fs: 'empty',
  },
};
