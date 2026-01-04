import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useGsapScroll } from '../hooks/useGsapScroll';
import ThreeBackground from './ThreeBackground';

const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    return display.on("change", (latest) => setDisplayValue(latest));
  }, [display]);

  return <span ref={ref}>{displayValue}</span>;
};

const StatItem = ({ number, label }) => {
  return (
    <div className="gsap-reveal text-center p-6 border border-gray-800 rounded-xl bg-card hover:border-primary/50 transition-colors group">
      <h3 className="text-4xl font-bold text-primary mb-2 flex justify-center items-center">
        <AnimatedNumber value={parseInt(number)} />+
      </h3>
      <p className="text-gray-400 group-hover:text-white transition-colors">{label}</p>
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useGsapScroll(ref, [
    {
      targets: '.gsap-reveal',
      vars: { opacity: 0, y: 30, stagger: 0.08, duration: 0.6, ease: 'power2.out' },
      scrollTrigger: { start: 'top 80%', end: 'bottom 20%' }
    }
  ]);

  return (
    <div className="py-20 bg-dark relative overflow-hidden" ref={ref}>
      <ThreeBackground bounded count={600} opacity={0.45} />
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="gsap-reveal text-3xl md:text-5xl font-bold mb-6">
              About <span className="text-primary">Avira Tech</span>
            </h2>
            <div className="h-1 w-20 bg-primary mb-8 rounded-full"></div>
            <p className="gsap-reveal text-gray-300 mb-6 leading-relaxed text-lg">
              At Avira Tech, we are passionate about transforming ideas into reality through code. 
              As a dedicated freelancer portfolio, we represent a commitment to high-quality software engineering, 
              modern design principles, and user-centric development.
            </p>
            <p className="gsap-reveal text-gray-300 mb-6 leading-relaxed text-lg">
              Our mission is to empower businesses with robust digital solutions that scale. 
              Whether it's a complex backend system or a stunning frontend interface, we bring 
              expertise and creativity to every project.
            </p>
            
            <a href="/about" className="text-primary font-semibold hover:text-white transition-colors flex items-center gap-2 mt-4 group">
              Learn more about our journey 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4"
          >
            <StatItem number="5" label="Years Experience" />
            <StatItem number="50" label="Projects Completed" />
            <StatItem number="30" label="Happy Clients" />
            <StatItem number="10" label="Tech Partners" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
