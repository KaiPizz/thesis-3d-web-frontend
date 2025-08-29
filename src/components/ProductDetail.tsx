import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ArrowLeft, Package, Ruler, DollarSign } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { products } from '../App';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === parseInt(id || '0'));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2>Product not found</h2>
        <Button onClick={() => navigate('/')} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate('/')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image - Placeholder for 3D Model */}
        <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
          <div className="text-center p-8">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg">
              <p className="text-sm">3D Model Viewer</p>
              <p className="text-xs opacity-75">Interactive 3D model coming soon</p>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h1>{product.name}</h1>
              <Badge variant="default" className="text-lg px-3 py-1">
                ${product.price}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Ruler className="w-5 h-5 mr-2" />
                Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-muted-foreground mb-1">Width</div>
                  <div className="text-2xl">{product.dimensions.width}</div>
                  <div className="text-sm text-muted-foreground">cm</div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground mb-1">Length</div>
                  <div className="text-2xl">{product.dimensions.length}</div>
                  <div className="text-sm text-muted-foreground">cm</div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground mb-1">Height</div>
                  <div className="text-2xl">{product.dimensions.height}</div>
                  <div className="text-sm text-muted-foreground">cm</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Material */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Material
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{product.material}</p>
            </CardContent>
          </Card>

          {/* Price Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Base Price:</span>
                <span>${product.price}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Total:</span>
                <span>${product.price}</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button className="w-full" size="lg">
              Add to Cart
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              Enable 3D Viewer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}