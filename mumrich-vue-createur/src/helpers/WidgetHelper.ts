import { App, AsyncComponentLoader, defineAsyncComponent } from "vue";

export const CREATEUR_WIDGETS_SEARCH_EXPR =
  /[a-zA-Z0-9\-_]+(?=\/([w|W]idget|[e|E]ditor|[t|T]emplate)\.vue)/;

export interface CreateurWidget<TWidget> {
  id: string;
  editor?: TWidget;
  template?: TWidget;
  widget?: TWidget;
  defaultProps: Record<string, any>;
}

export interface CreateurWidgetUnregistered
  extends CreateurWidget<AsyncComponentLoader> {}

export interface CreateurWidgetRegistered extends CreateurWidget<string> {}

export function getCreateurWidgets(
  modules: Record<string, () => Promise<AsyncComponentLoader<any>>>
): CreateurWidgetUnregistered[] {
  const widgetsMap = new Map<string, CreateurWidgetUnregistered>();

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
        const createurWidget = widgetsMap.get(
          widgetName
        ) as CreateurWidgetUnregistered;
        const newCreateurWidget: CreateurWidgetUnregistered = {
          ...createurWidget,
          [componentType]: modules[componentUri],
        };
        widgetsMap.set(widgetName, newCreateurWidget);
      }
    }
  });

  const response: CreateurWidgetUnregistered[] = [];

  for (const [_key, widget] of widgetsMap) {
    response.push(widget);
  }

  return response;
}

export function registerCreateurWidgets(
  app: App,
  modules: Record<string, () => Promise<AsyncComponentLoader<any>>>
) {
  const unregisteredCWs = getCreateurWidgets(modules);
  const registeredCWs: CreateurWidgetRegistered[] = [];

  for (const unregisteredCW of unregisteredCWs) {
    const registeredCW: CreateurWidgetRegistered = {
      id: unregisteredCW.id,
      defaultProps: unregisteredCW.defaultProps,
    };

    if (unregisteredCW.editor) {
      registeredCW.editor = `cwe-${unregisteredCW.id}`;
      app.component(
        registeredCW.editor,
        defineAsyncComponent(unregisteredCW.editor)
      );
    }

    if (unregisteredCW.template) {
      registeredCW.template = `cwt-${unregisteredCW.id}`;
      app.component(
        registeredCW.template,
        defineAsyncComponent(unregisteredCW.template)
      );
    }

    if (unregisteredCW.widget) {
      registeredCW.widget = `cw-${unregisteredCW.id}`;
      app.component(
        registeredCW.widget,
        defineAsyncComponent(unregisteredCW.widget)
      );
    }

    registeredCWs.push(registeredCW);
  }

  return registeredCWs;
}
