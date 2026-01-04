import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="project-item group relative h-[400px] rounded-2xl overflow-hidden bg-card border border-gray-800 shadow-2xl"
    >
      {/* Parallax Image Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.title} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          initial={{ scale: 1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex justify-between items-end mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
             <div className="flex gap-3">
              <Link 
                to={`/projects/${project.slug}`} 
                className="p-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-primary hover:border-primary hover:text-white transition-all hover:scale-110"
                aria-label="View Details"
              >
                <Github size={20} />
              </Link>
              {project.liveUrl ? (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-primary hover:border-primary hover:text-white transition-all hover:scale-110"
                  aria-label="Open Live Demo"
                >
                  <ExternalLink size={20} />
                </a>
              ) : (
                <span className="p-3 bg-white/5 backdrop-blur-md border border-white/10 text-gray-400 rounded-full cursor-not-allowed">
                  <ExternalLink size={20} />
                </span>
              )}
            </div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest border border-primary/30 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm">
              {project.category}
            </span>
          </div>

          <h3 className="text-3xl font-bold text-white mb-3 transition-colors duration-300">{project.title}</h3>
          
          <p className="text-gray-300 group-hover:text-white text-sm mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-500 opacity-80 group-hover:opacity-100">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-md border border-white/10 group-hover:border-primary/30 rounded-full text-white">
                {t}
              </span>
            ))}
          </div>
          
          <div className="mt-6">
            <Link 
              to={`/projects/${project.slug}`} 
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              View Details <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
