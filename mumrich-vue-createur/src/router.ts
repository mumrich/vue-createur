import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeVue from "./routes/Home.vue";
import AboutVue from "./routes/About.vue";
import { ref, markRaw } from "vue";

export const routes = ref([
  { path: "/", component: markRaw(HomeVue), name: "Home" },
  { path: "/about", component: markRaw(AboutVue), name: "About" },
] as RouteRecordRaw[]);

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes.value,
});
