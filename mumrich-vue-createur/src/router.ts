import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeVue from "./routes/Home.vue";
import AboutVue from "./routes/About.vue";
import { ref, markRaw } from "vue";
import WidgetsSourceTemplateVue from "./routes/WidgetsSourceTemplate.vue";
import MiniAppEditorVue from "./routes/MiniAppEditor.vue";

export const routes = ref([
  { path: "/", component: markRaw(HomeVue), name: "Home" },
  {
    path: "/widgets-source-template",
    component: markRaw(WidgetsSourceTemplateVue),
    name: "Widgets Source Template",
  },
  {
    path: "/router-editor",
    component: markRaw(MiniAppEditorVue),
    name: "Router Editor",
  },
  { path: "/about", component: markRaw(AboutVue), name: "About" },
] as RouteRecordRaw[]);

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes.value,
});
