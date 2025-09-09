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
        poster?: string;
        exposure?: number | string;
        "shadow-intensity"?: number | string;
        "camera-controls"?: boolean | ""; // allows <model-viewer camera-controls>
        "auto-rotate"?: boolean | "";
      };
    }
  }
}

export {}; // keep this so the file is treated as a module
