// // import { motion, useScroll, useTransform } from 'framer-motion';
// // import { ArrowRight, ChevronDown } from 'lucide-react';
// // import { Link } from 'react-router-dom';
// // import Particles from './Particles';
// // import Magnetic from './Magnetic';

// // const Hero = () => {
// //   const { scrollY } = useScroll();
  
// //   const title = "Delivering High-Quality Digital Solutions for Modern Businesses";
// //   const words = title.split(" ");

// //   return (
// //     <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
// //       <Particles />
      
// //       {/* Background Elements */}
// //       <div className="absolute inset-0 bg-dark overflow-hidden -z-10">
// //         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(18,18,18,0.9),_#121212)] z-10"></div>
        
// //         {/* Animated Gradient Orbs */}
// //         <motion.div 
// //           animate={{ 
// //             scale: [1, 1.2, 1],
// //             rotate: [0, 90, 0],
// //             opacity: [0.3, 0.5, 0.3]
// //           }}
// //           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// //           className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px]"
// //         ></motion.div>
        
// //         <motion.div 
// //           animate={{ 
// //             scale: [1, 1.3, 1],
// //             rotate: [0, -60, 0],
// //             opacity: [0.2, 0.4, 0.2]
// //           }}
// //           transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
// //           className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]"
// //         ></motion.div>
// //       </div>
      
// //       {/* Grid Pattern Overlay */}
// //       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 pointer-events-none"></div>

// //       <div className="container mx-auto px-6 relative z-20 text-center">
// //         <motion.div
// //           initial={{ opacity: 0, y: 30 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.8, ease: "easeOut" }}
// //         >
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ delay: 0.2, duration: 0.5 }}
// //           >
// //             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 hover:border-primary/50 transition-colors group cursor-default">
// //               <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
// //               <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Available for new projects</span>
// //             </div>
// //           </motion.div>
          
// //           <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-8 leading-tight tracking-tighter flex flex-wrap justify-center gap-x-4 gap-y-2">
// //             {words.map((word, i) => (
// //               <motion.span
// //                 key={i}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 0.1 * i, duration: 0.5 }}
// //                 className={word === "Digital" || word === "Solutions" ? "text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-400" : ""}
// //               >
// //                 {word}
// //               </motion.span>
// //             ))}
// //           </h1>
          
// //           <motion.p 
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ delay: 1.2, duration: 0.8 }}
// //             className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
// //           >
// //             Delivering excellence through innovative solutions tailored to your business needs.
// //           </motion.p>

// //           <motion.div 
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 1.4, duration: 0.5 }}
// //             className="flex flex-col md:flex-row gap-6 justify-center items-center"
// //           >
// //             <Magnetic>
// //               <a href="#projects" className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-orange-600 transition-colors flex items-center gap-2 group">
// //                 View Projects
// //                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
// //               </a>
// //             </Magnetic>
            
// //             <Magnetic>
// //               <a href="#contact" className="px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition-colors">
// //                 Contact Us
// //               </a>
// //             </Magnetic>
// //           </motion.div>
// //         </motion.div>
// //       </div>

// //       <motion.div 
// //         style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
// //         className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
// //       >
// //         <ChevronDown size={24} />
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default Hero;

// import { motion, useScroll, useTransform } from 'framer-motion';
// import { ArrowRight, ChevronDown } from 'lucide-react';
// import Particles from './Particles';
// import Magnetic from './Magnetic';

// const Hero = () => {
//   const { scrollY } = useScroll();

//   const title = "Delivering High-Quality Digital Solutions for Modern Businesses";
//   const words = title.split(" ");

//   const fullStackIcons = [
//     { name: "React", emoji: "⚛️" },
//     { name: "Node", emoji: "🟢" },
//     { name: "Docker", emoji: "🐳" },
//     { name: "AWS", emoji: "☁️" }
//   ];

//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
//       <Particles />

