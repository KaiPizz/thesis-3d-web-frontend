import type * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        "camera-controls"?: boolean | "";
        "auto-rotate"?: boolean | "";
        "shadow-intensity"?: number | string;
        exposure?: number | string;
        "camera-orbit"?: string;
        "field-of-view"?: string;
        [attr: string]: string | number | boolean | undefined;
      };
    }
  }
}

export {};
