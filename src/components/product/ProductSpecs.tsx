import type { ProductSpecs as ProductSpecsType } from "../../api/types";

interface Props {
  specs?: ProductSpecsType;
}

interface SpecRow {
  label: string;
  value: string;
}

export default function ProductSpecs({ specs }: Props) {
  if (!specs) return null;

  const rows: SpecRow[] = [];

  if (specs.widthCm != null) {
    rows.push({ label: "Width", value: `${specs.widthCm} cm` });
  }
  if (specs.heightCm != null) {
    rows.push({ label: "Height", value: `${specs.heightCm} cm` });
  }
  if (specs.depthCm != null) {
    rows.push({ label: "Depth", value: `${specs.depthCm} cm` });
  }
  if (specs.weightKg != null) {
    rows.push({ label: "Weight", value: `${specs.weightKg} kg` });
  }
  if (specs.material) {
    rows.push({ label: "Material", value: specs.material });
  }
  if (specs.maxLoadKg != null) {
    rows.push({ label: "Max load", value: `${specs.maxLoadKg} kg` });
  }

  // Don't render if no specs available
  if (rows.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="font-medium mb-3">Product Details</h3>
      <div className="rounded-xl border bg-muted/20 p-4">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {rows.map((row) => (
            <div key={row.label} className="contents">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="font-medium text-right">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
