import { motion } from "framer-motion";
import { ArrowLeft, Shield, Zap, Code, Users, CheckCircle2, Sparkles, Binary, Layout } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sections = [
  {
    icon: <Users size={32} />,
    title: "Client‑First Approach",
    description: "Business impact over just 'building features'.",
    content: "We start with your goals. Every decision—from architecture to UI—is driven by business impact and user experience. We collaborate closely and iterate quickly to deliver measurable outcomes.",
    bullets: ["Discovery workshops", "Feedback‑driven sprints", "User‑centric journey design"],
    color: "from-blue-500/20 to-cyan-500/10",
    gridSize: "md:col-span-2 lg:col-span-1"
  },
  {
    icon: <Zap size={32} />,
    title: "Performance",
    description: "Milliseconds matter.",
    content: "Speed is fundamental. We optimize payloads and use code‑splitting to keep experiences fast across all devices.",
    bullets: ["Route‑level splitting", "Layout shift reduction", "Network‑aware caching"],
    color: "from-orange-500/20 to-yellow-500/10",
    gridSize: "md:col-span-1 lg:col-span-1"
  },
  {
    icon: <Code size={32} />,
    title: "Clean Engineering",
    description: "Code that lives longer.",
    content: "We use clear abstractions and modular structures so features evolve without friction. Code is reviewed, typed, and documented.",
    bullets: ["Component‑driven patterns", "Dependency boundaries", "Automated CI pipelines"],
    color: "from-emerald-500/20 to-teal-500/10",
    gridSize: "md:col-span-1 lg:col-span-1"
  },
  {
    icon: <Shield size={32} />,
    title: "Secure by Design",
    description: "Zero-trust architecture.",
    content: "Security is integrated early—strict validation and safe secrets management. We follow best practices across auth and infrastructure.",
    bullets: ["Layered sanitization", "Least privilege access", "Safe credential handling"],
    color: "from-purple-500/20 to-pink-500/10",
    gridSize: "md:col-span-2 lg:col-span-1"
  },
];

const DifferentDetail = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#050505] min-h-screen text-white selection:bg-primary/30"
    >
      <Navbar />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] opacity-50" />
      </div>

      <main className="relative pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-primary transition-colors mb-8 group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
              >
                The <span className="text-primary">Difference</span>
              </motion.h1>
              <p className="text-gray-400 text-xl leading-relaxed">
                We don't just ship code. We engineer digital assets that provide a competitive edge through speed, security, and scale.
              </p>
            </div>

            {/* Visual Badge */}
            <div className="hidden lg:flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-dark bg-gray-800 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/40 to-blue-500/40" />
                  </div>
                ))}
              </div>
              <div className="text-xs font-bold uppercase tracking-tighter text-gray-400">
                Trusted by <br /><span className="text-white font-black">Modern Startups</span>
              </div>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`${s.gridSize} relative group overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#111] p-8 lg:p-12 hover:border-primary/40 transition-all duration-500`}
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-4 rounded-2xl bg-white/5 text-primary border border-white/10 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                      {s.icon}
                    </div>
                    <Sparkles className="text-white/5 group-hover:text-primary/20 transition-colors" size={40} />
                  </div>

                  <div className="mt-auto">
                    <span className="text-primary text-xs font-black uppercase tracking-[0.2em] mb-2 block">{s.description}</span>
                    <h2 className="text-3xl font-bold mb-4 tracking-tight">{s.title}</h2>
                    <p className="text-gray-400 leading-relaxed mb-8 group-hover:text-gray-300 transition-colors">
                      {s.content}
                    </p>

                    <div className="space-y-3">
                      {s.bullets.map((b, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm font-medium text-gray-500 group-hover:text-white transition-colors">
                          <CheckCircle2 size={16} className="text-primary" />
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Philosophy Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-24 p-12 rounded-[3rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10 text-center"
          >
            <h3 className="text-2xl font-bold mb-6 italic text-gray-300">"Good engineering is about making the invisible things solid."</h3>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-2 text-gray-500">
                <Binary size={18} /> <span className="text-xs font-bold uppercase tracking-widest">Scalable Tech</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Layout size={18} /> <span className="text-xs font-bold uppercase tracking-widest">Intuitive UX</span>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default DifferentDetail;