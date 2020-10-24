const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: `${__dirname}/docs`,
    filename: "bundle.js",
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "src/3d/rotating-cube/index.html",
          to: "3d/rotating-cube",
        },
        {
          from: "src/index.html",
          to: "index.html",
        },
      ],
    }),
  ],
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "./")],
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
};
