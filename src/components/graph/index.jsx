import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Edges, QuadraticBezierLine, RoundedBox } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Leva, useControls } from "leva";
import { Experience } from "../Experience";
import { Links } from "../Links";
import { RotatingCube } from "../RotatitgCube";
import { EffectComposer, Outline, Selection } from "@react-three/postprocessing";

// Component for rendering links between nodes

const nodes = [
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

export const Graph = () => {
  const speed = 0.05;

  const nodeRefs = useRef(
    nodes.map((node) => ({
      id: node.id,
      ref: useRef(),
      direction: [Math.random() * speed, Math.random() * speed, Math.random() * speed], // Random initial direction for each node
    }))
  );

  const config = useControls({
    blur: false,
    axesHelper: false,
    edgeStrength: { value: 1, min: 0, max: 10 },
    visibleEdgeColor: "lime",
    hiddenEdgeColor: "lime",
  });

  return (
    <>
      <Leva />
      <Canvas camera={{ position: [0, 0, 55], fov: 30, near: 0.1, far: 1000 }}>
        <Experience />
        <ambientLight />
        <Selection>
          <EffectComposer autoClear={false}>
            <Outline
              blur={config.blur}
              visibleEdgeColor={config.visibleEdgeColor}
              hiddenEdgeColor={config.hiddenEdgeColor}
              edgeStrength={config.edgeStrength}
            />
          </EffectComposer>
          <RotatingCube nodeRefs={nodeRefs} />
        </Selection>
      </Canvas>
    </>
  );
};
