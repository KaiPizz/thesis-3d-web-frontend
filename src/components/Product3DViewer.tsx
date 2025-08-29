import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Product3DModel } from './Product3DModel';

interface Product3DViewerProps {
  modelType: string;
}

export function Product3DViewer({ modelType }: Product3DViewerProps) {
  return (
    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-muted-foreground">Loading 3D model...</div>
          </div>
        }>
          <Environment preset="apartment" />
          <Product3DModel modelType={modelType} />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}