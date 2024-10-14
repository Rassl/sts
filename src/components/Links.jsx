import { QuadraticBezierLine } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { useGraphStore } from "../stores/useGraphStore";
import { links } from "../data";

export const Links = ({ nodeRefs }) => {
  const { hoveredNodeId } = useGraphStore((state) => state);

   const config = useControls({
     edgeColor: { value: 'white', label: "Link color" }, // Control for hovered color
   });

  // Create a group reference for grouping lines
  const group = useRef();
  const lineRefs = useRef([]);

  const [lines, setLines] = useState([]);

  // Initialize line positions only once
  useEffect(() => {
    const initialLines = links.map((link) => {
      const sourceNode = nodeRefs.current.find((n) => n.id === link.source);
      const targetNode = nodeRefs.current.find((n) => n.id === link.target);

      if (sourceNode?.ref.current && targetNode?.ref.current) {
        const start = sourceNode.ref.current.position.toArray();
        const end = targetNode.ref.current.position.toArray();
        const mid = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2, (start[2] + end[2]) / 2];
        return { start, end, mid };
      }

      return { start: [0, 0, 0], end: [0, 0, 0], mid: [0, 0, 0] };
    });

    setLines(initialLines);
  }, [nodeRefs, hoveredNodeId]);

  useFrame((_, delta) => {
    if (hoveredNodeId) {
      return;
    }
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
  );

  return (
    <group ref={group}>
      {links.map((link, index) => {
        const isHovered = link.source === hoveredNodeId || link.target === hoveredNodeId;

        return lines.length && (
          <group key={`group-${index}`}>
            {/* Main line with hover effect */}
            <QuadraticBezierLine
              start={lines[index].start}
              end={lines[index].end}
              mid={lines[index].mid} // Straight line from start to end
              color={isHovered ? "lime" : config.edgeColor}
              dashed
              transparent={hoveredNodeId}
              opacity={0.5}
              dashScale={5}
              gapSize={80}
              lineWidth={isHovered ? 4 : 1}
            />
            {/* Secondary line for dimmed effect */}
            <QuadraticBezierLine
              start={lines[index].start}
              end={lines[index].end}
              mid={lines[index].mid}
              color={isHovered ? "lime" : config.edgeColor}
              transparent={hoveredNodeId}
              opacity={0.1}
              lineWidth={isHovered ? 4 : 0.5}
            />
          </group>
        );
      })}
    </group>
  );
};
