import React, { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ScrollControls,
  Scroll,
  Float,
  Environment,
  PerspectiveCamera,
  useScroll,
  Sparkles,
  Html,
  ContactShadows,
} from '@react-three/drei';
import * as THREE from 'three';

// --- 1. 3D Model Components ---

const StudyHubModel = () => (
  <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
    <mesh castShadow>
      <icosahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial color="#3b82f6" roughness={0.1} metalness={0.8} transmission={0.5} thickness={0.5} wireframe />
    </mesh>
    <Sparkles count={40} scale={4} size={3} color="#3b82f6" speed={0.5} />
  </Float>
);

const SecurityModel = () => (
  <Float speed={1.5} rotationIntensity={1}>
    <group>
      <mesh castShadow>
        <boxGeometry args={[1.4, 1.4, 0.2]} />
        <meshStandardMaterial color="#10b981" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.15]}>
        <torusGeometry args={[0.4, 0.02, 16, 50]} />
        <meshBasicMaterial color="#34d399" />
      </mesh>
    </group>
  </Float>
);

const StellarModel = () => (
  <Float speed={2} floatIntensity={1}>
    <mesh castShadow>
      <octahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial color="#ff6b00" emissive="#ff6b00" emissiveIntensity={0.5} />
    </mesh>
    <mesh scale={1.4}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#ff6b00" wireframe transparent opacity={0.1} />
    </mesh>
  </Float>
);

const KrushiModel = () => (
  <Float speed={1.5} floatIntensity={0.5}>
    <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[1, 1, 0.2, 32]} />
      <meshStandardMaterial color="#84cc16" roughness={0.8} />
    </mesh>
    <mesh position={[0, 0.5, 0]}>
      <coneGeometry args={[0.3, 0.8, 6]} />
      <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} />
    </mesh>
  </Float>
);

const PGModel = () => (
  <Float speed={1.5} floatIntensity={0.3}>
    <mesh castShadow>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="#ef4444" metalness={0.4} roughness={0.2} />
    </mesh>
    {[0.5, 0, -0.5].map((y, i) => (
      <mesh key={i} position={[0, y, 0.51]}>
        <planeGeometry args={[0.4, 0.2]} />
        <meshStandardMaterial color="#fde047" emissive="#fde047" emissiveIntensity={1} />
      </mesh>
    ))}
  </Float>
);

const InteriorModel = () => (
  <Float rotationIntensity={2} speed={1.5}>
    <mesh castShadow>
      <torusKnotGeometry args={[0.6, 0.2, 128, 16]} />
      <meshStandardMaterial color="#e11d48" metalness={0.9} roughness={0.1} />
    </mesh>
  </Float>
);

const VedaModel = () => (
  <Float speed={2} rotationIntensity={1} floatIntensity={0.8}>
    <group>
      {/* Laptop base */}
      <mesh castShadow>
        <boxGeometry args={[2, 0.1, 1.2]} />
        <meshStandardMaterial color="#6366f1" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Laptop screen */}
      <mesh position={[0, 0.6, -0.3]} rotation={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[1.8, 1.2, 0.05]} />
        <meshStandardMaterial color="#1e1b4b" emissive="#1e1b4b" emissiveIntensity={0.2} />
      </mesh>
      {/* Screen content (simple grid) */}
      <mesh position={[0, 0.6, -0.25]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#a78bfa" wireframe />
      </mesh>
    </group>
    <Sparkles count={30} scale={3} size={2} color="#6366f1" speed={0.3} />
  </Float>
);

// --- 2. Scene Orchestration ---

const Scene = ({ currentSection, setActiveSection }) => {
  const scroll = useScroll();
  const groupRef = useRef();
  const targetY = useRef(0);

  // Background colors mapped to sections (added one more for Veda Curate)
  const colors = ["#080808", "#051510", "#150d05", "#0d1505", "#150505", "#150510", "#0a0a0a"];

  useFrame((state) => {
    if (!groupRef.current) return;

    const offset = scroll.offset; // 0 to 1
    
    // If currentSection is set (from click), use it to calculate targetY, else use scroll offset
    const effectiveOffset = currentSection !== null ? currentSection / 6 : offset; // 6 intervals for 7 sections
    
    // Move group down (negative Y) as user scrolls down to bring projects into view
    targetY.current = -effectiveOffset * 48; // Adjusted for 7 projects (6 intervals of 8 = 48)

    // Smooth lerp for position
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY.current,
      0.1
    );

    // Smooth color transition
    const colorIndex = Math.min(Math.floor(effectiveOffset * colors.length), colors.length - 1);
    state.scene.background.lerp(new THREE.Color(colors[colorIndex]), 0.05);

    // Calculate and set active section
    const sectionIndex = Math.min(Math.floor(effectiveOffset * 7), 6);
    setActiveSection(sectionIndex);

    state.camera.lookAt(0, 0, 0);
  });

  // Positioned at intervals of 8 units, alternating left/right consistently
  const projects = [
    { model: <StudyHubModel />, pos: [2, 0, 0] },   // Right for justify-start
    { model: <SecurityModel />, pos: [-2, 8, 0] },  // Left for justify-end
    { model: <StellarModel />, pos: [2, 16, 0] },   // Right for justify-start
    { model: <KrushiModel />, pos: [-2, 24, 0] },   // Left for justify-end
    { model: <PGModel />, pos: [2, 32, 0] },        // Right for justify-start
    { model: <InteriorModel />, pos: [-2, 40, 0] }, // Left for justify-end
    { model: <VedaModel />, pos: [2, 48, 0] },      // Right for justify-start
  ];

  return (
    <group ref={groupRef}>
      <ContactShadows opacity={0.5} scale={20} blur={2.5} far={4.5} />
      {projects.map((p, i) => (
        <group key={i} position={p.pos}>
          {p.model}
          <pointLight position={[2, 2, 2]} intensity={5} color="white" />
          <pointLight position={[-2, -2, -2]} intensity={2} color="white" />
        </group>
      ))}
    </group>
  );
};

