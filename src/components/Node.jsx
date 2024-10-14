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

  useEffect(() => {
    if (nodeRef.current) {
      // Animate from (0, 0, 0) to the final position
         gsap.to(nodeRef.current.scale, {
           x: isHovered ? 0.9 : 1,
           y: isHovered ? 0.9 : 1,
           z: isHovered ? 0.9 : 1,
           duration: 0.3, // Duration of animation
           ease: "power3.out",
         });
    }
  }, [position, nodeRef, isHovered]);

  console.log(nodeRef.current)

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
