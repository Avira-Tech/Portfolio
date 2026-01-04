import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGsapScroll } from '../hooks/useGsapScroll';
import ThreeBackground from './ThreeBackground';
import { Shield, Zap, Code, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Users size={32} />,
    title: "Client-First Approach",
    description: "We prioritize your business goals and user needs above all else, ensuring the final product delivers real value."
  },
  {
    icon: <Zap size={32} />,
    title: "Performance Focused",
    description: "Speed matters. We optimize every line of code to ensure your application loads fast and runs smoothly."
  },
  {
    icon: <Code size={32} />,
    title: "Clean Code",
    description: "We write maintainable, scalable, and well-documented code that is easy to extend in the future."
  },
  {
    icon: <Shield size={32} />,
    title: "Secure Architecture",
    description: "Security is not an afterthought. We implement best practices to protect your data and users."
  }
];

const FeatureCard = ({ feature, index }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="feature-card relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 group"
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,107,0,0.1), transparent 40%)`,
        }}
      />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
          {feature.icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {feature.description}
        </p>
        <Link to="/why-we-are-different" className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
          Learn more <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

const Different = () => {
  const ref = useRef(null);
  useGsapScroll(ref, [
    {
      targets: '.feature-card',
      vars: { opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power2.out' },
      scrollTrigger: { start: 'top 80%', end: 'bottom 20%' }
    }
  ]);
  return (
    <div ref={ref} className="py-24 bg-dark relative overflow-hidden">
      <ThreeBackground bounded count={600} opacity={0.35} />
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-64 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Our Core Values</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why We Are <span className="text-primary">Different</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We don't just write code; we build partnerships and deliver solutions that stand the test of time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/why-we-are-different" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-orange-600 transition-colors">
            Learn More
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Different;
