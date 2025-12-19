import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const generateAsteroids = (count: number) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 18 + Math.random() * 8;
    items.push({
      position: [
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4,
        Math.sin(angle) * radius - 8,
      ] as [number, number, number],
      size: 0.05 + Math.random() * 0.15,
      speed: 0.1 + Math.random() * 0.2,
      rotationSpeed: Math.random() * 0.02,
    });
  }
  return items;
};

export const Asteroids = () => {
  const groupRef = useRef<THREE.Group>(null);

  const asteroids = useMemo(() => generateAsteroids(40), []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0003;
    }
  });

  return (
    <group ref={groupRef}>
      {asteroids.map((asteroid, i) => (
        <AsteroidRock key={i} {...asteroid} index={i} />
      ))}
    </group>
  );
};

interface AsteroidRockProps {
  position: [number, number, number];
  size: number;
  speed: number;
  rotationSpeed: number;
  index: number;
}

const AsteroidRock = ({
  position,
  size,
  rotationSpeed,
  index,
}: AsteroidRockProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 0.7;

      // Subtle floating motion
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y =
        position[1] + Math.sin(time * 0.5 + index) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <dodecahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color="#4a4a5a" roughness={0.9} metalness={0.1} />
    </mesh>
  );
};
