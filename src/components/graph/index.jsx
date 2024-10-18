import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Edges, QuadraticBezierLine, RoundedBox } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Experience } from "../Experience";
import { Links } from "../Links";
import { RotatingCube } from "../RotatitgCube";
import { Bloom, EffectComposer, Outline, Selection } from "@react-three/postprocessing";
import { ParticleSystem } from "../ParticlesSystem";
import { FloatingBg } from "../FloatingBg";
import { nodes } from "../../data";
import { useGraphStore } from "../../stores/useGraphStore";

// Component for rendering links between nodes

export const Graph = () => {
  const speed = 0.01;

  const { hoveredNodeId } = useGraphStore((s) => s);

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
      <div
        ref={cursorRef}
        className={`custom-cursor ${hovering ? "hovering" : ""} ${hoveredNodeId ? "exploring" : ""} `}
      >
        <svg width="100%" height="100%" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" stroke="white" stroke-width="2" fill="none" stroke-dasharray="10 8"></circle>
        </svg>
      </div>

      {/* <Leva /> */}
      <Canvas
        onPointerOver={() => setHovering(true)}
        onPointerOut={() => setHovering(false)}
        camera={{ position: [0, 0, 190], fov: 30, near: 0.1, far: 1000 }}
      >
        <Experience />
        <ambientLight />
        {/* <FloatingBg /> */}

        <RotatingCube nodeRefs={nodeRefs} />
      </Canvas>
    </>
  );
};
