import { defineMemoire } from "mumrich-vue-memoire";
import { RouteRecordRaw } from "vue-router";
import RouteAboutVue from "./RouteAbout.vue";
import RouteHomeVue from "./RouteHome.vue";

export const useMiniAppMemoire = () =>
  defineMemoire<{ routes: RouteRecordRaw[] }>({
    routes: [
      {
        path: "/",
        component: RouteHomeVue,
        name: "Home",
      },
      {
        path: "/about",
        component: RouteAboutVue,
        name: "About",
      },
    ],
  });
