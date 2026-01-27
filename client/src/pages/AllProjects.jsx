import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, LayoutGrid, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const allProjects = [
  {
    id: 1,
    title: "Nagesh PG",
    category: "Property Management",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    tech: ["React", "Node.js"],
    description: "Modern co-living management software designed for seamless urban experiences.",
    slug: "nagesh-pg",
    liveUrl: "https://nageshpg.online"
  },
  {
    id: 2,
    title: "VedaCurate",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    tech: ["React", "Node.js", "3D Models"],
    description: "Built a complete, responsive website featuring modern UI design with integrated 3D models for an immersive user experience.",
    slug: "vedacurate",
    liveUrl: "https://vedacurate.com"
  },
  {
    id: 3,
    title: "Future Study Hub",
    category: "Web Apps",
    image: "https://wallpapers.com/images/featured/world-map-qwtl6tl4g4nk4z5v.jpg",
    tech: ["PHP", "JavaScript", "MySQL", "Bootstrap", "HTML", "CSS"],
    description: "Advanced E‑Learning Platform with interactive modules, progress tracking, and personalized learning paths.",
    slug: "future-study-hub",
    liveUrl: "http://futurestudyhub.10001mb.com/?i=1"
  },
  {
    id: 4,
    title: "KrushiMitra – Assured Contract Farming",
    category: "AgriTech",
    image: "https://wallpapers.com/images/hd/green-technology-1000-x-667-wallpaper-qc11crajs1d8bs3z.jpg",
    tech: ["React", "Node.js", "Razorpay", "Twilio", "AGMARKNET API", "GPS"],
    description: "Digital agriculture marketplace with contracts, live crop prices, secure payments, inventory and logistics.",
    slug: "krushimitra-contract-farming",
    liveUrl: "https://krushimitra.base44.app/"
  },
  {
    id: 5,
    title: "Stellar Campus",
    category: "Enterprise",
    image: "https://stellarcampus.com/assets/5-B9dxaK7_.webp",
    tech: ["React", "Node.js", "AWS EC2", "S3", "CloudFront", "Docker", "CI/CD", "SNS"],
    description: "Full‑stack app with AWS deployment, CI/CD pipelines, high availability and SMS notifications.",
    slug: "stellar-campus",
    liveUrl: "https://stellarcampus.com/"
  },
  {
    id: 6,
    title: "RFID-Based Campus Security System",
    category: "Security / IoT",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgdHMr5050H1ZxOQ6jTZ6GRTc9jOlRyC1TaVPG4BuOIeCh5o3PLN2oth8PEi7YIyo0nf09JzOlIl9a8_uJUYxW0BbZgTv5txwO6dQ_jx_s09hVgIErImdhipfwo5loGzU6cU6OQdkuRMRY/s1600/SRIMCA.jpg",
    tech: ["React", "Node.js", "MongoDB", "Docker", "DeepFace", "RFID Reader Z11-13.56MHz"],
    description: "Secure identification with RFID + facial recognition, scalable for multi‑campus networks.",
    slug: "rfid-campus-security",
    liveUrl: null
  }
];

// Extract unique categories for the filter
const categories = ["All", ...new Set(allProjects.map(p => p.category))];

const AllProjects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#0a0a0a] min-h-screen text-white selection:bg-primary/30"
    >
      <Navbar />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <main className="relative pt-32 pb-20">
        <div className="container mx-auto px-6">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <Link to="/" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 hover:text-primary transition-colors mb-8 group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter"
              >
                Our <span className="text-primary">Portfolio</span>
              </motion.h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                Exploring the intersection of design and engineering through <span className="text-white font-medium">{allProjects.length} dedicated builds.</span>
              </p>
            </div>

            {/* Project Stats (Optional but adds flair) */}
            <div className="hidden lg:flex gap-12 border-l border-white/10 pl-12">
              <div>
                <div className="text-3xl font-bold tracking-tighter text-primary">06</div>
                <div className="text-xs uppercase tracking-widest text-gray-500">Live Apps</div>
              </div>
              <div>
                <div className="text-3xl font-bold tracking-tighter">10+</div>
                <div className="text-xs uppercase tracking-widest text-gray-500">Technologies</div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex items-center gap-2 mr-4 text-gray-500 border-r border-white/10 pr-6">
              <LayoutGrid size={18} />
              <span className="text-sm font-medium">Filter</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border ${
                  activeCategory === cat 
                    ? "bg-primary border-primary text-black shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]" 
                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-500 text-xl">No projects found in this category.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default AllProjects;