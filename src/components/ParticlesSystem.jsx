import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Stats } from "@react-three/drei";
import { GUI } from "lil-gui";

const maxParticleCount = 1000;
const r = 800;
const rHalf = r / 2;

export function ParticleSystem() {
  const particlesData = useMemo(
    () =>
      Array.from({ length: maxParticleCount }, () => ({
        velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
        numConnections: 0,
      })),
    []
  );

  const positions = useMemo(() => new Float32Array(maxParticleCount * 3), []);
  const colors = useMemo(() => new Float32Array(maxParticleCount * 3), []);
  const particles = useRef();
  const linePositions = useRef();
  const colorAttr = useRef();
  const group = useRef();

  const [particleCount, setParticleCount] = useState(500);
  const [showDots, setShowDots] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [minDistance, setMinDistance] = useState(150);
  const [limitConnections, setLimitConnections] = useState(false);
  const [maxConnections, setMaxConnections] = useState(20);

  useFrame(() => {
    // return false

    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    for (let i = 0; i < particleCount; i++) {
      particlesData[i].numConnections = 0;
      positions[i * 3] += particlesData[i].velocity.x;
      positions[i * 3 + 1] += particlesData[i].velocity.y;
      positions[i * 3 + 2] += particlesData[i].velocity.z;

      // Bounce particles
      if (positions[i * 3 + 1] < -rHalf || positions[i * 3 + 1] > rHalf)
        particlesData[i].velocity.y = -particlesData[i].velocity.y;
      if (positions[i * 3] < -rHalf || positions[i * 3] > rHalf)
        particlesData[i].velocity.x = -particlesData[i].velocity.x;
      if (positions[i * 3 + 2] < -rHalf || positions[i * 3 + 2] > rHalf)
        particlesData[i].velocity.z = -particlesData[i].velocity.z;

      if (limitConnections && particlesData[i].numConnections >= maxConnections) continue;

      // Check for collisions and draw lines between particles
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < minDistance) {
          particlesData[i].numConnections++;
          particlesData[j].numConnections++;

          const alpha = 1.0 - dist / minDistance;

          linePositions.current.array[vertexpos++] = positions[i * 3];
          linePositions.current.array[vertexpos++] = positions[i * 3 + 1];
          linePositions.current.array[vertexpos++] = positions[i * 3 + 2];

          linePositions.current.array[vertexpos++] = positions[j * 3];
          linePositions.current.array[vertexpos++] = positions[j * 3 + 1];
          linePositions.current.array[vertexpos++] = positions[j * 3 + 2];

          colors[colorpos++] = alpha;
          colors[colorpos++] = alpha;
          colors[colorpos++] = alpha;

          colors[colorpos++] = alpha;
          colors[colorpos++] = alpha;
          colors[colorpos++] = alpha;

          numConnected++;
        }
      }
    }

    // Update the lines and points
    particles.current.geometry.attributes.position.needsUpdate = true;
    linePositions.current.needsUpdate = true;
    colorAttr.current.needsUpdate = true;
  });

  return (
    <group ref={group}>
      {showDots && (
        <points ref={particles} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={maxParticleCount} array={positions} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial
            size={3}
            color={0xffffff}
            blending={THREE.AdditiveBlending}
            transparent
            sizeAttenuation={false}
          />
        </points>
      )}

      {showLines && (
        <lineSegments frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute ref={linePositions} attach="attributes-position" array={positions} itemSize={30} />
            <bufferAttribute ref={colorAttr} attach="attributes-color" array={colors} itemSize={30} />
          </bufferGeometry>
          <lineBasicMaterial vertexColors={THREE.VertexColors} blending={THREE.AdditiveBlending} transparent />
        </lineSegments>
      )}
    </group>
  );
}
