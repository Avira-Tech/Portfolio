import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Loader2 } from 'lucide-react';
import { useGsapScroll } from '../hooks/useGsapScroll';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1504384308090-c54be3855833?w=800&q=80';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  useGsapScroll(ref, [
    {
      targets: '.blog-card',
      vars: {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out'
      },
      scrollTrigger: { start: 'top 80%', end: 'bottom 20%' }
    }
  ], [loading, blogs]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/blogs');
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div ref={ref} className="py-20 bg-black/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest Tech <span className="text-primary">News</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Daily updated insights and news from trusted sources.
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
                className="blog-card bg-card/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden group flex flex-col hover:-translate-y-2 transition"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image || FALLBACK_IMAGE}
                    alt={blog.title}
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <Calendar size={12} />
                    {blog.date}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {(Array.isArray(blog.tags) ? blog.tags : []).slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="text-xs text-primary uppercase font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary">
                    {blog.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                    {blog.excerpt}
                  </p>

                  <Link
                    to={`/blog/${encodeURIComponent(blog.id)}`}
                    state={{ blog }}
                    className="text-primary font-medium"
                  >
                    Read More →
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
