import { Box, Edges, Select } from "@react-three/drei";
import { createRef, useEffect, useRef } from "react";
import { Color, Plane, Vector3 } from "three";
import { useControls } from "leva";
import { useDrag } from "@use-gesture/react";
import { useFrame, useThree } from "@react-three/fiber";
import { nodes } from "../data";
import { useRefsStore } from "../stores/useRefsStore";
import { useGraphStore } from "../stores/useGraphStore";
import { Links } from "./Links"; // Import the Links component

const color = new Color(0x16171d);

export const Cubes = () => {
  const refs = useRef(nodes.map(() => createRef()));
  const { camera, raycaster } = useThree(); // Access the camera and raycaster

  const { setHoveredNode, hoveredNode } = useGraphStore((state) => state);

  const config = useControls({
    autoRotate: true,
    blur: false,
    edgeStrength: { value: 1, min: 0, max: 10 },
    visibleEdgeColor: "lime",
    hiddenEdgeColor: "lime",
  });

  useFrame((state, delta) => {
    if (!hoveredNode && refs.current) {
      refs.current.forEach((nodeRef) => {
        if (nodeRef.current) {
          const moveAmount = 10 * delta; // Increased range with delta scaling
          nodeRef.current.position.x += (Math.random() - 0.5) * moveAmount;
          nodeRef.current.position.y += (Math.random() - 0.5) * moveAmount;
          nodeRef.current.position.z += (Math.random() - 0.5) * moveAmount;
        }
      });
    }
  });

  const { orbitControlsRef } = useRefsStore((s) => s);

  const onPointerIn = (e) => {
    setHoveredNode(e.object.userData.id);
  };
  const onPointerOut = () => {
    setHoveredNode(null);
    orbitControlsRef.current.enabled = true;
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
    <>
      {/* Assign a unique name to the parent group for nodes */}
      <Select onPointerOut={onPointerOut} onPointerOver={onPointerIn}>
        <group name="simulation__nodes">
          {nodes.map((node, index) => (
            <mesh
              key={index}
              {...bindDrag(index)}
              ref={refs.current[index]}
              position={node.position}
              userData={{ id: node.id }}
            >
              <boxGeometry args={[1, 1, 1, 32, 32, 32]} />
              <meshStandardMaterial color={color} />
              <Edges scale={1.01} color="#9A9CA5" lineWidth={2} />
            </mesh>
          ))}
        </group>
      </Select>
    </>
  );
};
