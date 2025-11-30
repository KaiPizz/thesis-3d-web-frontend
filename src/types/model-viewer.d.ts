import type * as React from "react";

export interface ModelViewerElement extends HTMLElement {
  model?: { materials?: Array<{ pbrMetallicRoughness?: { setBaseColorFactor: (rgba: [number, number, number, number]) => void } }> };
  src?: string;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<ModelViewerElement>,
        ModelViewerElement
      > & {
        src?: string;
        alt?: string;
        "camera-controls"?: boolean | "";
        "auto-rotate"?: boolean | "";
        "shadow-intensity"?: number | string;
        exposure?: number | string;
        "camera-orbit"?: string;
        "field-of-view"?: string;
        [attr: string]: unknown;
      };
    }
  }
}
