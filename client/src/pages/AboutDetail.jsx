import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Target, Rocket, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  {
    title: "Our Journey",
    icon: <Globe className="w-6 h-6 text-primary" />,
    content: "Avira Tech began with a simple vision: to build reliable, modern, and human‑centered software that creates real impact. Over time, that vision has translated into partnerships, shipped products, and a reputation for engineering discipline.",
  },
  {
    title: "What Drives Us",
    icon: <Target className="w-6 h-6 text-primary" />,
    content: "We care about outcomes-faster experiences, secure systems, and interfaces that users love. We combine rigorous engineering with thoughtful design to deliver scalable solutions for startups and enterprises.",
  },
  {
    title: "How We Work",
    icon: <Zap className="w-6 h-6 text-primary" />,
    content: "Discovery and alignment upfront, execution in iterative sprints, and continuous improvement post‑launch. We believe transparency and measurable goals are the foundation of successful delivery.",
  },
  {
    title: "Where We’re Going",
    icon: <Rocket className="w-6 h-6 text-primary" />,
    content: "From cloud‑native architectures to AI‑assisted experiences, we keep adopting the best tools and practices to ensure your products remain future‑ready.",
  },
];

const AboutDetail = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#0a0a0a] min-h-screen text-white selection:bg-primary/30"
    >
      <Navbar />
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -right-[5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <main className="relative pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* Navigation */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 hover:text-primary transition-colors mb-12 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                Crafting the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  Digital Future.
                </span>
              </h1>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border-l border-white/10 pl-8"
            >
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-md">
                Avira Tech is an engineering-first studio dedicated to building high-performance software and meaningful user experiences.
              </p>
            </motion.div>
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group relative p-1 rounded-3xl overflow-hidden transition-all hover:scale-[1.01]"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative h-full bg-[#111] border border-white/5 rounded-[22px] p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="mb-6 p-3 w-fit rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/30 transition-colors">
                      {s.icon}
                    </div>
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {s.title}
                    </h2>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      {s.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sub-Section: Stats or Motto */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 pt-20 border-t border-white/5 text-center"
          >
            <h3 className="text-gray-500 uppercase tracking-[0.3em] text-sm mb-12">Our Commitment</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { label: 'Uptime', val: '99.9%' },
                { label: 'Support', val: '24/7' },
                { label: 'Delivery', val: 'On-Time' }
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold mb-1">{stat.val}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default AboutDetail;