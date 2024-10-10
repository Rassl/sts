import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Edges, QuadraticBezierLine, RoundedBox } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Leva, useControls } from "leva";
import { Experience } from "./components/Experience";

// Nodes and links data
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

const links = [
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

// Component for rendering and updating node positions
const RotatingCube = ({ nodeRefs }) => {
  const outerCubeRef = useRef();
  const outerCubeSize = 25;
  const nodeSize = 2;
  const color = new THREE.Color(0x16171d);

  useFrame(() => {
    if (outerCubeRef.current) {
      outerCubeRef.current.rotation.y += 0.005;
    }

    nodeRefs.current.forEach(({ ref, direction }) => {
      if (!ref.current) return;

      const pos = ref.current.position;
      const halfSize = outerCubeSize / 2 - nodeSize / 2;

      pos.x += direction[0];
      pos.y += direction[1];
      pos.z += direction[2];

      if (pos.x > halfSize || pos.x < -halfSize) direction[0] *= -1;
      if (pos.y > halfSize || pos.y < -halfSize) direction[1] *= -1;
      if (pos.z > halfSize || pos.z < -halfSize) direction[2] *= -1;
    });
  });

  return (
    <group ref={outerCubeRef}>
      {/* Transparent outer cube with edges */}
      <Box args={[outerCubeSize, outerCubeSize, outerCubeSize]}>
        <meshBasicMaterial transparent opacity={0} />
        <Edges color="white" />
      </Box>

      {/* Render each moving node using refs */}
      {nodeRefs.current.map(({ ref, id }) => (
        <RoundedBox
          key={id}
          ref={ref}
          radius={0.2}
          position={nodes.find((node) => node.id === id).position}
          args={[nodeSize, nodeSize, nodeSize]}
        >
          <meshStandardMaterial color={color} />
        </RoundedBox>
      ))}
      <Links nodeRefs={nodeRefs} />
    </group>
  );
};

// Component for rendering links between nodes
const Links = ({ nodeRefs }) => {
  const config = useControls({
    hoveredLink: true,
  });
  const { hoveredLink } = config;

  // Create refs for each line to be accessed dynamically
  const lineRefs = useRef(links.map(() => useRef()));

  useFrame((_, delta) => {
    // Update the positions of each line dynamically in each frame
    links.forEach((link, index) => {
      const sourceNode = nodeRefs.current.find((n) => n.id === link.source);
      const targetNode = nodeRefs.current.find((n) => n.id === link.target);

    if (sourceNode?.ref.current && targetNode?.ref.current) {
      const start = sourceNode.ref.current.position.toArray();
      const end = targetNode.ref.current.position.toArray();

      // Calculate midpoint for a straight line
      const mid = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2, (start[2] + end[2]) / 2];

      // Dynamically update start, end, and mid positions using refs
      const line = lineRefs.current[index].current;
      if (line) {
        console.log(start, mid, end); // Optional: for debugging
        line.setPoints(start, end, mid); // Update the line with start, end, and mid points
      }
    }
    });
  });

  return (
    <group>
      {links.map((link, index) => (
        <QuadraticBezierLine
          key={index}
          ref={lineRefs.current[index]} // Assign refs for dynamic updates
          start={[0, 0, 0]} // Placeholder positions; will be updated dynamically
          end={[0, 0, 0]} // Placeholder positions; will be updated dynamically
          mid={[0, 0, 0]} // Midpoint can be adjusted for curve control
          lineWidth={1}
          color={hoveredLink ? "lime" : "#fff"}
          dashed
          dashSize={1}
          gapSize={0.5}
          dashOffset={0} // Initialize dashOffset; will be animated in useFrame
          transparent={false}
          opacity={0.6}
        />
      ))}
    </group>
  );
};

export const AppNew = () => {
  const speed = 0.05

  const nodeRefs = useRef(
    nodes.map((node) => ({
      id: node.id,
      ref: useRef(),
      direction: [Math.random() * speed, Math.random() * speed, Math.random() * speed], // Random initial direction for each node
    }))
  );

  return (
    <>
      <Leva />
      <Canvas camera={{ position: [0, 0, 55], fov: 30, near: 0.1, far: 1000 }}>
        <Experience />
        <ambientLight />
        <RotatingCube nodeRefs={nodeRefs} />
      </Canvas>
    </>
  );
};

