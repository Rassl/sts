import { Box, Edges, Text } from "@react-three/drei";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import { useControls } from "leva";
import { useRef } from "react";
import { Color } from "three";
import { nodes } from "../data";

const color = new Color(0x16171d);

export const positions = [
  [5, 5, 5],
  [10, 10, 5],
  [5, -5, 5],
  [5, 5, -5],
  [5, -5, -5],
  [-5, 5, -5],
  [-5, -5, -5],
];

export const Cubes = () => {
  // Create an array of refs for each cube
  const refs = useRef(nodes.map(() => useRef(null)));

  const config = useControls({
    autoRotate: true,
    blur: false,
    edgeStrength: { value: 1, min: 0, max: 10 },
    visibleEdgeColor: "white",
    hiddenEdgeColor: "white",
  });

  // Collect only valid refs (non-null) for easy reuse
  const validRefs = refs.current.map((ref) => ref.current).filter(Boolean);

  return (
    <>
      {nodes
        .filter((i) => i.id !== 10)
        .map((node, index) => (
          <mesh ref={refs.current[index]} key={index} position={node.position}>
            <Text fontSize={0.5} anchorX="center" anchorY="middle">
              {node.id} {/* Assuming `i.id` should be `node.id` here */}
            </Text>
            <boxGeometry />
            <meshBasicMaterial attachArray="material" color={color} />
            <Edges color="#9A9CA5" lineWidth={1} />
          </mesh>
        ))}

      <EffectComposer autoClear={false}>
        {/* Apply the first outline to all cubes except the first one */}
        {/* {validRefs.length > 1 && (
          <Outline
            selection={validRefs.slice(1)} // Apply to all refs except the first one
            blur={config.blur}
            visibleEdgeColor={config.visibleEdgeColor}
            hiddenEdgeColor={config.hiddenEdgeColor}
            edgeStrength={config.edgeStrength}
          />
        )} */}
        {/* Apply a second outline to only the first cube */}
        {validRefs.length > 0 && (
          <Outline
            selection={[validRefs[0]]} // Apply only to the first ref
            blur={config.blur}
            visibleEdgeColor="lime"
            hiddenEdgeColor={config.hiddenEdgeColor}
            edgeStrength={2}
          />
        )}
      </EffectComposer>
    </>
  );
};
