import { defineMemoireWithBroadcastChannel } from "mumrich-vue-memoire";

export type CreateurWidgetTemplate = {
  name: string;
};

export type CreateurWidgetInstance = { uid: string } & CreateurWidgetTemplate;

export type WidgetsState = {
  widgetTemplates: CreateurWidgetTemplate[];
  widgetsTarget: CreateurWidgetInstance[];
};

export const widgetMemoire = defineMemoireWithBroadcastChannel<WidgetsState>(
  "createur-widgets",
  {
    widgetTemplates: [],
    widgetsTarget: [],
  }
);
