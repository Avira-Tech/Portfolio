// import React, { useRef, Suspense } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import {
//   ScrollControls,
//   Scroll,
//   Float,
//   Environment,
//   PerspectiveCamera,
//   useScroll,
//   Sparkles,
//   Html
// } from '@react-three/drei';
// import * as THREE from 'three';

// const StudyHubModel = () => (
//   <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
//     <mesh>
//       <icosahedronGeometry args={[1, 0]} />
//       <meshStandardMaterial color="#3b82f6" wireframe />
//     </mesh>
//     <Sparkles count={20} scale={3} size={2} color="#3b82f6" />
//   </Float>
// );

// const SecurityModel = () => (
//   <Float speed={1.5} rotationIntensity={1}>
//     <group>
//       <mesh castShadow>
//         <boxGeometry args={[1.4, 1.4, 0.2]} />
//         <meshStandardMaterial color="#10b981" metalness={0.6} roughness={0.3} />
//       </mesh>
//       <mesh position={[0, 0, 0.2]}>
//         <torusGeometry args={[0.5, 0.02, 16, 50]} />
//         <meshBasicMaterial color="#34d399" />
//       </mesh>
//     </group>
//   </Float>
// );

// const StellarModel = () => (
//   <Float speed={1} floatIntensity={1}>
//     <mesh castShadow>
//       <octahedronGeometry args={[1.2, 0]} />
//       <meshStandardMaterial color="#ff6b00" emissive="#ff6b00" emissiveIntensity={0.3} />
//     </mesh>
//     <mesh scale={1.2}>
//       <sphereGeometry args={[1, 16, 16]} />
//       <meshBasicMaterial color="#ff6b00" wireframe transparent opacity={0.05} />
//     </mesh>
//   </Float>
// );

// const KrushiModel = () => (
//   <Float speed={1} floatIntensity={0.5}>
//     <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
//       <cylinderGeometry args={[1, 1, 0.2, 16]} />
//       <meshStandardMaterial color="#84cc16" roughness={0.8} />
//     </mesh>
//     <mesh position={[0, 0.4, 0]}>
//       <coneGeometry args={[0.25, 0.8, 6]} />
//       <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.2} />
//     </mesh>
//   </Float>
// );

// const PGModel = () => (
//   <Float speed={1.5} floatIntensity={0.3}>
//     <mesh castShadow>
//       <boxGeometry args={[1, 1.8, 1]} />
//       <meshStandardMaterial color="#ef4444" metalness={0.2} />
//     </mesh>
//     {[0.4, 0, -0.4].map((y, i) => (
//       <mesh key={i} position={[0, y, 0.51]}>
//         <planeGeometry args={[0.4, 0.2]} />
//         <meshStandardMaterial color="#fde047" emissive="#fde047" emissiveIntensity={0.8} />
//       </mesh>
//     ))}
//   </Float>
// );

// const InteriorModel = () => (
//   <Float rotationIntensity={1} speed={1}>
//     <mesh castShadow>
//       <torusKnotGeometry args={[0.6, 0.2, 64, 8]} />
//       <meshStandardMaterial color="#e11d48" metalness={0.7} roughness={0.2} />
//     </mesh>
//   </Float>
// );

// const Scene = () => {
//   const scroll = useScroll();
//   const groupRef = useRef();
//   // Use a ref to store the target position to avoid direct state mutation logic issues
//   const targetY = useRef(0);

//   useFrame((state) => {
//     if (!groupRef.current) return;

//     const offset = scroll.offset;
//     // Calculate target position: Move down (positive Y) as user scrolls down
//     // We multiply by a factor to cover the distance between projects
//     targetY.current = -offset * 25;

//     // Smoothly interpolate current position to target position
//     groupRef.current.position.y = THREE.MathUtils.lerp(
//       groupRef.current.position.y,
//       targetY.current,
//       0.08
//     );

//     state.camera.lookAt(0, 0, 0);
//   });

//   const projects = [
//     { model: <StudyHubModel />, pos: [0, 0, 0] },
//     { model: <SecurityModel />, pos: [0, -5, 0] },
//     { model: <StellarModel />, pos: [0, -10, 0] },
//     { model: <KrushiModel />, pos: [0, -15, 0] },
//     { model: <PGModel />, pos: [0, -20, 0] },
//     { model: <InteriorModel />, pos: [0, -25, 0] },
//   ];

//   return (
//     <group ref={groupRef}>
//       {projects.map((p, i) => (
//         <group key={i} position={p.pos}>
//           {p.model}
//           <pointLight position={[0, -0.5, 0]} intensity={1} distance={4} color="white" />
//         </group>
//       ))}

//       {/* Background Plane */}
//       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -12.5, -5]}>
//         <planeGeometry args={[30, 50]} />
//         <meshStandardMaterial color="#050505" metalness={0.3} roughness={0.8} />
//       </mesh>
//     </group>
//   );
// };

// const FullPortfolio = () => {
//   const projectInfo = [
//     { title: "Study Hub", category: "EDTECH", color: "from-blue-400 to-indigo-600" },
//     { title: "RFID Security", category: "IOT", color: "from-emerald-400 to-teal-600" },
//     { title: "Stellar Campus", category: "CLOUD", color: "from-orange-400 to-red-600" },
//     { title: "KrushiMitra", category: "AGRI", color: "from-lime-400 to-green-600" },
//     { title: "Nagesh PG", category: "LIVING", color: "from-red-400 to-pink-600" },
//     { title: "Interior Design", category: "ART", color: "from-rose-400 to-purple-600" },
//   ];

