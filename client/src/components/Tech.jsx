import { motion } from 'framer-motion';
import { Layout, Server, Database, Smartphone, Globe, Cloud, Code, Terminal, Cpu, Shield, Wifi, Monitor } from 'lucide-react';

const techs = [
  { category: "Frontend", icon: <Layout size={24} />, skills: ["React.js", "Vue.js", "Tailwind"] },
  { category: "Backend", icon: <Server size={24} />, skills: ["Node.js", "Express.js", "PHP"] },
  { category: "Database", icon: <Database size={24} />, skills: ["MongoDB", "PostgreSQL", "MySQL"] },
  { category: "Mobile", icon: <Smartphone size={24} />, skills: ["React Native", "Flutter", "iOS"] },
  { category: "DevOps", icon: <Cloud size={24} />, skills: ["Docker", "AWS", "CI/CD"] },
  { category: "Tools", icon: <Globe size={24} />, skills: ["Git", "Figma", "Postman"] },
  { category: "Security", icon: <Shield size={24} />, skills: ["OAuth", "JWT", "PenTesting"] },
  { category: "System", icon: <Cpu size={24} />, skills: ["Linux", "Bash", "Performance"] },
  { category: "Network", icon: <Wifi size={24} />, skills: ["HTTP/S", "WebSockets", "REST"] },
  { category: "Testing", icon: <Terminal size={24} />, skills: ["Jest", "Cypress", "Selenium"] },
];

const TechCard = ({ tech }) => (
  <div className="w-[280px] shrink-0 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all group hover:bg-white/10 mx-4 cursor-pointer hover:-translate-y-2 duration-300">
    <div className="flex items-center gap-4 mb-4">
      <div className="text-primary p-3 bg-primary/10 rounded-xl border border-primary/20 group-hover:scale-110 transition-transform duration-300">
        {tech.icon}
      </div>
      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors tracking-tight">{tech.category}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {tech.skills.map((skill) => (
        <span 
          key={skill} 
          className="px-3 py-1 bg-black/40 border border-white/5 rounded-full text-gray-300 text-xs font-medium group-hover:border-primary/30 group-hover:text-white transition-all"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const Marquee = ({ children, direction = 1, speed = 20 }) => {
  return (
    <div className="flex overflow-hidden w-full relative group">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none"></div>
      
      <motion.div
        className="flex py-4"
        animate={{
          x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};

const Tech = () => {
  const row1 = techs.slice(0, 5);
  const row2 = techs.slice(5, 10);

  return (
    <div className="py-24 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true }}
             className="text-3xl md:text-5xl font-bold mb-4"
          >
            Our <span className="text-primary">Technologies</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We utilize a modern and robust tech stack to build scalable solutions.
          </p>
        </div>

        <div className="space-y-8">
          <Marquee direction={1} speed={40}>
            {techs.map((tech, index) => (
              <TechCard key={`row1-${index}`} tech={tech} />
            ))}
          </Marquee>
          
          <Marquee direction={-1} speed={35}>
            {[...techs].reverse().map((tech, index) => (
              <TechCard key={`row2-${index}`} tech={tech} />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Tech;
