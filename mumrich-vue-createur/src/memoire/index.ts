import { defineMemoireWithBroadcastChannel } from "mumrich-vue-memoire";
import { CreateurWidgetRegistered } from "../helpers/WidgetHelper";

export type WidgetsState = {
  awailableCreateurWidgets: CreateurWidgetRegistered[];
};

export const widgetMemoire = defineMemoireWithBroadcastChannel<WidgetsState>(
  "createur-widgets",
  {
    awailableCreateurWidgets: [],
  }
);
