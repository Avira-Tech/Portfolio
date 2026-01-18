import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Float, 
  Stars, 
  ContactShadows,
  Sparkles
} from '@react-three/drei';
// Removed expensive post-processing imports for performance

const FloatingShape = ({ position, color, geometry = 'icosahedron', scale = 1, speed = 1 }) => {
  const meshRef = useRef();

  return (
    <Float speed={speed * 2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
        {geometry === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        
        <meshStandardMaterial 
          color={color} 
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
};

const InteractiveCube = ({ position }) => (
  <mesh position={position} scale={1.2}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#ff6b00" metalness={0.8} roughness={0.2} />
  </mesh>
);

const SceneContent = () => (
  <>
    <ambientLight intensity={0.25} />
    <pointLight position={[10, 10, 10]} intensity={0.8} color="#ff6b00" />
    <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3b82f6" />
    
    <Environment preset="city" />
    
    {/* Optimized: Reduced particle counts significantly */}
    <Stars radius={100} depth={50} count={500} factor={4} fade speed={1} />
    <Sparkles count={30} scale={8} size={2} speed={0.3} opacity={0.4} color="#ff6b00" />

    <InteractiveCube position={[2, 0, -2]} />
    <FloatingShape position={[-2, 0.5, -2]} color="#3b82f6" geometry="icosahedron" speed={1} />
    <FloatingShape position={[0, -1, -3]} color="#10b981" geometry="box" scale={0.8} speed={1.5} />

    <ContactShadows position={[0, -3, 0]} opacity={0.3} scale={15} blur={1.5} far={3} />
    
    {/* Removed expensive EffectComposer with Bloom, Noise, Vignette for performance */}
    
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
  </>
);

const Scene3D = ({ className = "absolute inset-0 z-0", cameraPosition = [0, 0, 8] }) => (
  <div className={className}>
    <Canvas 
      camera={{ position: cameraPosition, fov: 45 }} 
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} 
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  </div>
);

export default Scene3D;

