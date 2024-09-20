import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { links, nodes } from "../data";
import { useControls } from "leva";


export const Links = () => {
  const group = useRef();

   const config = useControls({
     hoveredLink: true,
   });

   const {hoveredLink} = config;

  useFrame((_, delta) =>
    group.current.children.forEach((group) => (group.children[0].material.uniforms.dashOffset.value -= delta * 5))
  );

  return (
    <group ref={group}>
      {links.map((link, index) => {
         const start = nodes.find((i) => i.id === link.source).position;
         const end = nodes.find((i) => i.id === link.target).position;

        return (
        <group key={index}>
          <Line
            points={[start, end]} // Straight line from start to end
            color={hoveredLink ? "lime" : "white"}
            dashed
            transparent
            opacity={0.5}
            dashScale={5}
            gapSize={20}
            lineWidth={hoveredLink ? 4 : 1} // Adjust the line width if necessary
          />
          <Line points={[start, end]} color={hoveredLink ? "lime" : "white"} transparent opacity={hoveredLink ? 0.1 : 0.4} lineWidth={hoveredLink ? 4 : 0.5} />
        </group>
      )})}
    </group>
  );
};
