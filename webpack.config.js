var path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: 'aivecReactMaterialComponents',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, './src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
        },
        resolve: { extensions: ['.js', '.jsx'] },
      },
    ],
  },
  externals: {
    react: 'commonjs react',
  },
}
