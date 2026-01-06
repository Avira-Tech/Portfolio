import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useGsapScroll } from '../hooks/useGsapScroll';
import ThreeBackground from './ThreeBackground';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const Projects = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  useGsapScroll(ref, [
    {
      targets: '.project-item',
      vars: { opacity: 0, y: 40, stagger: 0.1, duration: 0.6, ease: 'power2.out' },
      scrollTrigger: { start: 'top 80%', end: 'bottom 20%' }
    }
  ]);

  return (
    <div ref={ref} className="py-24 bg-transparent relative overflow-hidden">
       {/* Background Elements */}
       <motion.div 
         style={{ y: backgroundY }}
         className="absolute inset-0 pointer-events-none"
       >
          <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
       </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Featured <span className="text-primary">Projects</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Explore our latest work and digital solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
