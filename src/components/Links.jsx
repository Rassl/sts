import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { links } from "../data";
import { useControls } from "leva";
import { useGraphStore } from "../stores/useGraphStore";

export const Links = () => {
  const group = useRef();
  const nodePositions = useGraphStore((state) => state.nodePositions); // Access node positions from Zustand
  const [d, setD] = useState(0)

  const config = useControls({
    hoveredLink: true,
  });

  const { hoveredLink } = config;

  // Update dashOffset animation
  useFrame((_, delta) => {
    setD(delta)
    if (group.current) {
      group.current.children.forEach((group) => {
        group.children[0].material.uniforms.dashOffset.value -= delta * 5;
      });
    }
  });

  return (
    <group ref={group}>
      {links.map((link, index) => {
        // Get the current positions of the source and target nodes from Zustand
        const start = nodePositions[link.source] || [0, 0, 0]; // Fallback to [0, 0, 0] if position is missing
        const end = nodePositions[link.target] || [0, 0, 0];

        return (
          <group key={index}>
            <Line
              points={[start, end]} // Straight line from start to end
              color={hoveredLink ? "lime" : "white"}
              dashed
              transparent
              opacity={0.5}
              dashScale={5}
              gapSize={20}
              lineWidth={hoveredLink ? 4 : 1} // Adjust the line width if necessary
            />
            <Line
              points={[start, end]}
              color={hoveredLink ? "lime" : "white"}
              transparent
              opacity={hoveredLink ? 0.1 : 0.4}
              lineWidth={hoveredLink ? 4 : 0.5}
            />
          </group>
        );
      })}
    </group>
  );
};
