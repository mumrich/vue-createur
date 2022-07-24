import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import { defineConfig } from "vite";

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
});
