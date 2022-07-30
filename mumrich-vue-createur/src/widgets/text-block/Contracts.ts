export interface WidgetTextBlockProps {
  html: string;
}

export interface StringMap {
  [key: string]: any;
}

export interface QuillOptionsStatic {
  debug?: string | boolean;
  modules?: StringMap;
  placeholder?: string;
  readOnly?: boolean;
  theme?: string;
  formats?: string[];
  bounds?: HTMLElement | string;
  scrollingContainer?: HTMLElement | string;
  strict?: boolean;
}
