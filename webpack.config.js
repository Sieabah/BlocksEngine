// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const { CheckerPlugin } = require('awesome-typescript-loader');
const path = require('path');

module.exports = {

  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    alias: {
        Engine: path.join(__dirname, 'src', 'Engine')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  // Source maps support ('inline-source-map' also works)
  devtool: 'source-map',

  entry: {
      main: path.join(__dirname, 'src', 'main.ts'),
      vendor: path.join(__dirname, 'src', 'vendor.ts'),
      polyfills: path.join(__dirname, 'src', 'polyfills.ts')
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./public')
  },

  // Add the loader for .ts files.
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|ogg)$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
      new CheckerPlugin()
  ]
};
