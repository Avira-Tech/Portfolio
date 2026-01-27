import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ayush Raj Srivastava",
    role: "CEO, VedaCurate",
    content: "Avira Tech transformed our vision into a reality. The attention to detail and technical expertise were truly impressive.",
    rating: 5,
    gradient: "from-blue-500/20 to-purple-500/20"
  },
  {
    id: 2,
    name: "Nagesh Chintham",
    role: "Founder, Nagesh PG",
    content: "Professional, timely, and innovative. The new platform has significantly increased our conversion rates by 40%.",
    rating: 5,
    gradient: "from-emerald-500/20 to-cyan-500/20"
  },
  {
    id: 3,
    name: "Dr. Dharmendra Bhatti",
    role: "Director, Uka Tarsadia University(UTU)",
    content: "The best experience I've had. Clean code and great communication. They actually care about the product.",
    rating: 5,
    gradient: "from-orange-500/20 to-rose-500/20"
  }
];

const Testimonials = () => {
  return (
    <section className="relative py-24 overflow-hidden ">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-primary font-mono text-sm tracking-widest uppercase mb-3 block"
            >
              // Social Proof
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white tracking-tight"
            >
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Visionaries</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 max-w-sm text-lg leading-relaxed"
          >
            We don't just build software; we build the foundations for the next generation of digital leaders.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm flex flex-col justify-between overflow-hidden"
            >
              {/* Decorative Gradient Blob */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 blur-3xl rounded-full bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <Quote className="text-primary/20 mb-6 group-hover:text-primary/40 transition-colors" size={40} />
                
                <div className="flex gap-0.5 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < item.rating ? "currentColor" : "none"} 
                      className={i < item.rating ? "text-yellow-500" : "text-gray-700"} 
                    />
                  ))}
                </div>

                <p className="text-xl text-gray-200 leading-relaxed mb-10 font-medium">
                  "{item.content}"
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-4 border-t border-white/5 pt-6">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center font-bold text-white border border-white/10`}>
                  {item.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-primary transition-colors">{item.name}</h4>
                  <p className="text-xs text-gray-500 font-mono tracking-tighter uppercase">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;