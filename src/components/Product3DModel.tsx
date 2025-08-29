import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface Product3DModelProps {
  modelType: string;
}

export function Product3DModel({ modelType }: Product3DModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const renderModel = () => {
    switch (modelType) {
      case 'chair':
        return (
          <group ref={groupRef}>
            {/* Chair seat */}
            <Box args={[1.2, 0.1, 1]} position={[0, 0.4, 0]} material-color="#8B4513" />
            {/* Chair back */}
            <Box args={[1.2, 1.5, 0.1]} position={[0, 1.15, -0.45]} material-color="#8B4513" />
            {/* Chair legs */}
            <Cylinder args={[0.05, 0.05, 0.8]} position={[-0.5, 0, -0.4]} material-color="#654321" />
            <Cylinder args={[0.05, 0.05, 0.8]} position={[0.5, 0, -0.4]} material-color="#654321" />
            <Cylinder args={[0.05, 0.05, 0.8]} position={[-0.5, 0, 0.4]} material-color="#654321" />
            <Cylinder args={[0.05, 0.05, 0.8]} position={[0.5, 0, 0.4]} material-color="#654321" />
          </group>
        );
      
      case 'table':
      case 'dining-table':
        return (
          <group ref={groupRef}>
            {/* Table top */}
            <Box args={[3, 0.1, 1.5]} position={[0, 0.75, 0]} material-color="#A0522D" />
            {/* Table legs */}
            <Cylinder args={[0.08, 0.08, 1.5]} position={[-1.3, 0, -0.6]} material-color="#654321" />
            <Cylinder args={[0.08, 0.08, 1.5]} position={[1.3, 0, -0.6]} material-color="#654321" />
            <Cylinder args={[0.08, 0.08, 1.5]} position={[-1.3, 0, 0.6]} material-color="#654321" />
            <Cylinder args={[0.08, 0.08, 1.5]} position={[1.3, 0, 0.6]} material-color="#654321" />
          </group>
        );

      case 'lamp':
        return (
          <group ref={groupRef}>
            {/* Lamp base */}
            <Cylinder args={[0.3, 0.3, 0.1]} position={[0, 0.05, 0]} material-color="#2C2C2C" />
            {/* Lamp pole */}
            <Cylinder args={[0.02, 0.02, 3]} position={[0, 1.5, 0]} material-color="#2C2C2C" />
            {/* Lamp shade */}
            <Cylinder args={[0.4, 0.3, 0.6]} position={[0, 2.7, 0]} material-color="#F5F5DC" />
          </group>
        );

      case 'bookshelf':
        return (
          <group ref={groupRef}>
            {/* Main frame */}
            <Box args={[1.6, 3.6, 0.6]} position={[0, 1.8, 0]} material-color="#8B4513">
              <meshPhongMaterial attach="material" color="#8B4513" />
            </Box>
            {/* Shelves */}
            <Box args={[1.5, 0.05, 0.55]} position={[0, 0.7, 0]} material-color="#654321" />
            <Box args={[1.5, 0.05, 0.55]} position={[0, 1.4, 0]} material-color="#654321" />
            <Box args={[1.5, 0.05, 0.55]} position={[0, 2.1, 0]} material-color="#654321" />
            <Box args={[1.5, 0.05, 0.55]} position={[0, 2.8, 0]} material-color="#654321" />
          </group>
        );

      case 'desk':
        return (
          <group ref={groupRef}>
            {/* Desktop */}
            <Box args={[2.8, 0.08, 1.4]} position={[0, 0.75, 0]} material-color="#D2B48C" />
            {/* Left panel */}
            <Box args={[0.6, 1.4, 1.3]} position={[-1.1, 0.35, 0]} material-color="#CD853F" />
            {/* Right panel */}
            <Box args={[0.6, 1.4, 1.3]} position={[1.1, 0.35, 0]} material-color="#CD853F" />
            {/* Back panel */}
            <Box args={[2.8, 0.1, 1.3]} position={[0, 0.35, -0.65]} material-color="#CD853F" />
          </group>
        );

      default:
        return (
          <group ref={groupRef}>
            <Box args={[1, 1, 1]} material-color="#8B4513" />
          </group>
        );
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      {renderModel()}
    </>
  );
}