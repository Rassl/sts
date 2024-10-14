import { Box, Edges, Html, RoundedBox, Select } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Fragment, useRef } from "react";
import { Color } from "three";
import { Links } from "./Links";
import { useGraphStore } from "../stores/useGraphStore";
import { useDrag } from "@use-gesture/react";
import { useControls } from "leva";
import styled from "styled-components";
import { nodes } from "../data";

export const RotatingCube = ({ nodeRefs }) => {
  const outerCubeRef = useRef();
  const highlightCubeRef = useRef();
  const outerCubeSize = 25;
  const nodeSize = 2;
  const { setHoveredNodeId, hoveredNodeId } = useGraphStore((state) => state);

  const config = useControls({
    stopNodesMoving: true,
    stopRotations: true,
    edgeRadius: { value: 0.4, min: 0, max: 1 },
    cubeColor: { value: "#16171d", label: "Cube Color" }, // Updated color control
    hoveredColor: { value: "rgba(69, 198, 110, 1)", label: "Hovered Node Color" }, // Control for hovered color
  });

  useFrame(() => {
    if (hoveredNodeId) {
      return;
    }

    if (outerCubeRef.current && !config.stopRotations) {
      outerCubeRef.current.rotation.y += 0.005;
    }

    // if (config.stopNodesMoving) {
    //   return;
    // }

    // nodeRefs.current.forEach(({ ref, direction }) => {
    //   if (!ref.current) return;

    //   const pos = ref.current.position;
    //   const halfSize = outerCubeSize / 2 - nodeSize / 2;

    //   pos.x += direction[0];
    //   pos.y += direction[1];
    //   pos.z += direction[2];

    //   if (pos.x > halfSize || pos.x < -halfSize) direction[0] *= -1;
    //   if (pos.y > halfSize || pos.y < -halfSize) direction[1] *= -1;
    //   if (pos.z > halfSize || pos.z < -halfSize) direction[2] *= -1;
    // });
  });

  const onPointerIn = (e) => {
    setHoveredNodeId(e.object.userData.id);
  };
  const onPointerOut = () => {
    setHoveredNodeId(null);
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

  const hoveredNode = nodes.find((node) => node.id === hoveredNodeId);

  return (
    <group ref={outerCubeRef} {...bindOuterDrag()}>
      {/* Transparent outer cube with edges */}
      <Box args={[outerCubeSize, outerCubeSize, outerCubeSize]}>
        <meshBasicMaterial transparent opacity={0} />
      </Box>

      {/* Highlight cube that shows up around the hovered node */}
      {hoveredNode && (
        <RoundedBox
          position={hoveredNode.position}
          radius={config.edgeRadius}
          args={[nodeSize + 0.5, nodeSize + 0.5, nodeSize + 0.5]}
          ref={highlightCubeRef}
        >
          <meshStandardMaterial
            color={config.hoveredColor}
            transparent
            depthWrite={true}
            depthTest={false}
            opacity={0.01} // Adjust the opacity as desired
          />
        </RoundedBox>
      )}

      {/* Render each moving node using refs */}
      <Select onPointerOut={onPointerOut} onPointerOver={onPointerIn}>
        {nodeRefs.current.map(({ ref, id }, index) => (
          <Fragment key={id}>
            <RoundedBox
              key={id}
              userData={{ ref, id }}
              ref={ref}
              radius={config.edgeRadius}
              position={nodes.find((node) => node.id === id).position}
              args={[nodeSize, nodeSize, nodeSize]}
            >
              <meshStandardMaterial color={hoveredNodeId === id ? config.hoveredColor :  config.cubeColor} />
            </RoundedBox>
          </Fragment>
        ))}
      </Select>
      <Links nodeRefs={nodeRefs} />
    </group>
  );
};
