import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { products } from "../data/products";
import ModelViewer3D from "../components/ModelViewer3d";
import "@google/model-viewer";

export default function Test() {
  return (
    <model-viewer
      src={new URL("models/chair.glb", import.meta.env.BASE_URL).toString()}
      camera-controls
    />
  );
}

// export default function ProductPage() {
//   const { slug } = useParams();
//   const product = useMemo(() => products.find((p) => p.slug === slug), [slug]);
//   const [colorIdx, setColorIdx] = useState(0);

//   if (!product) {
//     return (
//       <div className="container mx-auto px-4 py-16">
//         <p className="text-sm text-muted-foreground">
//           Product not found.{" "}
//           <Link to="/" className="text-blue-600 underline">
//             Back to home
//           </Link>
//         </p>
//       </div>
//     );
//   }

//   // Resolve the model path correctly for dev ("/") and GitHub Pages ("/repo/")
//   const glbSrc = product.model
//     ? new URL(product.model, import.meta.env.BASE_URL).toString()
//     : undefined;

//   const colorHex = product.colors?.[colorIdx]?.hex;

//   return (
//     <div className="container mx-auto px-4 py-16">
//       <Link to="/" className="text-sm text-blue-600 underline">
//         ← Back
//       </Link>

//       <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* 3D or fallback image */}
//         <div className="rounded-2xl border bg-gray-50 p-2">
//           {glbSrc ? (
//             <ModelViewer3D src={glbSrc} colorHex={colorHex} />
//           ) : (
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full aspect-square object-cover rounded-xl"
//             />
//           )}
//           <p className="mt-2 text-xs text-gray-500">
//             Drag to rotate, scroll to zoom.
//           </p>
//         </div>

//         {/* Details */}
//         <aside>
//           <h1 className="text-3xl font-semibold">{product.name}</h1>
//           <p className="mt-2 text-muted-foreground">{product.description}</p>
//           <p className="mt-2 text-sm text-muted-foreground">
//             Material: {product.material}
//           </p>
//           <p className="mt-4 text-2xl font-medium">${product.price}</p>

//           {/* Colors */}
//           {product.colors?.length ? (
//             <div className="mt-6">
//               <h3 className="font-medium mb-2">Colors</h3>
//               <div className="flex flex-wrap gap-2">
//                 {product.colors.map((c, i) => (
//                   <button
//                     key={c.name}
//                     onClick={() => setColorIdx(i)}
//                     className={`h-9 w-9 rounded-full border shadow-sm ring-offset-2 ${
//                       i === colorIdx ? "ring-2 ring-black" : ""
//                     }`}
//                     style={{ backgroundColor: c.hex }}
//                     title={c.name}
//                     aria-label={c.name}
//                   />
//                 ))}
//               </div>
//             </div>
//           ) : null}
//         </aside>
//       </div>
//     </div>
//   );
// }
