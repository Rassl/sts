import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Edges, QuadraticBezierLine, RoundedBox } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Leva, useControls } from "leva";
import { Experience } from "../Experience";
import { Links } from "../Links";
import { RotatingCube } from "../RotatitgCube";
import { Bloom, EffectComposer, Outline, Selection } from "@react-three/postprocessing";
import { ParticleSystem } from "../ParticlesSystem";
import { FloatingBg } from "../FloatingBg";
import { nodes } from "../../data";

// Component for rendering links between nodes

export const Graph = () => {
  const speed = 0.01;

  const nodeRefs = useRef(
    nodes.map((node) => ({
      id: node.id,
      ref: useRef(),
      direction: [Math.random() * speed, Math.random() * speed, Math.random() * speed], // Random initial direction for each node
    }))
  );

//   const { mipmapBlur, luminanceThreshold, luminanceSmoothing, intensity } = useControls({
//     mipmapBlur: !0,
//     luminanceThreshold: { value: 0.5, min: 0, max: 2, step: 0.01 },
//     luminanceSmoothing: { value: 0.025, min: 0, max: 1, step: 0.001 },
//     intensity: { value: 2, min: 0, max: 5, step: 0.01 },
//   });

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
        camera={{ position: [0, 0, 85], fov: 30, near: 0.1, far: 1000 }}
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
          <EffectComposer>
            {/* <Bloom
              mipmapBlur={mipmapBlur}
              luminanceThreshold={luminanceThreshold}
              luminanceSmoothing={luminanceSmoothing}
              intensity={intensity}
            />
            <Outline /> */}
          </EffectComposer>
          <RotatingCube nodeRefs={nodeRefs} />
        </Selection>
      </Canvas>
    </>
  );
};