// --- 3. Main Viewer Component ---

const Project3DViewer = () => {
  const [currentSection, setCurrentSection] = useState(null); // State to track clicked section
  const [activeSection, setActiveSection] = useState(0); // State to track active section for highlighting

  const projectInfo = [
    { title: "Future Study-Hub", category: "EDTECH", color: "from-blue-400 to-indigo-600", desc: "Revolutionizing digital learning with interactive 3D modules and real-time collaboration." },
    { title: "RFID Security", category: "IOT", color: "from-emerald-400 to-teal-600", desc: "Enterprise-grade access control systems integrated with smart cloud infrastructure." },
    { title: "Stellar Campus", category: "CLOUD", color: "from-orange-400 to-red-600", desc: "A comprehensive management ecosystem for modern educational institutions." },
    { title: "Krushi Mitra", category: "AGRI", color: "from-lime-400 to-green-600", desc: "Data-driven agricultural platform empowering farmers with AI crop insights." },
    { title: "Nagesh PG", category: "LIVING", color: "from-red-400 to-pink-600", desc: "Modern co-living management software designed for seamless urban experiences." },
    { title: "Interior Design", category: "ART", color: "from-rose-400 to-purple-600", desc: "Visualizing architectural beauty through cutting-edge 3D rendering technology." },
    { title: "Veda Curate", category: "WEBDEV", color: "from-purple-400 to-blue-600", desc: "The project features modern UI design with integrated 3D models for an immersive user experience, and it is fully deployed online using a cloud hosting platform. The site serves as a professional service platform showcasing creative branding, design, and web development offerings." },
  ];

  // Function to set current section for programmatic scrolling
  const scrollToCaseStudy = (index) => {
    setCurrentSection(index);
    // Reset after animation to allow normal scrolling
    setTimeout(() => setCurrentSection(null), 1500); // 1.5s to match lerp
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      {/* Fixed Sidebar Progress */}
      <div className="fixed left-12 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-8">
        {projectInfo.map((_, i) => (
          <div
            key={i}
            className="group flex items-center gap-6 cursor-pointer"
            onClick={() => scrollToCaseStudy(i)} // Scroll to the case study section
          >
            <div className={`h-[2px] transition-all duration-500 ${i === activeSection ? 'w-12 bg-primary' : 'w-6 bg-white/10 group-hover:w-12 group-hover:bg-primary'}`} />
            <span className={`text-[10px] font-mono tracking-tighter transition-all duration-500 ${i === activeSection ? 'text-white' : 'text-white/20 group-hover:text-white'}`}>0{i+1}</span>
          </div>
        ))}
      </div>

      <Canvas 
        shadows 
        dpr={[1, 2]} 
        onCreated={(state) => (state.scene.background = new THREE.Color('#080808'))}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={35} />
        <Environment preset="city" />
        <ambientLight intensity={0.4} />
        
        <Suspense fallback={<Html center className="text-white font-mono tracking-widest text-xs uppercase animate-pulse">Syncing Assets...</Html>}>
          <ScrollControls pages={projectInfo.length} damping={0.2}>
            <Scene currentSection={currentSection} setActiveSection={setActiveSection} />
            
            <Scroll html>
              <div className="w-screen">
                {projectInfo.map((info, i) => (
                  <section key={i} className={`h-screen flex items-center px-10 md:px-40 ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className="max-w-2xl relative">
                      {/* Background Category Text */}
                      <h2 className="absolute -top-32 -left-20 text-[15rem] font-black text-white/[0.02] select-none pointer-events-none uppercase italic leading-none">
                        {info.category}
                      </h2>
                      
                      <div className="relative z-10 space-y-8">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-[1px] bg-primary" />
                          <span className="text-[10px] font-mono tracking-[0.6em] text-white/50 uppercase">
                            Case Study 0{i+1}
                          </span>
                        </div>

                        <h1 className={`text-7xl md:text-[9rem] font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br ${info.color} uppercase italic`}>
                          {info.title.split(' ')[0]} <br />
                          <span className="text-white not-italic">{info.title.split(' ')[1] || ""}</span>
                        </h1>

                        <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-md border-l-2 border-primary/20 pl-8">
                          {info.desc}
                        </p>

                        <div className="flex gap-8 pt-6">
                          <button className="group relative px-10 py-5 bg-white text-black font-black text-xs tracking-widest rounded-full overflow-hidden transition-all">
                            <span className="relative z-10">VIEW PROJECT</span>
                            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                          </button>
                          <button className="px-10 py-5 border border-white/10 text-white font-black text-xs tracking-widest rounded-full hover:bg-white/5 transition-all">
                            LIVE
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Project3DViewer;