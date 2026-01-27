import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Layout, Server, Database, Smartphone, Globe, Cloud, Code, Terminal, Cpu, Shield, Wifi, Monitor, Zap } from 'lucide-react';
import { useState } from 'react';

const techs = [
  { category: "Frontend", icon: <Layout />, skills: ["React.js", "Next.js", "Tailwind"], color: "from-blue-500 to-cyan-400" },
  { category: "Backend", icon: <Server />, skills: ["Node.js", "Go", "PostgreSQL"], color: "from-green-500 to-emerald-400" },
  { category: "Cloud", icon: <Cloud />, skills: ["AWS", "Docker", "Kubernetes"], color: "from-orange-500 to-yellow-400" },
  { category: "Security", icon: <Shield />, skills: ["OAuth", "JWT", "HTTPS"], color: "from-red-500 to-rose-400" },
  { category: "AI & ML", icon: <Cpu />, skills: ["PyTorch", "OpenAI", "TensorFlow"], color: "from-purple-500 to-violet-400" },
  { category: "Mobile", icon: <Smartphone />, skills: ["React Native", "Swift", "Flutter"], color: "from-pink-500 to-rose-400" },
];

const TechCard = ({ tech }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      className="group relative w-[320px] shrink-0 rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:bg-white/[0.05] mx-4 overflow-hidden"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(120, 119, 198, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        <div className={`mb-6 inline-flex p-3 rounded-2xl bg-gradient-to-br ${tech.color} bg-opacity-10 shadow-lg`}>
          {tech.icon}
        </div>
        
        <h3 className="mb-4 text-2xl font-bold tracking-tight text-white/90">
          {tech.category}
        </h3>

        <div className="flex flex-wrap gap-2">
          {tech.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-white/5 bg-white/5 px-3 py-1 text-sm font-medium text-gray-400 transition-colors group-hover:border-white/20 group-hover:text-white"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Helper for Spotlight effect
function useMotionTemplate(fragments, ...values) {
  return useTransform(values, (latestValues) =>
    fragments.reduce((acc, fragment, i) => acc + fragment + (latestValues[i] ?? ""), "")
  );
}

const Marquee = ({ children, direction = 1, speed = 30 }) => (
  <div className="relative flex overflow-hidden py-10 mask-fade">
    <motion.div
      className="flex"
      animate={{ x: direction === 1 ? [0, -1032] : [-1032, 0] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {children}
      {children}
    </motion.div>
  </div>
);

const Tech = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030303] py-24 text-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        {/* <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" /> */}
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <Zap size={14} /> Our Tech Stack
          </motion.div>
          <h2 className="text-4xl font-extrabold tracking-tighter md:text-7xl">
            Engineered for <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Performance</span>
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          <Marquee direction={1} speed={40}>
            {techs.map((tech, i) => <TechCard key={i} tech={tech} />)}
          </Marquee>
          <Marquee direction={-1} speed={50}>
            {[...techs].reverse().map((tech, i) => <TechCard key={i} tech={tech} />)}
          </Marquee>
        </div>
      </div>

      <style jsx>{`
        .mask-fade {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </section>
  );
};

export default Tech;