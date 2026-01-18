import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  ScrollControls, 
  Environment, 
  Sparkles,
  MeshDistortMaterial,
  Float as DreiFloat,
  Text
} from '@react-three/drei';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedShape = ({ 
  position, 
  color, 
  geometry = 'box', 
  scale = 1,
  timelineConfig = {}
}) => {
  const meshRef = useRef();
  const scroll = useScroll();
  
  const defaultConfig = {
    rotationDuration: 8,
    floatSpeed: 1.5,
    floatIntensity: 0.5,
    timelineRotation: { x: Math.PI, y: Math.PI * 2 }
  };
  
  const config = { ...defaultConfig, ...timelineConfig };
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;
    mesh.rotation.x += 0.005 * config.rotationDuration;
    mesh.rotation.y += 0.008 * config.rotationDuration;
    const offset = scroll.offset;
    mesh.rotation.x = offset * config.timelineRotation.x;
    mesh.rotation.y = offset * config.timelineRotation.y + (state.clock.elapsedTime * 0.2);
  });
  
  const getGeometry = () => {
    switch(geometry) {
      case 'sphere':
        return <sphereGeometry args={[scale, 32, 32]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[scale, 0]} />;
      case 'torus':
        return <torusGeometry args={[scale * 0.6, scale * 0.2, 16, 50]} />;
      case 'octahedron':
        return <octahedronGeometry args={[scale, 0]} />;
      default:
        return <boxGeometry args={[scale * 1.5, scale * 1.5, scale * 1.5]} />;
    }
  };
  
  return (
    <DreiFloat speed={config.floatSpeed} rotationIntensity={1} floatIntensity={config.floatIntensity} position={position}>
      <mesh ref={meshRef} scale={scale}>
        {getGeometry()}
        <MeshDistortMaterial color={color} envMapIntensity={0.5} clearcoat={1} clearcoatRoughness={0.1} metalness={0.6} roughness={0.3} distort={0.3} speed={2} />
      </mesh>
    </DreiFloat>
  );
};

const TimelineSection = ({ position, title, description, color, index }) => {
  const groupRef = useRef();
  const scroll = useScroll();
  
  useFrame(() => {
    if (!groupRef.current) return;
    const offset = scroll.offset;
  });
  
  return (
    <group ref={groupRef} position={position}>
      <Text position={[3, 0, 0]} fontSize={0.5} color={color} anchorX="left" anchorY="middle">
        {title}
      </Text>
      <Text position={[3, -0.8, 0]} fontSize={0.25} color="#ffffff" anchorX="left" anchorY="top" maxWidth={4}>
        {description}
      </Text>
    </group>
  );
};

const TimelineScene = ({ sections = [] }) => {
  const groupRef = useRef();
  const scroll = useScroll();
  
  const defaultSections = [
    { title: "Discovery", description: "Understanding your vision and requirements", color: "#ff6b00" },
    { title: "Design", description: "Creating stunning visuals and UX", color: "#3b82f6" },
    { title: "Development", description: "Building robust solutions", color: "#10b981" },
    { title: "Launch", description: "Deploying and optimizing performance", color: "#f59e0b" }
  ];
  
  const displaySections = sections.length > 0 ? sections : defaultSections;
  
  useFrame(() => {
    if (!groupRef.current) return;
    const offset = scroll.offset;
    groupRef.current.children.forEach((child, i) => {
      if (child.userData && child.userData.isShape) {
        const depth = (i - 2) * 0.5;
        child.position.z = THREE.MathUtils.lerp(child.position.z, depth + offset * 5, 0.1);
      }
    });
  });
  
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b00" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      <Environment preset="city" />
      <Sparkles count={50} scale={15} size={2} speed={0.3} opacity={0.4} color="#ff6b00" />
      <group ref={groupRef}>
        {displaySections.map((section, i) => (
          <group key={i} userData={{ isShape: true }}>
            <AnimatedShape position={[-2 + (i % 2) * 0.5, 0, i * 0.5]} color={section.color} geometry={['box', 'icosahedron', 'sphere', 'torus'][i % 4]} scale={0.6 + (i % 3) * 0.2} />
            <TimelineSection position={[1 + (i % 2), 0, i * 0.5]} title={section.title} description={section.description} color={section.color} index={i} />
          </group>
        ))}
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.4} />
      </mesh>
    </>
  );
};

const Timeline3D = ({ className = "w-full h-screen", sections = [], damping = 0.2, pages = 4 }) => {
  return (
    <div className={className}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ScrollControls pages={pages} damping={damping}>
          <TimelineScene sections={sections} />
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export { Timeline3D as default, AnimatedShape };
