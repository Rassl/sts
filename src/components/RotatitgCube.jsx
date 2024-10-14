import { Box, Select } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { useControls } from "leva";
import { useGraphStore } from "../stores/useGraphStore";
import { nodes } from "../data";
import { Node } from "./Node";
import { Links } from "./Links";
import { GhostCube } from "./GhostCube";

export const RotatingCube = ({ nodeRefs }) => {
  const outerCubeRef = useRef();
  const { setHoveredNodeId, hoveredNodeId } = useGraphStore((state) => state);

  const config = useControls({
    stopRotations: false,
    cubeColor: { value: "#16171d", label: "Cube Color" },
    hoveredColor: { value: "rgba(69, 198, 110, 1)", label: "Hovered Node Color" },
  });

  useFrame(() => {
    if (!hoveredNodeId && outerCubeRef.current && !config.stopRotations) {
      outerCubeRef.current.rotation.y += 0.005;
    }
  });

  const onPointerIn = (e) => {
    setHoveredNodeId(e.object.userData.id);
  };

  const onPointerOut = () => {
    setHoveredNodeId(null);
  };

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

  const hoveredNode = nodes.find((i) => i.id === hoveredNodeId);

  return (
    <group ref={outerCubeRef} {...bindOuterDrag()}>
      {/* Transparent outer cube */}
      <Box args={[25, 25, 25]}>
        <meshBasicMaterial transparent opacity={0} />
      </Box>

      {hoveredNodeId && <GhostCube config={config} hoveredNode={hoveredNode} />}

      {/* Render each node using the Node component */}
      <Select onPointerOut={onPointerOut} onPointerOver={onPointerIn}>
        {nodeRefs.current.map(({ ref, id }) => {
          const nodeData = nodes.find((node) => node.id === id);
          return (
            <Node
              key={id}
              id={id}
              position={nodeData.position}
              color={config.cubeColor}
              hoveredColor={config.hoveredColor}
              isHovered={hoveredNodeId === id}
              nodeRef={ref}
            />
          );
        })}
      </Select>
      <Links nodeRefs={nodeRefs} />
    </group>
  );
};
