import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

export const CustomLine = ({ start, end, hoveredLink, link, nodeRefs }) => {
  const lineRef = useRef();

  useFrame(() => {
    const sourceNode = nodeRefs.current.find((n) => n.id === link.source);
    const targetNode = nodeRefs.current.find((n) => n.id === link.target);

    if (!sourceNode?.ref.current || !targetNode?.ref.current) return null;

    const start = sourceNode.ref.current.position.toArray();
    const end = targetNode.ref.current.position.toArray();

    if (lineRef.current) {
      const points = [new Vector3(...start), new Vector3(...end)];
      lineRef.current.geometry.setFromPoints(points); // Set the initial points
      lineRef.current.computeLineDistances(); // Compute distances for dash
    }
  }, [start, end]);

  useFrame(() => {
    if (lineRef.current) {
      // Animate dash offset
      lineRef.current.material.dashOffset -= 0.02;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineDashedMaterial
        color={hoveredLink ? "lime" : "white"}
        linewidth={hoveredLink ? 2 : 1}
        dashSize={0.5}
        gapSize={0.2}
      />
    </line>
  );
};
