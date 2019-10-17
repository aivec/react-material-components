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
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: ['react'],
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: './react-dom',
        commonjs: ['./react-dom'],
        amd: 'react-dom',
      },
    },
    '@material-ui/core',
    /@material-ui\/core\/.*/,
    '@material-ui/icons',
    /@material-ui\/icons\/.*/,
  ],
}
