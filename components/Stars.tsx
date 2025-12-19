import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const generateStarData = (count: number) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const radius = 50 + Math.random() * 100;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    // Warm to cool star colors
    const colorChoice = Math.random();
    if (colorChoice > 0.8) {
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 0.9;
      colors[i * 3 + 2] = 0.7;
    } else if (colorChoice > 0.5) {
      colors[i * 3] = 0.8;
      colors[i * 3 + 1] = 0.85;
      colors[i * 3 + 2] = 1;
    } else {
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 1;
    }
  }

  return { positions, colors };
};

export const Stars = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => generateStarData(3000), []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0001;
      pointsRef.current.rotation.x += 0.00005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};
