const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/webpack");

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  output: {
    publicPath: "../app1/dist/",
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
        ".": "./src/app-one-component.ts",
      },
      shared: {
        rxjs: {
          singleton: false,
        },
        lit: {
          singleton: true,
        },
        "@lit/reactive-element": {
          singleton: true,
        },
        "lit/decorators.js": {
          singleton: true,
        },
      },
    }),
  ],
};
