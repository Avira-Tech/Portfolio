import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { useGsapScroll } from '../hooks/useGsapScroll';
import ThreeBackground from './ThreeBackground';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  
  useGsapScroll(ref, [
    {
      targets: '.blog-card',
      vars: { opacity: 0, y: 40, stagger: 0.08, duration: 0.6, ease: 'power2.out' },
      scrollTrigger: { start: 'top 80%', end: 'bottom 20%' }
    }
  ]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://portfolio-backend-3p35.onrender.com/api/blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div ref={ref} className="py-20 bg-black/30 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Tech <span className="text-primary">News</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Daily updated insights and news from trusted sources in the web development world.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="blog-card bg-card/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-all group h-full flex flex-col hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(255,107,0,0.2)] duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1 border border-white/10">
                    <Calendar size={12} />
                    {blog.date}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {blog.tags && blog.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs text-primary font-medium uppercase tracking-wider">#{tag}</span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                    {blog.excerpt || "Click to read the full article..."}
                  </p>

                  <Link
                    to={`/blog/${blog.id}`}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all mt-auto"
                  >
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
