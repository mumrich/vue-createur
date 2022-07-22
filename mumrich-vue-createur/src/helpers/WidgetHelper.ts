import { App, AsyncComponentLoader } from "vue";

export const CREATEUR_WIDGETS_SEARCH_EXPR =
  /[a-zA-Z0-9\-_]+(?=\/([w|W]idget|[e|E]ditor|[t|T]emplate)\.vue)/;

export interface CreateurWidget {
  id: string;
  editor?: AsyncComponentLoader;
  template?: AsyncComponentLoader;
  widget?: AsyncComponentLoader;
  defaultProps: Record<string, any>;
}

export function getCreateurWidgets(
  modules = import.meta.glob<AsyncComponentLoader>("../widgets/**/*.vue")
): CreateurWidget[] {
  const widgetsMap = new Map<string, CreateurWidget>();

  Object.keys(modules).forEach((mod) => {
    const matches = mod.match(CREATEUR_WIDGETS_SEARCH_EXPR);

    if (matches !== null && matches.length > 1 && matches.input) {
      const widgetName = matches[0];
      const componentType = matches[1];
      const componentUri = matches.input;

      if (!widgetsMap.has(widgetName)) {
        widgetsMap.set(widgetName, {
          id: widgetName,
          [componentType]: modules[componentUri],
          defaultProps: {},
        });
      } else {
        const createurWidget = widgetsMap.get(widgetName) as CreateurWidget;
        const newCreateurWidget: CreateurWidget = {
          ...createurWidget,
          [componentType]: modules[componentUri],
        };
        widgetsMap.set(widgetName, newCreateurWidget);
      }
    }
  });

  const response: CreateurWidget[] = [];

  for (const [_key, widget] of widgetsMap) {
    response.push(widget);
  }

  return response;
}

export function registerCreateurWidgets(app: App) {
  const cws = getCreateurWidgets();
  const templates: string[] = [];
  const editors: string[] = [];
  const widgets: string[] = [];

  for (const cw of cws) {
    if (cw.editor) {
      const cid = `we-${cw.id}`;
      app.component(cid, cw.editor);
      editors.push(cid);
    }

    if (cw.template) {
      const cid = `wt-${cw.id}`;
      app.component(cid, cw.template);
      templates.push(cid);
    }

    if (cw.widget) {
      const cid = cw.id;
      app.component(cid, cw.widget);
      widgets.push(cid);
    }
  }

  return { templates, editors, widgets };
}
