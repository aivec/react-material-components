const path = require('path');
const glob = require('glob');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

module.exports = {
  mode,
  devtool: mode === 'development' && 'source-map',
  /**
   * Pass Glob a relative path to each of our entry points
   * We will have different subdirectories inside of the Project directory so
   * we need to replace any of the directory names with a wildcard, **, which
   * will recursively match any combination of directory names inside of any
   * number of subdirectories until it finds the index.js entry.
   * Then we use the Array.prototype.reduce method to iterate through the array
   * and return an object containing a path to each of our entry files
   * (index.js)
   */
   entry: glob.sync('./src/**/{*.tsx,*.ts}').reduce((acc, path) => {
    /**
     * The "[name]" placeholder in the "output" property will be replaced
     * with each key name in our "entry" object. We need to make sure the
     * keys are a path to the "index.js" file but without the actual file
     * name. This is why we replace the file name, "index.js", with a string
     */
    const entry = path.replace('.tsx', '').replace('.ts', '').replace('./src/', '');
    /**
     * Here we start building our object by placing the "entry" variable from
     * the previous line as a key and the entire path including the file name
     * as the value
     */
    acc[entry] = path;
    return acc;
  }, {}),
  output: {
    /**
     * Again, the "[name]" place holder will be replaced with each key in our
     * "entry" object and will name the build file "main.js"
     */
    filename: '[name].js',
    /**
     * We need to provide an absolute path to the root of our project and
     * thats exactly what this line is doing
     */
    path: path.resolve(__dirname, 'dist'),
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
    '@mui/material',
    /^@mui\/material\/.*/,
    '@mui/icons-material',
    /^@mui\/icons-material\/.*/,
  ],
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
