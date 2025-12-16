import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import { ReportSection } from "@/data/reportContent";
import { Satellite } from "./Satellite";

interface PlanetProps {
  section: ReportSection;
  onClick: () => void;
  isActive: boolean;
  index: number;
}

export const Planet = ({ section, onClick, isActive, index }: PlanetProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const baseSize = useMemo(() => (index === 0 ? 1.5 : 0.8 + index * 0.1), [index]);

  // Generate satellites for each planet
  const satellites = useMemo(() => {
    if (index === 0) return []; // No satellites for the sun
    const count = 1 + (index % 3);
    return Array.from({ length: count }, (_, i) => ({
      orbitRadius: baseSize + 0.5 + i * 0.4,
      speed: 0.5 + i * 0.3,
      size: 0.05 + Math.random() * 0.03,
      color: section.color,
      offset: (i * Math.PI * 2) / count,
    }));
  }, [index, baseSize, section.color]);

  useFrame((state) => {
    // Floating animation - apply to the whole group so satellites follow
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = section.position[1] + Math.sin(time * 0.5 + index) * 0.2;
    }

    // Planet rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  // Glow intensity based on state
  const glowIntensity = hovered || isActive ? 3 : 2;
  const lightIntensity = index === 0 ? 4 : 2;

  return (
    <group
      ref={groupRef}
      position={[section.position[0], section.position[1], section.position[2]]}>
      {/* Point light for bloom/glow effect */}
      <pointLight
        color={section.color}
        intensity={lightIntensity * (hovered || isActive ? 1.5 : 1)}
        distance={baseSize * 10}
        decay={2}
      />

      <Sphere
        ref={meshRef}
        args={[baseSize, 64, 64]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}>
        <meshStandardMaterial
          color={section.color}
          emissive={section.color}
          emissiveIntensity={glowIntensity}
          roughness={0.2}
          metalness={0.1}
          toneMapped={false}
        />
      </Sphere>

      {/* Satellites orbiting the planet */}
      {satellites.map((sat, i) => (
        <Satellite key={i} {...sat} />
      ))}

      {/* Planet ring for the sun */}
      {index === 0 && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2, 2.8, 64]} />
          <meshBasicMaterial
            color={section.color}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* Label */}
      <Html
        position={[0, baseSize + 0.8, 0]}
        center
        style={{
          opacity: hovered || isActive ? 1 : 0.7,
          transition: "all 0.3s ease",
          pointerEvents: "none",
        }}>
        <div className="text-center whitespace-nowrap">
          <p
            className="font-display text-lg font-semibold px-3 py-1 rounded-full glass-panel"
            style={{
              color: section.color,
              textShadow: `0 0 20px ${section.color}`,
            }}>
            {section.title}
          </p>
          {hovered && (
            <p className="text-xs text-muted-foreground mt-1 animate-fade-in">
              Klicka för att utforska
            </p>
          )}
        </div>
      </Html>
    </group>
  );
};
