import { QuadraticBezierLine } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { useGraphStore } from "../stores/useGraphStore";

const links = [
  { source: 10, target: 0 },
  { source: 0, target: 1 },
  { source: 10, target: 2 },
  { source: 10, target: 3 },
  { source: 10, target: 4 },
  { source: 10, target: 5 },
  { source: 10, target: 7 },
  { source: 6, target: 7 },
  { source: 6, target: 5 },
  { source: 7, target: 4 },
  { source: 3, target: 4 },
  { source: 3, target: 2 },
];

export const Links = ({ nodeRefs }) => {
  const config = useControls({
    hoveredLink: true,
  });
  const { hoveredLink } = config;
  const { hoveredNode } = useGraphStore((state) => state);

  // Create a group reference for grouping lines
  const group = useRef();
  const lineRefs = useRef([]);

  useFrame((_, delta) => {
    console.log(group);
    group.current.children.forEach((gr, index) => {
      const link = links[index];
      const sourceNode = nodeRefs.current.find((n) => n.id === link.source);
      const targetNode = nodeRefs.current.find((n) => n.id === link.target);

      if (sourceNode?.ref.current && targetNode?.ref.current) {
        const start = sourceNode.ref.current.position.toArray();
        const end = targetNode.ref.current.position.toArray();
        const mid = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2, (start[2] + end[2]) / 2];

        gr.children.forEach((ln) => {
          const line = ln;
          if (line) {
            line.setPoints(start, end, mid);
          }
        });
      }
    });
  });

  useFrame((_, delta) =>
    group.current.children.forEach((group) => (group.children[0].material.uniforms.dashOffset.value -= delta * 5))
  )

  return (
    <group ref={group}>
      {links.map((link, index) => {
        const isHovered = link.source === hoveredNode || link.target === hoveredNode;

        return (
          <group key={`group-${index}`}>
            {/* Main line with hover effect */}
            <QuadraticBezierLine
              start={[0, 0, 0]} // Placeholder positions; will be updated dynamically
              end={[0, 0, 0]} // Placeholder positions; will be updated dynamically
              mid={[0, 0, 0]} // Straight line from start to end
              color={isHovered ? "lime" : "white"}
              dashed
              transparent={false}
              opacity={0.5}
              dashScale={5}
              gapSize={20}
              lineWidth={isHovered ? 4 : 1}
            />
            {/* Secondary line for dimmed effect */}
            <QuadraticBezierLine
              start={[0, 0, 0]} // Placeholder positions; will be updated dynamically
              end={[0, 0, 0]} // Placeholder positions; will be updated dynamically
              mid={[0, 0, 0]}
              color={isHovered ? "lime" : "white"}
              transparent={false}
              lineWidth={isHovered ? 4 : 0.5}
            />
          </group>
        );
      })}
    </group>
  );
};
