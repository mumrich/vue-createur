import { Component } from "vue";

export const CREATEUR_WIDGETS_SEARCH_EXPR =
  /[a-zA-Z0-9\-_]+(?=\/([w|W]idget|[e|E]ditor|[t|T]emplate)\.vue)/;

export interface CreateurWidget {
  uid: string;
  editor: Component;
  template: Component;
  widget: Component;
  defaultProps: Record<string, any>;
}

export function importCreateurWidgetsPromise(): Promise<CreateurWidget[]> {
  return new Promise((resolve, reject) => {
    const createurWidgets: CreateurWidget[] = [];
    const modules = import.meta.glob("../widgets/**/*.vue");

    Object.keys(modules)
      .map((mod) => mod.match(CREATEUR_WIDGETS_SEARCH_EXPR))
      .forEach((match) => console.log(match));

    // for (const path in modules) {
    //   modules[path]().then((mod) => {
    //     console.log(path, mod);
    //   });
    // }

    resolve(createurWidgets);
  });
}
