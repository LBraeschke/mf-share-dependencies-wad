const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  output: {
    publicPath: '../app1/dist/',
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
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      filename: "counter.js",
      exposes: {
        "./Counter": "./src/counter.ts",
      },
      shared: {
        rxjs: {
          eager: true,
          singleton: true,
        },
        lit: {
          eager: true,
          singleton: true,
        },
        '@lit/reactive-element': {
          eager: true,
          singleton: true,
        }
        ,
        'lit/decorators.js': {
          eager: true,
          singleton: true,
        }
      },
    }),
  ],
};
