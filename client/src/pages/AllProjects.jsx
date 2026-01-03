import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const allProjects = [
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

const AllProjects = () => {
  return (
    <div className="bg-dark min-h-screen text-white">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8 group">
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                All <span className="text-primary">Projects</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl">
                A comprehensive collection of our work, featuring web applications, mobile apps, and enterprise solutions.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllProjects;
