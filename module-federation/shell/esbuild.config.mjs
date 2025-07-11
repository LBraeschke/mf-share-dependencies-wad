import * as esbuild from "esbuild";

const config = {
  format: "esm",
  entryPoints: ["./src/shell.ts"],
  bundle: true,
  minify: false,
  sourcemap: true,
  outdir: "dist",
  target: "chrome116",
};

if (process.argv.includes("--watch")) {
  const ctx = await esbuild.context(config);
  await ctx.watch();
} else {
  await esbuild.build(config);
}
