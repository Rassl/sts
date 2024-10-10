import { Box, Edges, RoundedBox, Select } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";
import { Links } from "./Links";
import { useGraphStore } from "../stores/useGraphStore";
import { useDrag } from "@use-gesture/react";
import { useControls } from "leva";

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

// Component for rendering and updating node positions
export const RotatingCube = ({ nodeRefs }) => {
  const outerCubeRef = useRef();
  const outerCubeSize = 25;
  const nodeSize = 2;
  const color = new Color(0x16171d);
  const { setHoveredNode, hoveredNode } = useGraphStore((state) => state);

  const config = useControls({
    stopNodesMoving: false,
    stopRotations: false,
    edgeRadius: { value: 0.2, min: 0, max: 1 },
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
    console.log(e);
    setHoveredNode(e.object.userData.id);
  };
  const onPointerOut = () => {
    setHoveredNode(null);
  };

  const bindDrag = useDrag(
    ({ event, args: [index] }) => {
      if (orbitControlsRef?.current) {
        orbitControlsRef.current.enabled = false;
      }

      raycaster.setFromCamera(event.pointer, camera);
      raycaster.ray.intersectPlane(new Plane(new Vector3(0, 0, 1), 0), new Vector3());

      refs.current[index].current.position.copy(event.point);
    },
    { pointerEvents: true }
  );

  return (
    <group ref={outerCubeRef}>
      {/* Transparent outer cube with edges */}
      <Box args={[outerCubeSize, outerCubeSize, outerCubeSize]}>
        <meshBasicMaterial transparent opacity={0} />
        {/* <Edges color="white" /> */}
      </Box>

      {/* Render each moving node using refs */}
      <Select onPointerOut={onPointerOut} onPointerOver={onPointerIn}>
        {nodeRefs.current.map(({ ref, id }, index) => (
          <RoundedBox
            key={id}
            userData={{ ref, id }}
            ref={ref}
            {...bindDrag(index)}
            radius={config.edgeRadius}
            position={nodes.find((node) => node.id === id).position}
            args={[nodeSize, nodeSize, nodeSize]}
          >
            <meshStandardMaterial color={hoveredNode === id ? "lime" : color} />
          </RoundedBox>
        ))}
      </Select>
      <Links nodeRefs={nodeRefs} />
    </group>
  );
};
