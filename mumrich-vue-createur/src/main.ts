import { AsyncComponentLoader, createApp } from "vue";
import App from "./App.vue";
import "virtual:windi.css";
import "virtual:windi-devtools";
import { router } from "./router";
import { registerCreateurWidgets } from "./helpers/WidgetHelper";
import { widgetMemoire } from "./memoire";

const app = createApp(App);

app.use(router);

const modules = import.meta.glob<AsyncComponentLoader>("/src/widgets/**/*.vue");
const awailableCreateurWidgets = registerCreateurWidgets(app, modules);

widgetMemoire.update((draftState) => {
  draftState.awailableCreateurWidgets = awailableCreateurWidgets;
});

app.mount("#app");