//       {/* Background Elements */}
//       <div className="absolute inset-0 bg-dark overflow-hidden -z-10">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(18,18,18,0.9),_#121212)] z-10"></div>

//         {/* Animated Gradient Orbs */}
//         <motion.div 
//           animate={{ 
//             scale: [1, 1.2, 1],
//             rotate: [0, 90, 0],
//             opacity: [0.3, 0.5, 0.3]
//           }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px]"
//         ></motion.div>

//         <motion.div 
//           animate={{ 
//             scale: [1, 1.3, 1],
//             rotate: [0, -60, 0],
//             opacity: [0.2, 0.4, 0.2]
//           }}
//           transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
//           className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]"
//         ></motion.div>

//         {/* Left Side: Apple Code Snippet */}
//         <motion.div
//           initial={{ x: -200, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 1.2, delay: 0.5 }}
//           className="absolute top-1/4 left-10 w-48 h-64 bg-[#1e1e1e] rounded-lg p-4 text-xs font-mono text-green-400 shadow-lg border border-green-600/30 backdrop-blur-sm"
//         >
//           <pre>
//             {`function helloWorld() {
//   console.log("Hello World!");
// }

// const add = (a, b) => a + b;

// export default helloWorld;`}
//           </pre>
//         </motion.div>

//         {/* Right Side: Full-Stack Tool Icons in Circle */}
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
//           className="absolute top-1/3 right-10 w-48 h-48 rounded-full flex items-center justify-center"
//         >
//           {fullStackIcons.map((icon, i) => (
//             <motion.div
//               key={i}
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 translateX: "-50%",
//                 translateY: "-50%",
//                 rotate: `${i * (360 / fullStackIcons.length)}deg`,
//               }}
//               animate={{ rotate: [0, 360] }}
//               transition={{ repeat: Infinity, duration: 10 + i * 2, ease: "linear" }}
//             >
//               <div className="text-2xl">{icon.emoji}</div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Grid Pattern Overlay */}
//         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 pointer-events-none"></div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-6 relative z-20 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 hover:border-primary/50 transition-colors group cursor-default">
//               <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
//               <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Available for new projects</span>
//             </div>
//           </motion.div>

//           <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-8 leading-tight tracking-tighter flex flex-wrap justify-center gap-x-4 gap-y-2">
//             {words.map((word, i) => (
//               <motion.span
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 * i, duration: 0.5 }}
//                 className={word === "Digital" || word === "Solutions" ? "text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-400" : ""}
//               >
//                 {word}
//               </motion.span>
//             ))}
//           </h1>

//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.2, duration: 0.8 }}
//             className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
//           >
//             Delivering excellence through innovative solutions tailored to your business needs.
//           </motion.p>

//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.4, duration: 0.5 }}
//             className="flex flex-col md:flex-row gap-6 justify-center items-center"
//           >
//             <Magnetic>
//               <a href="#projects" className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-orange-600 transition-colors flex items-center gap-2 group">
//                 View Projects
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </a>
//             </Magnetic>

//             <Magnetic>
//               <a href="#contact" className="px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition-colors">
//                 Contact Us
//               </a>
//             </Magnetic>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div 
//         style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
//         className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
//       >
//         <ChevronDown size={24} />
//       </motion.div>
//     </div>
//   );
// };

// export default Hero;

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Code2, Cpu, Database, Globe, Layers, Layout } from 'lucide-react';
import Particles from './Particles';
import Magnetic from './Magnetic';

