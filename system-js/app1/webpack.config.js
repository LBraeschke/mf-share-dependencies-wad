const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.ts",
    rxjs: "../../node_modules/rxjs/dist/cjs/index.js",
    lit: "../../node_modules/lit/index.js",
  },
  mode: "development",
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  output: {
    chunkFormat: "module",
    publicPath: "../app1/dist/",
    libraryTarget: "system",
    library: { type: "system" },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    rxjs: "rxjs",
    lit: "lit",
  },
};
