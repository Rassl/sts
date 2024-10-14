import { RoundedBox } from "@react-three/drei";
import { useEffect } from "react";
import { gsap } from "gsap";

export const Node = ({ id, position, color, hoveredColor, isHovered, nodeRef }) => {
  useEffect(() => {
    if (nodeRef.current) {
      // Animate from (0, 0, 0) to the final position
      gsap.to(nodeRef.current.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 2, // Duration of animation
        ease: "power3.out",
      });
    }
  }, [position, nodeRef]);

  return (
    <RoundedBox
      ref={nodeRef} // Assign nodeRef here, not nodeMesh
      userData={{ id }}
      radius={0.4}
      args={[2, 2, 2]} // Node size
    >
      <meshStandardMaterial color={isHovered || id === "knowledge-graph" ? hoveredColor : color} />
    </RoundedBox>
  );
};
