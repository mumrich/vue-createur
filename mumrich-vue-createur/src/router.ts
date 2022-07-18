import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeVue from "./routes/Home.vue";
import AboutVue from "./routes/About.vue";

export const routes: RouteRecordRaw[] = [
  { path: "/", component: HomeVue, name: "Home" },
  { path: "/about", component: AboutVue, name: "About" },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