//   return (
//     <div style={{ width: '100%', height: '100%', background: '#000' }}>
//       <Canvas shadows dpr={[1, 2]}>
//         <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
//         <Environment preset="night" />

//         <ambientLight intensity={0.2} />
//         <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />

//         <Suspense fallback={<Html center className="text-white font-mono tracking-widest uppercase">Loading...</Html>}>
//           <ScrollControls pages={6} damping={0.2} horizontal={false}>
            
//             <Scene />

//             <Scroll html>
//               <div style={{ width: '100vw' }}>
//                 {projectInfo.map((info, i) => (
//                   <section key={i} className="h-screen flex items-center justify-start px-8 md:px-16 select-none">
//                     <div className="group relative max-w-lg p-1 bg-gradient-to-br from-white/20 to-transparent rounded-[2.5rem] transition-all duration-500 hover:scale-[1.02]">
//                       <div className="bg-black/80 backdrop-blur-2xl p-8 rounded-[2.4rem] border border-white/10 shadow-2xl">
//                         <span className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase mb-4 block">
//                           Project 0{i + 1} // {info.category}
//                         </span>
//                         <h1 className={`text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${info.color} mb-4 uppercase tracking-tighter italic`}>
//                           {info.title}
//                         </h1>
//                         <p className="text-white/60 text-base leading-relaxed font-light mb-8">
//                           A high-performance solution tailored for scalability, featuring seamless 3D integration.
//                         </p>
//                         <div className="flex gap-4">
//                           <button className="flex-1 px-6 py-3 bg-white text-black text-sm font-bold rounded-2xl hover:bg-orange-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-xl">
//                             VIEW CASE
//                           </button>
//                           <button className="px-6 py-3 border border-white/20 text-white text-sm font-bold rounded-2xl hover:border-white transition-all">
//                             LIVE
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </section>
//                 ))}
//               </div>
//             </Scroll>
//           </ScrollControls>
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// };

// export default FullPortfolio;

import React, { useRef, Suspense } from 'react';
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

// --- 2. Scene Orchestration ---

const Scene = () => {
  const scroll = useScroll();
  const groupRef = useRef();
  const targetY = useRef(0);

  // Background colors mapped to sections
  const colors = ["#080808", "#051510", "#150d05", "#0d1505", "#150505", "#150510"];

  useFrame((state) => {
    if (!groupRef.current) return;

    const offset = scroll.offset; // 0 to 1
    
    // Crucial Fix: targetY must span the entire height of the project stack (5 gaps of 8 units = 40)
    targetY.current = offset * 40; 

    // Smooth lerp for position (Moving the group UP as we scroll DOWN)
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY.current,
      0.1
    );

    // Smooth color transition
    const colorIndex = Math.min(Math.floor(offset * colors.length), colors.length - 1);
    state.scene.background.lerp(new THREE.Color(colors[colorIndex]), 0.05);

    state.camera.lookAt(0, 0, 0);
  });

  // Positioned at intervals of 8 units
  const projects = [
    { model: <StudyHubModel />, pos: [2, 0, 0] },
    { model: <SecurityModel />, pos: [-2, -8, 0] },
    { model: <StellarModel />, pos: [2, -16, 0] },
    { model: <KrushiModel />, pos: [-2, -24, 0] },
    { model: <PGModel />, pos: [2, -32, 0] },
    { model: <InteriorModel />, pos: [0, -40, 0] }, // Last item at exactly -40
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
  const projectInfo = [
    { title: "Study Hub", category: "EDTECH", color: "from-blue-400 to-indigo-600", desc: "Revolutionizing digital learning with interactive 3D modules and real-time collaboration." },
    { title: "RFID Security", category: "IOT", color: "from-emerald-400 to-teal-600", desc: "Enterprise-grade access control systems integrated with smart cloud infrastructure." },
    { title: "Stellar Campus", category: "CLOUD", color: "from-orange-400 to-red-600", desc: "A comprehensive management ecosystem for modern educational institutions." },
    { title: "KrushiMitra", category: "AGRI", color: "from-lime-400 to-green-600", desc: "Data-driven agricultural platform empowering farmers with AI crop insights." },
    { title: "Nagesh PG", category: "LIVING", color: "from-red-400 to-pink-600", desc: "Modern co-living management software designed for seamless urban experiences." },
    { title: "Interior Design", category: "ART", color: "from-rose-400 to-purple-600", desc: "Visualizing architectural beauty through cutting-edge 3D rendering technology." },
  ];

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      {/* Fixed Sidebar Progress */}
      <div className="fixed left-12 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-8">
        {projectInfo.map((_, i) => (
          <div key={i} className="group flex items-center gap-6 cursor-pointer">
            <div className="h-[2px] w-6 bg-white/10 group-hover:w-12 group-hover:bg-primary transition-all duration-500" />
            <span className="text-[10px] font-mono tracking-tighter text-white/20 group-hover:text-white">0{i+1}</span>
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
            <Scene />
            
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