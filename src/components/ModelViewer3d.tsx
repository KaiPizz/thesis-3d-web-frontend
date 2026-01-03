import "@google/model-viewer";
import { useEffect, useRef } from "react";
import type { ModelViewerElement } from "../types/model-viewer";

type RGBA = [number, number, number, number];

function isValidHex(hex: string | undefined): hex is string {
  if (!hex) return false;
  return /^#?[0-9A-Fa-f]{6}$/.test(hex);
}

function hexToRgba(hex: string): RGBA | null {
  const match = hex.replace("#", "").match(/.{1,2}/g);
  if (!match || match.length < 3) return null;
  const [r, g, b] = match.map((x) => parseInt(x, 16) / 255);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return [r, g, b, 1];
}

export default function ModelViewer3D({
  src,
  colorHex,
  className,
  height = 520,
  cameraOrbit,
  fieldOfView,
}: {
  src: string;
  colorHex?: string;
  className?: string;
  height?: number | string;
  cameraOrbit?: string;
  fieldOfView?: string;
}) {
  const ref = useRef<ModelViewerElement | null>(null);
  // Store original material colors to restore when colorHex is undefined
  const originalColorsRef = useRef<Map<number, RGBA>>(new Map());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const storeOriginalColors = () => {
      if (!el.model?.materials) return;
      // Only store once per model load
      if (originalColorsRef.current.size > 0) return;

      el.model.materials.forEach((mat, index) => {
        const factor = mat.pbrMetallicRoughness?.baseColorFactor;
        if (factor) {
          originalColorsRef.current.set(index, [...factor] as RGBA);
        }
      });
    };

    const restoreOriginalColors = () => {
      if (!el.model?.materials) return;

      el.model.materials.forEach((mat, index) => {
        const original = originalColorsRef.current.get(index);
        if (original) {
          mat.pbrMetallicRoughness?.setBaseColorFactor(original);
        }
      });

      const viewer = el as unknown as { requestUpdate?: () => void };
      if (typeof viewer.requestUpdate === "function") {
        viewer.requestUpdate();
      }
    };

    const applyColor = () => {
      if (!el.model) return;
      if (!el.model.materials || el.model.materials.length === 0) return;

      // Store original colors before any modification
      storeOriginalColors();

      // If no colorHex, restore original colors
      if (!isValidHex(colorHex)) {
        restoreOriginalColors();
        return;
      }

      const rgba = hexToRgba(colorHex);
      if (!rgba) return;

      for (const mat of el.model.materials) {
        mat.pbrMetallicRoughness?.setBaseColorFactor(rgba);
      }

      const viewer = el as unknown as { requestUpdate?: () => void };
      if (typeof viewer.requestUpdate === "function") {
        viewer.requestUpdate();
      }
    };

    const onLoad = () => {
      // Clear stored colors on new model load
      originalColorsRef.current.clear();
      applyColor();
    };
    const onError = (e: Event) =>
      console.error("model-viewer error", e, "src =", el.src);

    el.addEventListener("load", onLoad);
    el.addEventListener("error", onError);

    if (el.model) {
      applyColor();
    }

    return () => {
      el.removeEventListener("load", onLoad);
      el.removeEventListener("error", onError);
    };
  }, [colorHex, src]);

  return (
    <model-viewer
      ref={ref}
      src={src}
      alt="3D model"
      camera-controls
      auto-rotate
      shadow-intensity="1"
      exposure="1"
      {...(cameraOrbit ? { "camera-orbit": cameraOrbit } : {})}
      {...(fieldOfView ? { "field-of-view": fieldOfView } : {})}
      style={{
        width: "100%",
        backgroundColor: "beige",
        height,
        borderRadius: "1rem",
      }}
      className={className}
    />
  );
}
