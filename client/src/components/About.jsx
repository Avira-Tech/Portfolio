import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { mass: 1, stiffness: 60, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  useEffect(() => {
    return display.on("change", (latest) => setDisplayValue(latest));
  }, [display]);

  return <span ref={ref}>{displayValue}</span>;
};

const StatItem = ({ number, label, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative overflow-hidden text-center p-8 border border-white/10 rounded-2xl bg-white/[0.03] backdrop-blur-sm hover:border-primary/40 transition-colors group"
    >
      {/* Subtle Inner Glow */}
      <div className="absolute -inset-px bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <h3 className="text-5xl font-extrabold text-white mb-2 flex justify-center items-center tracking-tighter">
        <AnimatedNumber value={parseInt(number)} />
        <span className="text-primary ml-1">+</span>
      </h3>
      <p className="text-sm uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors font-medium">
        {label}
      </p>
    </motion.div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const stats = [
    { number: "5", label: "Years Experience" },
    { number: "50", label: "Projects Completed" },
    { number: "30", label: "Happy Clients" },
    { number: "10", label: "Tech Partners" },
  ];

  return (
    <section className="py-24 relative text-white overflow-hidden" ref={containerRef}>
      {/* Abstract Background Blobs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
              Our Identity
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Crafting Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                Excellence with Avira
              </span>
            </h2>
            
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed max-w-xl">
              <p>
                At <span className="text-white font-medium">Avira Tech</span>, we don't just write code; we architect experiences. As a forward-thinking development collective, we merge high-level engineering with intuitive design.
              </p>
              <p>
                Our philosophy is simple: **Scalability by default.** Whether we're building a sleek startup MVP or a heavy-duty enterprise system, our code is built to evolve.
              </p>
            </div>
            
            <motion.a 
              href="/about" 
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-3 mt-10 text-primary font-bold text-lg group"
            >
              <span>Explore Our Journey</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                <path d="M4.16663 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <StatItem key={idx} index={idx} {...stat} />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;