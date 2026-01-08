import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1504384308090-c54be3855833?w=1200&q=80';

const BlogDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const passedBlog = location.state?.blog || null;

  const [blog, setBlog] = useState(passedBlog);
  const [loading, setLoading] = useState(!passedBlog);
  const [error, setError] = useState(null);
  const [readingTime, setReadingTime] = useState(5);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!passedBlog) setLoading(true);
        const res = await fetch(
          `https://portfolio-backend-3p35.onrender.com/api/blogs/${encodeURIComponent(id)}`
        );
        if (!res.ok) throw new Error('Blog not found');
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, passedBlog]);

  useEffect(() => {
    if (!blog) return;

    const text = (blog.content || blog.excerpt || '')
      .replace(/<[^>]+>/g, ' ');
    const words = text.split(/\s+/).filter(Boolean).length;
    setReadingTime(Math.max(1, Math.round(words / 200)));
  }, [blog]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark text-white">
        <div className="animate-spin h-12 w-12 border-t-2 border-primary rounded-full" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark text-white text-center p-6">
        <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
        <p className="text-gray-400 mb-6">
          {error || 'This article does not exist.'}
        </p>
        <Link to="/" className="bg-primary px-6 py-3 rounded-full">
          Go Home
        </Link>
      </div>
    );
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-dark min-h-screen text-white"
    >
      {blog && (
        <SEO 
          title={blog.title}
          description={blog.excerpt}
          keywords={(Array.isArray(blog.tags) ? blog.tags : []).join(', ')}
          url={`https://aviratech.com/blog/${id}`}
          image={blog.image || FALLBACK_IMAGE}
        />
      )}
      <Navbar />

      <main className="pt-24 pb-20">
        <article className="container mx-auto px-6 max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary mb-8"
          >
            <ArrowLeft /> Back to Home
          </Link>

          {/* HEADER */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {(Array.isArray(blog.tags) ? blog.tags : []).map(tag => (
                <span
                  key={tag}
                  className="text-xs uppercase border border-primary/30 px-3 py-1 rounded-full text-primary"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {blog.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-400 text-sm border-b border-gray-800 pb-6">
              <div className="flex items-center gap-2">
                {blog.authorImage ? (
                  <img
                    src={blog.authorImage}
                    alt={blog.author}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User size={16} />
                )}
                {blog.author}
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {blog.date}
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} />
                {readingTime} min read
              </div>

              {blog.source && (
                <span className="ml-auto text-xs uppercase px-3 py-1 border border-primary/30 rounded-full text-primary">
                  {blog.source}
                </span>
              )}
            </div>
          </header>

          {/* IMAGE */}
          <div className="mb-12 rounded-2xl overflow-hidden border border-white/10">
            <img
              src={blog.image || FALLBACK_IMAGE}
              alt={blog.title}
              onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
              className="w-full max-h-[500px] object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="prose prose-invert prose-lg max-w-none">
            {blog.content ? (
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            ) : (
              <p>{blog.excerpt}</p>
            )}

            {/* ORIGINAL SOURCE EMBED - ALWAYS VISIBLE */}
            {blog.url && (
              <div className="mt-12 pt-6 border-t border-gray-800">
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  Read full article on original site <ExternalLink size={16} />
                </a>
              </div>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </motion.div>
  );
};

export default BlogDetail;
