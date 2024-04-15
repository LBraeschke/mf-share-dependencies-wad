import * as esbuild from "esbuild";
import { importAsGlobals } from "../importAsGlobals.mjs";

await esbuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  minify: false,
  sourcemap: true,
  external: ["rxjs"],
  outdir: "dist",
  target: "chrome116",
  plugins: [
    importAsGlobals({
      rxjs: "rxjs",
    }),
  ],
});
