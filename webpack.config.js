const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

module.exports = {
  mode,
  devtool: mode === 'development' && 'source-map',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: 'aivecReactMaterialComponents',
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                'babel-plugin-styled-components',
                {
                  pure: true,
                },
              ],
              '@babel/plugin-proposal-class-properties',
            ],
            presets: [
              ['@babel/preset-env', { targets: '> 0.25%, not dead' }],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
          },
        },
        exclude: /(node_modules|dist|vendor)/,
      },
    ],
  },
  externals: [
    {
      react: {
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'React',
        root: 'React',
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM',
      },
    },
    {
      'styled-components': {
        commonjs: 'styled-components',
        commonjs2: 'styled-components',
        amd: 'styled-components',
        root: 'styled-components',
      },
    },
    '@material-ui/core',
    /^@material-ui\/core\/.*/,
    '@material-ui/icons',
    /^@material-ui\/icons\/.*/,
  ],
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
