import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const projects = [
  {
    slug: "future-study-hub",
    title: "Future Study Hub",
    category: "Web Apps",
    image: "https://wallpapers.com/images/featured/world-map-qwtl6tl4g4nk4z5v.jpg",
    tech: ["PHP", "JavaScript", "MySQL", "Bootstrap", "HTML", "CSS"],
    liveUrl: "http://futurestudyhub.10001mb.com/?i=1",
    overview:
      "Advanced E‑Learning Platform designed to support academic growth and career planning with interactive modules, real‑time progress tracking, and personalized learning paths.",
    highlights: [
      "Intuitive course modules with interactive learning experiences",
      "Real‑time progress tracking and personalized learning paths",
      "Scalable architecture with optimized queries and modular structure",
      "Fully responsive, cross‑browser compatible interface"
    ],
  },
  {
    slug: "krushimitra-contract-farming",
    title: "KrushiMitra – Assured Contract Farming",
    category: "AgriTech",
    image: "https://wallpapers.com/images/hd/green-technology-1000-x-667-wallpaper-qc11crajs1d8bs3z.jpg",
    tech: ["React", "Node.js", "Razorpay", "Twilio", "AGMARKNET API", "GPS"],
    liveUrl: "https://krushimitra.base44.app/",
    overview:
      "Digital marketplace connecting farmers and buyers through secure contracts, live crop pricing, inventory tools, and integrated logistics.",
    highlights: [
      "Verified authentication and transparent contract negotiations",
      "AGMARKNET API for live crop price tracking",
      "GPS‑based proximity filters for localized trading (30–50 km)",
      "Razorpay payments with GST receipts and inventory management",
      "In‑app chat, calls, AI assistant, and Porter API logistics"
    ],
  },
  {
    slug: "stellar-campus",
    title: "Stellar Campus",
    category: "Enterprise",
    image: "https://stellarcampus.com/assets/5-B9dxaK7_.webp",
    tech: ["React", "Node.js", "AWS EC2", "S3", "CloudFront", "Docker", "CI/CD", "SNS"],
    liveUrl: "https://stellarcampus.com/",
    overview:
      "Full‑stack application with complete backend services, robust authentication, and enterprise‑grade deployment on AWS.",
    highlights: [
      "RESTful APIs, authentication, and database integrations",
      "AWS‑based deployment ensuring scalability and high availability",
      "Dockerized services with automated CI/CD pipelines",
      "Optimized performance with CloudFront and S3",
      "AWS SNS for SMS notifications and user communication"
    ],
  },
  {
    slug: "rfid-campus-security",
    title: "RFID‑Based Campus Security System",
    category: "Security / IoT",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgdHMr5050H1ZxOQ6jTZ6GRTc9jOlRyC1TaVPG4BuOIeCh5o3PLN2oth8PEi7YIyo0nf09JzOlIl9a8_uJUYxW0BbZgTv5txwO6dQ_jx_s09hVgIErImdhipfwo5loGzU6cU6OQdkuRMRY/s1600/SRIMCA.jpg",
    tech: ["React", "Node.js", "MongoDB", "Docker", "DeepFace", "RFID Reader Z11-13.56MHz"],
    liveUrl: null,
    overview:
      "Secure identification platform enhancing campus safety via real‑time student verification and guard authentication at access points.",
    highlights: [
      "RFID identification with real‑time status verification",
      "DeepFace‑based facial recognition for cross‑verification",
      "Scalable architecture for multi‑campus networks",
      "Containerized deployment with Docker and robust backend"
    ],
  },
];

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
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <Link to="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8 group">
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

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
