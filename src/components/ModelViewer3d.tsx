import React from "react";
import "@google/model-viewer";
import { useEffect, useRef } from "react";

// Remove the custom JSX declaration from this file.
// Move it to a separate file named src/global.d.ts as shown below.

export default function ModelViewer3D({
  src,
  colorHex,
  className,
}: {
  src: string;
  colorHex?: string;
  className?: string;
}) {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;

    const onLoad = () => {
      if (!colorHex || !ref.current?.model) return;
      const [r, g, b] = (colorHex.replace("#", "").match(/.{1,2}/g) || []).map(
        (x) => parseInt(x, 16) / 255
      );
      const rgba: [number, number, number, number] = [
        r ?? 1,
        g ?? 1,
        b ?? 1,
        1,
      ];
      (ref.current.model.materials || []).forEach((m: any) =>
        m.pbrMetallicRoughness?.setBaseColorFactor(rgba)
      );
      ref.current.requestRender();
    };

    const onError = (e: Event) => {
      // Will print 404s, CORS, or bad paths
      console.error("model-viewer error", e, "src =", ref.current?.src);
    };

    ref.current.addEventListener("load", onLoad);
    ref.current.addEventListener("error", onError);
    onLoad();

    return () => {
      ref.current?.removeEventListener("load", onLoad);
      ref.current?.removeEventListener("error", onError);
    };
  }, [colorHex]);

  return (
    <model-viewer
      ref={ref}
      src={src}
      alt="3D model"
      camera-controls
      auto-rotate
      shadow-intensity="1"
      exposure="1"
      style={{ width: "100%", height: "520px", borderRadius: "1rem" }}
      className={className}
    />
  );
}
