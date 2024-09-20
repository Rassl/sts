
import React, { useRef } from 'react';
import * as THREE from 'three';

export const RoundedHexagon = () => {
  const meshRef = useRef();

  const outerRadius = 2; // Outer hexagon radius
  const innerRadius = 1.8; // Inner hexagon radius
  const cornerRadius = 0.1; // Radius for the rounded corners

  // Create the outer hexagon shape with rounded corners
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const angle1 = (i / 6) * Math.PI * 2;
    const angle2 = ((i + 1) / 6) * Math.PI * 2;

    const x1 = Math.cos(angle1) * outerRadius;
    const y1 = Math.sin(angle1) * outerRadius;

    const x2 = Math.cos(angle2) * outerRadius;
    const y2 = Math.sin(angle2) * outerRadius;

    const x1Rounded = Math.cos(angle1) * (outerRadius - cornerRadius);
    const y1Rounded = Math.sin(angle1) * (outerRadius - cornerRadius);

    const x2Rounded = Math.cos(angle2) * (outerRadius - cornerRadius);
    const y2Rounded = Math.sin(angle2) * (outerRadius - cornerRadius);

    if (i === 0) {
      shape.moveTo(x1Rounded, y1Rounded); // Start from the first rounded point
    } else {
      shape.lineTo(x1Rounded, y1Rounded); // Draw straight line to next rounded corner
    }

    // Draw the rounded corner using quadratic curves
    shape.quadraticCurveTo(x1, y1, x2Rounded, y2Rounded);
  }
  shape.closePath();

  // Create the inner hexagon hole (without rounded corners)
  const hole = new THREE.Path();
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = Math.cos(angle) * innerRadius;
    const y = Math.sin(angle) * innerRadius;
    if (i === 0) {
      hole.moveTo(x, y);
    } else {
      hole.lineTo(x, y);
    }
  }
  hole.closePath();

  // Add the hole to the shape
  shape.holes.push(hole);

  // Create the geometry from the shape
  const hexagonWithHoleGeometry = new THREE.ShapeGeometry(shape);

  return (
    <mesh ref={meshRef} geometry={hexagonWithHoleGeometry}>
      <meshBasicMaterial color="lime" />
    </mesh>
  );
};