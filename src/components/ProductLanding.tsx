import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Eye } from 'lucide-react';
import { products } from '../App';

export function ProductLanding() {
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="mb-4">Furniture Collection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of modern furniture. Click on any item to view detailed specifications and interactive 3D models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-300 group"
              onClick={() => handleProductClick(product.id)}
            >
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg relative">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <Badge variant="secondary" className="ml-2">
                      ${product.price}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{product.material}</span>
                    <span className="text-xs">
                      {product.dimensions.width} × {product.dimensions.length} × {product.dimensions.height} cm
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}