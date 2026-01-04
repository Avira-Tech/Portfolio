import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useGsapScroll } from '../hooks/useGsapScroll';
import ThreeBackground from './ThreeBackground';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO, TechStart",
    content: "Avira Tech transformed our vision into a reality. The attention to detail and technical expertise were impressive.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Smith",
    role: "Marketing Director",
    content: "Professional, timely, and innovative. The new website has significantly increased our conversion rates.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Founder, AppCo",
    content: "The best freelance experience I've had. Clean code and great communication throughout the project.",
    rating: 4
  }
];

const Testimonials = () => {
  const ref = useRef(null);
  useGsapScroll(ref, [
    {
      targets: '.testimonial-card',
      vars: { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
      scrollTrigger: { start: 'top 80%', end: 'bottom 20%' }
    }
  ]);
  return (
    <div ref={ref} className="py-20 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client <span className="text-primary">Testimonials</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here is what our clients have to say about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 10px 30px -10px rgba(255, 107, 0, 0.3)",
                borderColor: "rgba(255, 107, 0, 0.5)"
              }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="testimonial-card p-8 rounded-xl bg-card border border-gray-800 relative cursor-pointer"
            >
              <div className="flex gap-1 mb-4 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < item.rating ? "currentColor" : "none"} className={i < item.rating ? "" : "text-gray-600"} />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">"{item.content}"</p>
              <div>
                <h4 className="font-bold text-white">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
