import { Box, Edges, Html, RoundedBox, Select } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";
import { Links } from "./Links";
import { useGraphStore } from "../stores/useGraphStore";
import { useDrag } from "@use-gesture/react";
import { useControls } from "leva";
import styled from "styled-components";
import { nodes } from "../data";

// Component for rendering and updating node positions
export const RotatingCube = ({ nodeRefs }) => {
  const outerCubeRef = useRef();
  const outerCubeSize = 25;
  const nodeSize = 2;
  const { setHoveredNode, hoveredNode } = useGraphStore((state) => state);

  const config = useControls({
    stopNodesMoving: true,
    stopRotations: false,
    edgeRadius: { value: 0.4, min: 0, max: 1 },
    cubeColor: { value: "#16171d", label: "Cube Color" }, // Updated color control
    hoveredColor: { value: "lime", label: "Hovered Node Color" }, // Control for hovered color
  });

  useFrame(() => {
    if (hoveredNode) {
      return;
    }

    if (outerCubeRef.current && !config.stopRotations) {
      outerCubeRef.current.rotation.y += 0.005;
    }

    if (config.stopNodesMoving) {
      return;
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

  const onPointerIn = (e) => {
    setHoveredNode(e.object.userData.id);
  };
  const onPointerOut = () => {
    setHoveredNode(null);
  };

  // Create drag handler for the outer cube rotation
  const bindOuterDrag = useDrag(
    ({ movement: [mx, my], memo = outerCubeRef.current.rotation.clone() }) => {
      if (outerCubeRef.current) {
        outerCubeRef.current.rotation.y = memo.y + mx * 0.01;
        outerCubeRef.current.rotation.x = memo.x + my * 0.01;
      }
      return memo;
    },
    { pointerEvents: true }
  );

  return (
    <group ref={outerCubeRef} {...bindOuterDrag()}>
      {/* Transparent outer cube with edges */}
      <Box args={[outerCubeSize, outerCubeSize, outerCubeSize]}>
        <meshBasicMaterial transparent opacity={0} />
      </Box>

      {/* Render each moving node using refs */}
      <Select onPointerOut={onPointerOut} onPointerOver={onPointerIn}>
        {nodeRefs.current.map(({ ref, id }, index) => (
          <RoundedBox
            key={id}
            userData={{ ref, id }}
            ref={ref}
            radius={config.edgeRadius}
            position={nodes.find((node) => node.id === id).position}
            args={[nodeSize, nodeSize, nodeSize]}
          >
            {/* Use Leva's color values for material color */}
            <meshStandardMaterial color={hoveredNode === id ? config.hoveredColor : config.cubeColor} />
          </RoundedBox>
        ))}
      </Select>
      <Links nodeRefs={nodeRefs} />
    </group>
  );
};
