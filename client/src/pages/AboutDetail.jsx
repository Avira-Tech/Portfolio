import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  {
    title: "Our Journey",
    content:
      "Avira Tech began with a simple vision: to build reliable, modern, and human‑centered software that creates real impact. Over time, that vision has translated into partnerships, shipped products, and a reputation for engineering discipline with creative execution.",
  },
  {
    title: "What Drives Us",
    content:
      "We care about outcomes—faster experiences, secure systems, and interfaces that users love. We combine rigorous engineering with thoughtful design to deliver scalable solutions for startups and enterprises.",
  },
  {
    title: "How We Work",
    content:
      "Discovery and alignment upfront, execution in iterative sprints, and continuous improvement post‑launch. We believe transparency, measurable goals, and strong communication are the foundation of successful delivery.",
  },
  {
    title: "Where We’re Going",
    content:
      "From cloud‑native architectures to AI‑assisted experiences, we keep adopting the best tools and practices to ensure your products remain future‑ready.",
  },
];

const AboutDetail = () => {
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
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">About <span className="text-primary">Avira Tech</span></h1>
            <p className="text-gray-400 text-lg">
              A deeper look into our journey, values, and the way we build.
            </p>
          </motion.header>

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
                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{s.title}</h2>
                <p className="text-gray-300 leading-relaxed">{s.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default AboutDetail;
