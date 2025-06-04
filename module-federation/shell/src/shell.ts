import { init, loadRemote } from '@module-federation/enhanced/runtime';

init({
  name: '@demo/app-main',
  remotes: [
    {
      name: "@demo/app1",
      // mf-manifest.json is a file type generated in the new version of Module Federation build tools, providing richer functionality compared to remoteEntry
      // Preloading depends on the use of the mf-manifest.json file type
      entry: "http://localhost:3005/mf-manifest.json",
      alias: "app1"
    },
    {
      name: "@demo/app2",
      entry: "http://localhost:3006/remoteEntry.js",
      alias: "app2"
    },
{
      name: "@demo/app4",
      entry: "http://localhost:3006/remoteEntry.mjs",
      alias: "app2",
      type: 'module' // tell federation its a certain format, like ESM module
    },
  ],
});

// Load using alias
loadRemote<{add: (...args: Array<number>)=> number }>("app2/util").then((md)=>{
  md.add(1,2,3);
});