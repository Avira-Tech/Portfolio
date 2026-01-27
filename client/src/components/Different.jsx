import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Code, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Users size={28} />,
    title: "Client-First Approach",
    description: "We prioritize your business goals and user needs above all else, ensuring the final product delivers real value.",
    gradient: "from-white/10 to-transparent" // Changed from orange/blue to neutral white
  },
  {
    icon: <Zap size={28} />,
    title: "Performance Focused",
    description: "Speed matters. We optimize every line of code to ensure your application loads fast and runs smoothly.",
    gradient: "from-white/10 to-transparent"
  },
  {
    icon: <Code size={28} />,
    title: "Clean Code",
    description: "We write maintainable, scalable, and well-documented code that is easy to extend in the future.",
    gradient: "from-white/10 to-transparent"
  },
  {
    icon: <Shield size={28} />,
    title: "Secure Architecture",
    description: "Security is not an afterthought. We implement best practices to protect your data and users.",
    gradient: "from-white/10 to-transparent"
  }
];

const FeatureCard = ({ feature, index }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/5 bg-[#0A0A0A] p-px"
    >
      {/* Updated Hover Spotlight (White/Neutral) */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.08), transparent 80%)`,
          opacity: isFocused ? 1 : 0,
        }}
      />

      <div className="relative z-20 h-full w-full rounded-[23px] bg-[#0D0D0D]/90 p-8 backdrop-blur-xl transition-colors group-hover:bg-[#121212]">
        
        <div className="mb-8 relative">
            {/* Neutral Glow */}
            <div className={`absolute -inset-4 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient}`} />
            <div className="relative w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-primary group-hover:text-white group-hover:border-primary/50 transition-all duration-500">
                {feature.icon}
            </div>
        </div>

        <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight group-hover:text-primary transition-colors">
          {feature.title}
        </h3>
        
        <p className="text-gray-400 text-base leading-relaxed mb-8 font-light">
          {feature.description}
        </p>

        <div className="mt-auto">
            <Link 
                to="/why-we-are-different" 
                className="inline-flex items-center gap-2 text-sm font-bold tracking-tighter text-gray-500 group-hover:text-primary transition-all"
            >
                READ ANALYSIS 
                <div className="overflow-hidden w-0 group-hover:w-5 transition-all duration-300">
                    <ArrowRight size={16} />
                </div>
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Different = () => {
  return (
    <section className="py-32 relative">
      {/* Top Border Line (Subtle White) */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-4 block"
            >
              // Benchmarks
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">Differentiation.</span>
            </h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 max-w-sm text-lg font-light border-l border-white/10 pl-8"
          >
            We eliminate the gap between visionary design and technical feasibility through rigorous standards.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-2">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
        
        {/* Neutral Bottom Glow (Removed Primary color) */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
      </div>
    </section>
  );
};

export default Different;