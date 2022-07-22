import { defineMemoireWithBroadcastChannel } from "mumrich-vue-memoire";
import { FunctionalComponent } from "vue";
import MdiAttachment from "~icons/mdi/attachment";
import MdiFormatText from "~icons/mdi/format-text";
import MdiImageMultipleOutline from "~icons/mdi/image-multiple-outline";

export type WidgetTemplate = {
  title: string;
  icon: FunctionalComponent;
};

export type WidgetInstance = {
  uid: string;
} & WidgetTemplate;

export type WidgetsState = {
  widgetsSource: WidgetTemplate[];
  widgetsTarget: WidgetInstance[];
};

export const widgetMemoire = defineMemoireWithBroadcastChannel<WidgetsState>(
  "createur-widgets",
  {
    widgetsSource: [
      {
        title: "Text Block",
        icon: MdiFormatText,
      },
      {
        title: "Image Gallery",
        icon: MdiImageMultipleOutline,
      },
      {
        title: "Attachments",
        icon: MdiAttachment,
      },
    ],
    widgetsTarget: [],
  }
);
