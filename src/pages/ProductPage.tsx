import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-sm text-muted-foreground">
          Product not found.{" "}
          <Link to="/" className="text-blue-600 underline">
            Back to home
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link to="/" className="text-sm text-blue-600 underline">
        ← Back
      </Link>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="mt-2 text-muted-foreground">{product.description}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Material: {product.material}
          </p>
          <p className="mt-4 text-2xl font-medium">${product.price}</p>

          {/* You can add <model-viewer> here later when you have a .glb */}
          {/* <model-viewer src="/models/example.glb" camera-controls auto-rotate /> */}
        </div>
      </div>
    </div>
  );
}
