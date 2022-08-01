import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import { defineConfig } from "vite";
import { resolve } from "path";

const libName = "mumrich-vue-createur";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Components({
      dts: "src/@types/components.d.ts",
      resolvers: [
        IconsResolver({
          prefix: "icon",
        }),
      ],
    }),
    Icons({ compiler: "vue3" }),
    WindiCSS(),
  ],
  resolve: {
    alias: {
      "@/": "src/",
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib.ts"),
      name: libName,
      fileName: (format) => `${libName}.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "immer", "uuid", "@vueuse/core"],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
