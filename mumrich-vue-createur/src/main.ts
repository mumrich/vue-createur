import { createApp } from "vue";
import App from "./App.vue";
import "virtual:windi.css";
import "virtual:windi-devtools";
import { router } from "./router";
import { registerCreateurWidgets } from "./helpers/WidgetHelper";
import { widgetMemoire } from "./memoire";

const app = createApp(App);

app.use(router);

const { templates, editors, widgets } = registerCreateurWidgets(app);

widgetMemoire.update((draftState) => {
  draftState.widgetTemplates = templates.map((t) => ({ name: t }));
});

app.mount("#app");
