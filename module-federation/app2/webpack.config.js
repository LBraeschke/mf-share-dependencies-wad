const { ModuleFederationPlugin } = require("@module-federation/enhanced/webpack");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  output: {
    publicPath: "../app2/dist/",
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
      name: "app2",
      filename: "counter.js",
      exposes: {
        CounterApp2: "./src/app-two-component.ts",
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
        "@lit/reactive-element": {
          eager: true,
          singleton: true,
        },
        "lit/decorators.js": {
          eager: true,
          singleton: true,
        },
      },
    }),
  ],
};
