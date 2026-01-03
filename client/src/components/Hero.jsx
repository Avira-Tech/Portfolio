import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Particles from './Particles';
import Magnetic from './Magnetic';

const Hero = () => {
  const { scrollY } = useScroll();
  
  const title = "Delivering High-Quality Digital Solutions for Modern Businesses";
  const words = title.split(" ");

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      <Particles />
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dark overflow-hidden -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(18,18,18,0.9),_#121212)] z-10"></div>
        
        {/* Animated Gradient Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px]"
        ></motion.div>
        
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -60, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]"
        ></motion.div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 hover:border-primary/50 transition-colors group cursor-default">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Available for new projects</span>
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-8 leading-tight tracking-tighter flex flex-wrap justify-center gap-x-4 gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className={word === "Digital" || word === "Solutions" ? "text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-400" : ""}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Delivering excellence through innovative solutions tailored to your business needs.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <Magnetic>
              <a href="#projects" className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-orange-600 transition-colors flex items-center gap-2 group">
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
            
            <Magnetic>
              <a href="#contact" className="px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/5 transition-colors">
                Contact Us
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

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