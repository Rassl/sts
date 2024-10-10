import { Canvas } from "@react-three/fiber";
import { Box, Edges, Line } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Leva, useControls } from "leva";

export const links = [
  { source: 10, target: 0 },
  { source: 0, target: 1 },
  { source: 10, target: 2 },
  { source: 10, target: 3 },
  { source: 10, target: 4 },
  { source: 10, target: 5 },
  { source: 10, target: 7 },
  { source: 6, target: 7 },
  { source: 6, target: 5 },
  { source: 7, target: 4 },
  { source: 3, target: 4 },
  { source: 3, target: 2 },
];

export const RotatingCube = ({ nodePositions, setNodePositions }) => {
  const outerCubeRef = useRef();
  const outerCubeSize = 20;
  const nodeSize = 0.5;

  // Rotate the outer cube slowly
  useFrame(() => {
    if (outerCubeRef.current) {
      outerCubeRef.current.rotation.y += 0.005;
    }

    // Update node positions on each frame
    setNodePositions((prevPositions) =>
      prevPositions.map((node) => {
        const { id, position, direction } = node;
        const halfSize = outerCubeSize / 2 - nodeSize / 2;

        // Calculate new positions
        const newPos = [position[0] + direction[0], position[1] + direction[1], position[2] + direction[2]];

        // Reverse direction if a node hits the bounds
        const newDirection = [
          newPos[0] > halfSize || newPos[0] < -halfSize ? -direction[0] : direction[0],
          newPos[1] > halfSize || newPos[1] < -halfSize ? -direction[1] : direction[1],
          newPos[2] > halfSize || newPos[2] < -halfSize ? -direction[2] : direction[2],
        ];

        return { ...node, position: newPos, direction: newDirection };
      })
    );
  });

  return (
    <group ref={outerCubeRef}>
      {/* Transparent outer cube with edges */}
      <Box args={[outerCubeSize, outerCubeSize, outerCubeSize]}>
        <meshBasicMaterial transparent opacity={0} />
        <Edges color="white" />
      </Box>

      {/* Render each moving node */}
      {nodePositions.map((node) => (
        <Box key={node.id} position={node.position} args={[nodeSize, nodeSize, nodeSize]}>
          <meshStandardMaterial color={`hsl(${(node.id * 30) % 360}, 100%, 50%)`} />
        </Box>
      ))}
    </group>
  );
};

export const Links = ({ nodePositions }) => {
  const group = useRef();

  const config = useControls({
    hoveredLink: true,
  });

  const { hoveredLink } = config;

  useFrame((_, delta) => {
    if (group.current) {
      group.current.children.forEach((group) => (group.children[0].material.uniforms.dashOffset.value -= delta * 5));
    }
  });

  return (
    <group ref={group}>
      {links.map((link, index) => {
        const start = nodePositions.find((i) => i.id === link.source).position;
        const end = nodePositions.find((i) => i.id === link.target).position;

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
