import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await fetch(`https://portfolio-backend-3p35.onrender.com/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-dark text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
        <p className="text-gray-400 mb-8">{error || "The blog post you're looking for doesn't exist."}</p>
        <Link to="/" className="px-6 py-3 bg-primary rounded-full hover:bg-orange-600 transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-dark min-h-screen text-white"
    >
      <Navbar />
      
      <main className="pt-24 pb-20">
        <article className="container mx-auto px-6 max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8 group">
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <header className="mb-12">
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags && blog.tags.map(tag => (
                  <span key={tag} className="text-xs font-bold text-primary uppercase tracking-widest border border-primary/30 px-3 py-1 rounded-full bg-primary/10">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{blog.title}</h1>
              
              <div className="flex items-center gap-6 text-gray-400 text-sm border-b border-gray-800 pb-8">
                <div className="flex items-center gap-2">
                  {blog.authorImage ? (
                    <img src={blog.authorImage} alt={blog.author} className="w-8 h-8 rounded-full" />
                  ) : (
                    <User size={18} />
                  )}
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>5 min read</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-12 rounded-2xl overflow-hidden border border-white/10">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              {/* Render HTML content safely if needed, or simple text */}
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </motion.div>
        </article>
      </main>
      <Footer />
    </motion.div>
  );
};

export default BlogDetail;
