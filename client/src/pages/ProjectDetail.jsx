import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projects } from '../data/projects';

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = useMemo(() => projects.find(p => p.slug === slug), [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
          <Link to="/projects" className="px-6 py-3 bg-primary rounded-full hover:bg-orange-600 transition-colors">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-dark min-h-screen text-white"
    >
      <SEO 
        title={project.title}
        description={project.overview}
        keywords={`${project.title}, ${project.category}, ${project.tech.join(', ')}`}
        url={`https://aviratech.com/projects/${project.slug}`}
        image={project.image}
      />
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex gap-4 mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group">
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group">
              Back to Projects
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden mb-12 group">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <span className="text-primary font-medium tracking-wider uppercase mb-2 block">{project.category}</span>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Overview</h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {project.overview}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Key Highlights</h2>
                  <ul className="space-y-3">
                    {project.highlights.map((highlight, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sticky top-32">
                  <h3 className="text-xl font-bold mb-6">Project Details</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div>
                      <span className="block text-sm text-gray-500 mb-1">Client</span>
                      <span className="font-medium">Confidential</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500 mb-1">Timeline</span>
                      <span className="font-medium">8 Weeks</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500 mb-1">Role</span>
                      <span className="font-medium">Full Stack Development</span>
                    </div>
                  </div>

                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full py-3 bg-primary text-white text-center rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 group"
                    >
                      Visit Live Site
                      <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default ProjectDetail;
