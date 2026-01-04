import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useGsapScroll } from '../hooks/useGsapScroll';
import ThreeBackground from './ThreeBackground';
import ProjectCard from './ProjectCard';

const projects = [
  {
    id: 1,
    title: "Future Study Hub",
    category: "Web Apps",
    image: "https://wallpapers.com/images/featured/world-map-qwtl6tl4g4nk4z5v.jpg",
    tech: ["PHP", "JavaScript", "MySQL", "Bootstrap", "HTML", "CSS"],
    description: "Advanced E‑Learning Platform with interactive modules, progress tracking, and personalized learning paths.",
    slug: "future-study-hub",
    liveUrl: "http://futurestudyhub.10001mb.com/?i=1"
  },
  {
    id: 2,
    title: "KrushiMitra – Assured Contract Farming",
    category: "AgriTech",
    image: "https://wallpapers.com/images/hd/green-technology-1000-x-667-wallpaper-qc11crajs1d8bs3z.jpg",
    tech: ["React", "Node.js", "Razorpay", "Twilio", "AGMARKNET API", "GPS"],
    description: "Digital agriculture marketplace with contracts, live crop prices, secure payments, inventory and logistics.",
    slug: "krushimitra-contract-farming",
    liveUrl: "https://krushimitra.base44.app/"
  },
  {
    id: 3,
    title: "Stellar Campus",
    category: "Enterprise",
    image: "https://stellarcampus.com/assets/5-B9dxaK7_.webp",
    tech: ["React", "Node.js", "AWS EC2", "S3", "CloudFront", "Docker", "CI/CD", "SNS"],
    description: "Full‑stack app with AWS deployment, CI/CD pipelines, high availability and SMS notifications.",
    slug: "stellar-campus",
    liveUrl: "https://stellarcampus.com/"
  },
  {
    id: 4,
    title: "RFID-Based Campus Security System",
    category: "Security / IoT",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgdHMr5050H1ZxOQ6jTZ6GRTc9jOlRyC1TaVPG4BuOIeCh5o3PLN2oth8PEi7YIyo0nf09JzOlIl9a8_uJUYxW0BbZgTv5txwO6dQ_jx_s09hVgIErImdhipfwo5loGzU6cU6OQdkuRMRY/s1600/SRIMCA.jpg",
    tech: ["React", "Node.js", "MongoDB", "Docker", "DeepFace", "RFID Reader Z11-13.56MHz"],
    description: "Secure identification with RFID + facial recognition, scalable for multi‑campus networks.",
    slug: "rfid-campus-security",
    liveUrl: null
  }
];

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
    <div ref={ref} className="py-24 bg-dark relative overflow-hidden">
       <ThreeBackground bounded count={700} opacity={0.35} />
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
