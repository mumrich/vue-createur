import { Component, AsyncComponentLoader } from "vue";

export const CREATEUR_WIDGETS_SEARCH_EXPR =
  /[a-zA-Z0-9\-_]+(?=\/([w|W]idget|[e|E]ditor|[t|T]emplate)\.vue)/;

export interface CreateurWidget {
  id: string;
  editor?: AsyncComponentLoader;
  template?: AsyncComponentLoader;
  widget?: AsyncComponentLoader;
  defaultProps: Record<string, any>;
}

export function importCreateurWidgetsPromise(): Promise<CreateurWidget[]> {
  return new Promise((resolve, _reject) => {
    const modules = import.meta.glob<Component>("../widgets/**/*.vue");
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

    resolve(response);
  });
}
