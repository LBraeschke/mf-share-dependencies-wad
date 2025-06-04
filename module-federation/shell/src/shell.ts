import { init, loadRemote } from "@module-federation/enhanced/runtime";
import * as rxjs from "rxjs";
import * as reactiveElement from "@lit/reactive-element";
import * as lit from "lit";

init({
  name: "MyShell",
  remotes: [
    {
      name: "@demo/app1",
      entry: "../app1/dist/mf-manifest.json",
      type: "module",
    },
    {
      name: "@demo/app2",
      entry: "../app2/dist/mf-manifest.json",
      type: "module",
    },
  ],
  shareStrategy: "version-first",
  shared: {
    rxjs: {
      version: "6.8.1",
      scope: "default",
      lib: () => rxjs,
      shareConfig: {
        singleton: false,
        requiredVersion: "^6.8.1",
      },
    },
    lit: {
      version: "3.1.2",
      scope: "default",
      lib: () => lit,
      shareConfig: {
        singleton: true,
        eager: true,
        requiredVersion: "^3.1.2",
      },
    },
    "@lit/reactive-element": {
      version: "2.0.4",
      scope: "default",
      lib: () => reactiveElement,
      shareConfig: {
        singleton: true,
        eager: true,
        requiredVersion: "^2.0.4",
      },
    },
    "lit/decorators.js": {
      version: "3.1.2",
      scope: "default",
      lib: () => require("lit/decorators.js"),
      shareConfig: {
        singleton: true,
        eager: true,
        requiredVersion: "^3.1.2",
      },
    },
  },
});

loadRemote("@demo/app1");
loadRemote("@demo/app2");
