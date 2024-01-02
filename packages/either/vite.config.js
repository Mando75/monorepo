import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      formats: ["es"],
      entry: "src/index.ts",
      fileName: (format) => `either.${format}.js`,
    },
  },
  test: {
    testFiles: "**/*.spec.ts",
    globals: true,
  },
});
