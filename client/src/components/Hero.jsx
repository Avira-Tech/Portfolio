import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Layout,
} from "lucide-react";
import Particles from "./Particles";
import Magnetic from "./Magnetic";

const Hero = () => {
  const { scrollY } = useScroll();
  const title =
    "Delivering High-Quality Digital Solutions for Modern Businesses";
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
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          y: [0, -10, 0], // Added a gentle floating bobbing effect
        }}
        transition={{
          x: { duration: 1, delay: 0.5 },
          opacity: { duration: 1, delay: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, // The float loop
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
            <p className="text-[#FF5733]">import</p>{" "}
            <p className="text-white inline">{`{ Avira }`}</p>{" "}
            <p className="text-[#FF5733] inline">from</p>{" "}
            <p className="text-green-400 inline">'tech'</p>
            <p className="mt-2 text-blue-400">const</p>{" "}
            <p className="text-white inline">Project = () =&gt; {"{"}</p>
            <p className="ml-4 text-gray-400">
              status: <span className="text-yellow-400">'Building...'</span>
            </p>
            <p className="ml-4 text-gray-400">
              stack: [<span className="text-orange-300">'React', 'Node'</span>]
            </p>
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
                delay: i * (20 / stackIcons.length),
              }}
              style={{
                originX: "-100px",
                left: "100%",
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
            <span className="text-sm font-medium text-gray-300">
              Available for new projects
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tighter flex flex-wrap justify-center gap-x-4">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className={
                  word === "Digital" || word === "Solutions"
                    ? "text-[#FF5733]"
                    : ""
                }
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Delivering excellence through innovative solutions tailored to your
            business needs.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Magnetic>
              <a
                href="#projects"
                className="px-8 py-4 bg-[#FF5733] text-white rounded-full font-medium hover:brightness-110 transition-all flex items-center gap-2 group"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition-colors"
              >
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
