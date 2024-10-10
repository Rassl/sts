import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Edges, Line } from "@react-three/drei"; // Use @react-three/drei Line for correct handling
import { useRef, useState } from "react";
import { Leva, useControls } from "leva";
import * as THREE from "three";
import { Experience } from './components/Experience';
import { RotatingCubeNew } from "./components/RotatingCubeNew";
import { LinksNew } from "./components/LinksNew";
import { Links } from "./components/Links";

// Nodes and links data
export const nodes = [
  { id: 10, position: [0, 0, 0] },
  { id: 0, position: [5, 5, 5] },
  { id: 1, position: [10, 8, 10] },
  { id: 2, position: [5, -5, 5] },
  { id: 3, position: [5, -15, 5] },
  { id: 4, position: [-5, -5, 5] },
  { id: 5, position: [-10, -8, -5] },
  { id: 6, position: [-5, 5, -5] },
  { id: 7, position: [5, 5, -5] },
];


export function AppNew() {
  const nodeRefs = useRef(
    nodes.map((node) => ({
      id: node.id,
      ref: useRef(),
      direction: [Math.random() * 0.05, Math.random() * 0.05, Math.random() * 0.05], // Random initial direction for each node
    }))
  );

  return (
    <>
      <Leva />
      <Canvas>
        <Experience />
        <ambientLight />
        <RotatingCubeNew nodeRefs={nodeRefs} />
        {false && <LinksNew nodeRefs={nodeRefs} />}
        <Links />
      </Canvas>
    </>
  );
}
