import { defineMemoire } from "mumrich-vue-memoire";
import { RouteRecordRaw } from "vue-router";
import RouteAboutVue from "./RouteAbout.vue";
import RouteHomeVue from "./RouteHome.vue";

type MiniAppMemoireState = { routes: RouteRecordRaw[] };

export const miniAppMemoire = defineMemoire<MiniAppMemoireState>({
  routes: [
    {
      path: "/",
      component: RouteHomeVue,
      name: "Home",
      children: [
        {
          path: "gugus",
          name: "Gugus",
          component: () => import("./SubRouteGugus.vue"),
        },
      ],
    },
    {
      path: "/about",
      component: RouteAboutVue,
      name: "About",
    },
  ],
});
