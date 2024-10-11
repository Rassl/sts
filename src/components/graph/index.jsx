import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Edges, QuadraticBezierLine, RoundedBox } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Leva, useControls } from "leva";
import { Experience } from "../Experience";
import { Links } from "../Links";
import { RotatingCube } from "../RotatitgCube";
import { EffectComposer, Outline, Selection } from "@react-three/postprocessing";
import { ParticleSystem } from "../ParticlesSystem";
import { FloatingBg } from "../FloatingBg";

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
  const speed = 0.01;

  const nodeRefs = useRef(
    nodes.map((node) => ({
      id: node.id,
      ref: useRef(),
      direction: [Math.random() * speed, Math.random() * speed, Math.random() * speed], // Random initial direction for each node
    }))
  );

  const [hovering, setHovering] = useState(false);
  const cursorRef = useRef();

  // Update the cursor position on mouse move
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={`custom-cursor ${hovering ? "hovering" : ""}`} />
      <Leva />
      <Canvas
        onPointerOver={() => setHovering(true)}
        onPointerOut={() => setHovering(false)}
        camera={{ position: [0, 0, 55], fov: 30, near: 0.1, far: 1000 }}
      >
        <Experience />
        <ambientLight />
        {/* <FloatingBg /> */}
        <Selection>
          {/* <EffectComposer autoClear={false}>
            <Outline
              blur={config.blur}
            />
          </EffectComposer> */}
          <RotatingCube nodeRefs={nodeRefs} />
        </Selection>
      </Canvas>
    </>
  );
};
