import { App, AsyncComponentLoader, defineAsyncComponent, ref } from "vue";

export const CREATEUR_WIDGETS_SEARCH_EXPR =
  /[a-zA-Z0-9\-_]+(?=\/([w|W]idget|[e|E]ditor|[t|T]emplate|[p|P]review)\.vue)/;

export interface CreateurWidgetBase<TWidget> {
  editor?: TWidget;
  template?: TWidget;
  preview?: TWidget;
  widget?: TWidget;
}

export interface CreateurWidgetDefinition<TWidget>
  extends CreateurWidgetBase<TWidget> {
  id: string;
  defaultProps: Record<string, any>;
}

export interface CreateurWidgetUnregistered
  extends CreateurWidgetDefinition<AsyncComponentLoader> {}

export interface CreateurWidgetRegistered
  extends CreateurWidgetDefinition<string> {}

export interface CreateurWidgetInstance extends CreateurWidgetBase<string> {
  uid: string;
  props: Record<string, any>;
}

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

    if (unregisteredCW.preview) {
      registeredCW.preview = `cwp-${unregisteredCW.id}`;
      app.component(
        registeredCW.preview,
        defineAsyncComponent(unregisteredCW.preview)
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

export const createurWidgetTargetSettings = ref({
  showDropzone: false,
});
