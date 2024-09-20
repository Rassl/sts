import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { links, nodes } from "../data";


export const Links = () => {
  const group = useRef();

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
            color="white"
            dashed
            transparent
            opacity={0.5}
            dashScale={5}
            gapSize={20}
            lineWidth={1} // Adjust the line width if necessary
          />
          <Line points={[start, end]} color="white" transparent opacity={0.3} lineWidth={0.5} />
        </group>
      )})}
    </group>
  );
};
