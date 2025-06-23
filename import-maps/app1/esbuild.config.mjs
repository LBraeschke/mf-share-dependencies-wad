import * as esbuild from "esbuild";

const config = {
  format: "esm",
  entryPoints: ["./src/index.ts"],
  bundle: true,
  minify: false,
  sourcemap: true,
  alias: {
    rxjs: "rxjs@6.6.x",
  },
  external: ["rxjs@6.6.x", "lit"],
  outdir: "dist",
  target: "chrome116",
};

if (process.argv.includes("--watch")) {
  const ctx = await esbuild.context(config);
  await ctx.watch();
} else {
  await esbuild.build(config);
}
