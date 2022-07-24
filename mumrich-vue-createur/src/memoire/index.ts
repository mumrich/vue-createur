import { defineMemoireWithBroadcastChannel } from "mumrich-vue-memoire";
import {
  CreateurWidgetInstance,
  CreateurWidgetRegistered,
} from "../helpers/WidgetHelper";

export type WidgetsState = {
  awailableCreateurWidgets: CreateurWidgetRegistered[];
  createurWidgetsInstances: CreateurWidgetInstance[];
};

export const widgetMemoire = defineMemoireWithBroadcastChannel<WidgetsState>(
  "createur-widgets",
  {
    awailableCreateurWidgets: [],
    createurWidgetsInstances: [],
  }
);