const Hero = () => {
  const { scrollY } = useScroll();
  const title = "Delivering High-Quality Digital Solutions for Modern Businesses";
  const words = title.split(" ");

  // Full-stack tools for the right-side orbit
  const stackIcons = [
    { Icon: Globe, color: "#FF5733" },
    { Icon: Database, color: "#ffffff" },
    { Icon: Cpu, color: "#FF5733" },
    { Icon: Layout, color: "#ffffff" },
    { Icon: Layers, color: "#FF5733" },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121212]">
      <Particles />
      
      {/* Background Orbs with Logo Colors */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FF5733]/20 rounded-full blur-[120px]"
        />
      </div>

      {/* --- LEFT SIDE: Apple-style Code Snippet --- */}
      {/* <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="hidden lg:block absolute left-10 w-80 z-20"
      >
        <div className="bg-[#1e1e1e]/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          <div className="flex gap-1.5 p-3 border-b border-white/5 bg-white/5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="p-4 font-mono text-xs leading-relaxed text-gray-300">
            <p className="text-[#FF5733]">import</p> <p className="text-white inline">{`{ Avira }`}</p> <p className="text-[#FF5733] inline">from</p> <p className="text-green-400 inline">'tech'</p>
            <p className="mt-2 text-blue-400">const</p> <p className="text-white inline">Project = () =&gt; {"{"}</p>
            <p className="ml-4 text-gray-400">status: <span className="text-yellow-400">'Building...'</span></p>
            <p className="ml-4 text-gray-400">stack: [<span className="text-orange-300">'React', 'Node'</span>]</p>
            <p className="text-white">{"}"}</p>
          </div>
        </div>
      </motion.div> */}
<motion.div 
  initial={{ x: -100, opacity: 0 }}
  animate={{ 
    x: 0, 
    opacity: 1,
    y: [0, -10, 0] // Added a gentle floating bobbing effect
  }}
  transition={{ 
    x: { duration: 1, delay: 0.5 },
    opacity: { duration: 1, delay: 0.5 },
    y: { duration: 4, repeat: Infinity, ease: "easeInOut" } // The float loop
  }}
  // Added mt-[30px] here
  className="hidden lg:block absolute left-10 w-80 z-20 mt-[14rem]"
>
  <div className="bg-[#1e1e1e]/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-500">
    <div className="flex gap-1.5 p-3 border-b border-white/5 bg-white/5">
      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
    </div>
    <div className="p-4 font-mono text-xs leading-relaxed text-gray-300">
      <p className="text-[#FF5733]">import</p> <p className="text-white inline">{`{ Avira }`}</p> <p className="text-[#FF5733] inline">from</p> <p className="text-green-400 inline">'tech'</p>
      <p className="mt-2 text-blue-400">const</p> <p className="text-white inline">Project = () =&gt; {"{"}</p>
      <p className="ml-4 text-gray-400">status: <span className="text-yellow-400">'Building...'</span></p>
      <p className="ml-4 text-gray-400">stack: [<span className="text-orange-300">'React', 'Node'</span>]</p>
      <p className="text-white">{"}"}</p>
    </div>
  </div>
</motion.div>
      {/* --- RIGHT SIDE: Moving Full-Stack Tools --- */}
      <div className="hidden lg:block absolute right-20 w-80 h-80 z-20">
        <div className="relative w-full h-full flex items-center justify-center">
          {stackIcons.map((item, i) => (
            <motion.div
              key={i}
              className="absolute p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                delay: i * (20 / stackIcons.length)
              }}
              style={{
                originX: "-100px",
                left: "100%"
              }}
            >
              <item.Icon size={24} color={item.color} />
            </motion.div>
          ))}
          {/* Center Glow for Tools */}
          <div className="w-32 h-32 bg-[#FF5733]/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* --- CENTER CONTENT --- */}
      <div className="container mx-auto px-6 relative z-30 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-[#FF5733] animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">Available for new projects</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tighter flex flex-wrap justify-center gap-x-4">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className={word === "Digital" || word === "Solutions" ? "text-[#FF5733]" : ""}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Delivering excellence through innovative solutions tailored to your business needs.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Magnetic>
              <a href="#projects" className="px-8 py-4 bg-[#FF5733] text-white rounded-full font-medium hover:brightness-110 transition-all flex items-center gap-2 group">
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition-colors">
                Contact Us
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
      >
        <ChevronDown size={24} />
      </motion.div>
    </div>
  );
};

export default Hero;