import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Zap, Code, Users } from 'lucide-react';

const sections = [
  {
    icon: <Users size={28} />,
    title: "Client‑First Approach",
    content:
      "We start with your goals. Every decision—from architecture to UI—is driven by business impact and user experience. We collaborate closely, share progress transparently, and iterate quickly to deliver measurable outcomes.",
    bullets: [
      "Discovery workshops and clear success metrics",
      "Feedback‑driven sprints and continuous alignment",
      "User‑centric journey design across all touchpoints",
    ],
  },
  {
    icon: <Zap size={28} />,
    title: "Performance Focused",
    content:
      "Speed and efficiency are fundamental. We optimize payloads, minimize reflows, and use code‑splitting and lazy‑loading to keep experiences fast across devices and networks.",
    bullets: [
      "Route‑level code splitting and image lazy‑loading",
      "Reduced layout shift with aspect ratios and sizing",
      "Network‑aware strategies and caching best practices",
    ],
  },
  {
    icon: <Code size={28} />,
    title: "Clean, Maintainable Code",
    content:
      "We use clear abstractions, modular structures, and consistent conventions so features evolve without friction. Code is reviewed, typed where helpful, and documented where it matters.",
    bullets: [
      "Component‑driven architecture with reusable patterns",
      "Consistent naming and dependency boundaries",
      "Automated checks and CI pipelines when applicable",
    ],
  },
  {
    icon: <Shield size={28} />,
    title: "Secure Architecture",
    content:
      "Security is integrated early—strict validation, least privilege, and safe secrets management. We follow best practices across auth, data access, and infrastructure.",
    bullets: [
      "Input validation and sanitization at every layer",
      "Principle of least privilege across services",
      "Safe handling of tokens, keys, and credentials",
    ],
  },
];

const DifferentDetail = () => {
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Why We Are <span className="text-primary">Different</span></h1>
            <p className="text-gray-400 text-lg max-w-3xl">
              A principled approach that blends client goals, performance, clean engineering, and robust security—delivering solutions that scale and last.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </div>
                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">{s.title}</h2>
                </div>
                <p className="text-gray-300 mb-4">{s.content}</p>
                <ul className="space-y-2 text-gray-300">
                  {s.bullets.map((b, idx) => (
                    <li key={idx}>• {b}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default DifferentDetail;

