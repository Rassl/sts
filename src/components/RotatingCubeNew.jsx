import { Box, Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

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

export const RotatingCubeNew = ({ nodeRefs }) => {
  const outerCubeRef = useRef();
  const outerCubeSize = 40;
  const nodeSize = 0.5;

  useFrame(() => {
    if (outerCubeRef.current) {
      outerCubeRef.current.rotation.y += 0.005;
    }

    // Update node positions directly using refs for better performance
    nodeRefs.current.forEach(({ ref, direction }) => {
      if (!ref.current) return;

      const pos = ref.current.position;
      const halfSize = outerCubeSize / 2 - nodeSize / 2;

      // Update position based on direction
      pos.x += direction[0];
      pos.y += direction[1];
      pos.z += direction[2];

      // Reverse direction if the node hits the bounds
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
        <Box
          key={id}
          ref={ref}
          position={nodes.find((node) => node.id === id).position}
          args={[nodeSize, nodeSize, nodeSize]}
        >
          <meshStandardMaterial color={`hsl(${(id * 30) % 360}, 100%, 50%)`} />
        </Box>
      ))}
    </group>
  );
};
