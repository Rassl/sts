import { RoundedBox } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export const GhostCube = ({ config, hoveredNode }) => {
  const cubeRef = useRef();

  useEffect(() => {
    if (cubeRef.current) {
      // Animate from (0, 0, 0) to the final position
      gsap.fromTo(
        cubeRef.current.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3, // Duration of animation
          ease: "power3.out",
        }
      );
    }
  }, [cubeRef]);

  return (
    <RoundedBox position={hoveredNode.position} radius={0.4} args={[2 + 1, 2 + 1, 2 + 1]} ref={cubeRef}>
      <meshStandardMaterial
        color={config.hoveredColor}
        transparent
        depthWrite={true}
        depthTest={false}
        opacity={0.1} // Adjust the opacity as desired
      />
    </RoundedBox>
  );
};
