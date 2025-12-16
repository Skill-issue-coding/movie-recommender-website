import { useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { Planet } from "./Planet";
import { Stars } from "./Stars";
import { Asteroids } from "./Asteroids";
import { SpaceStation } from "./SpaceStation";
import { reportSections, ReportSection } from "@/data/reportContent";

interface SceneContentProps {
  onPlanetClick: (section: ReportSection) => void;
  activeSection: string | null;
  targetSection: string | null;
}

const SceneContent = ({ onPlanetClick, activeSection, targetSection }: SceneContentProps) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const targetPosition = useRef(new THREE.Vector3(0, 2, 15));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (targetSection) {
      const section = reportSections.find((s) => s.id === targetSection);
      if (section) {
        const [x, y, z] = section.position;
        targetPosition.current.set(x + 4, y + 2, z + 6);
        targetLookAt.current.set(x, y, z);
      }
    } else {
      targetPosition.current.set(0, 2, 15);
      targetLookAt.current.set(0, 0, 0);
    }
  }, [targetSection]);

  useFrame(() => {
    camera.position.lerp(targetPosition.current, 0.02);

    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt.current, 0.02);
      controlsRef.current.update();
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 15]} fov={60} />
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={50}
        zoomSpeed={0.5}
        rotateSpeed={0.5}
      />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#E8A838" distance={30} />
      <pointLight position={[10, 5, -10]} intensity={0.8} color="#3B82F6" />
      <pointLight position={[-10, -5, -15]} intensity={0.8} color="#A855F7" />

      {/* Stars */}
      <Stars />

      {/* Asteroids belt */}
      <Asteroids />

      {/* Space stations */}
      <SpaceStation position={[4, 4, -3]} />
      <SpaceStation position={[-8, -3, -10]} />
      <SpaceStation position={[12, 1, -8]} />

      {/* Nebula effect */}
      <mesh position={[0, 0, -50]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial color="#1a0a2e" transparent opacity={0.3} />
      </mesh>

      {/* Planets */}
      {reportSections.map((section, index) => (
        <Planet
          key={section.id}
          section={section}
          index={index}
          isActive={activeSection === section.id}
          onClick={() => onPlanetClick(section)}
        />
      ))}

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={3.5}
          luminanceThreshold={0.05}
          luminanceSmoothing={0.4}
          mipmapBlur
          radius={0.9}
        />
        <DepthOfField focusDistance={0.01} focalLength={0.05} bokehScale={2} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0005, 0.0005)}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette offset={0.3} darkness={0.7} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </>
  );
};

interface SpaceSceneProps {
  onPlanetClick: (section: ReportSection) => void;
  activeSection: string | null;
  targetSection: string | null;
}

export const SpaceScene = ({ onPlanetClick, activeSection, targetSection }: SpaceSceneProps) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        style={{ background: "linear-gradient(to bottom, #050510, #0a0a20, #0f0520)" }}>
        <SceneContent
          onPlanetClick={onPlanetClick}
          activeSection={activeSection}
          targetSection={targetSection}
        />
      </Canvas>
    </div>
  );
};
