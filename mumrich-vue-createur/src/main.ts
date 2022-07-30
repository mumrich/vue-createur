import "virtual:windi-devtools";
import "virtual:windi.css";
import App from "./App.vue";
import { AsyncComponentLoader, createApp } from "vue";
import { registerCreateurWidgets } from "./helpers/WidgetHelper";
import { router } from "./router";
import { widgetMemoire } from "./memoire";

const app = createApp(App);

app.use(router);

const modules = import.meta.glob<AsyncComponentLoader>("/src/widgets/**/*.vue");
const awailableCreateurWidgets = registerCreateurWidgets(app, modules);

widgetMemoire.update((draftState) => {
  draftState.awailableCreateurWidgets = awailableCreateurWidgets;
});

app.mount("#app");
