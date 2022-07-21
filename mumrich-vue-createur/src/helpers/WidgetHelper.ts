import { Component } from "vue";

export interface CreateurWidget {
  editor: Component;
  template: Component;
  widget: Component;
  defaultProps: Record<string, any>;
}
