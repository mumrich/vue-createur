import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeVue from "./routes/Home.vue";
import AboutVue from "./routes/About.vue";
import { ref, markRaw } from "vue";
import WidgetsSourceTemplateVue from "./routes/WidgetsSourceTemplate.vue";

export const routes = ref([
  { path: "/", component: markRaw(HomeVue), name: "Home" },
  { path: "/about", component: markRaw(AboutVue), name: "About" },
  {
    path: "/widgets-source-template",
    component: markRaw(WidgetsSourceTemplateVue),
    name: "Widgets Source Template",
  },
] as RouteRecordRaw[]);

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes.value,
});
