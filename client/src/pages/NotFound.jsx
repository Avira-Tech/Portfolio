import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-dark min-h-screen text-white"
    >
      <Navbar />
      
      <main className="pt-24 pb-20 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 404 Number */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative inline-block mb-8"
            >
              <span className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-primary/30 to-primary/10 leading-none select-none">
                404
              </span>
              <motion.div
                initial={{ rotate: -12, scale: 0 }}
                animate={{ rotate: -12, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-4 -right-4 md:-right-8 bg-primary/20 text-primary px-3 py-1 rounded-lg text-sm font-medium"
              >
                Lost?
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Page Not <span className="text-primary">Found</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                Oops! The page you're looking for doesn't exist or has been moved. 
                Don't worry, we'll get you back on track.
              </p>

              {/* Auto-redirect message */}
              <p className="text-gray-500 text-sm mb-8">
                Redirecting to homepage in <span className="text-primary font-semibold">5</span> seconds...
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="group px-8 py-4 bg-primary hover:bg-orange-600 text-white font-bold rounded-2xl transition-all hover:shadow-[0_0_30px_-5px_rgba(var(--primary-rgb),0.5)] flex items-center gap-3"
                >
                  <Home size={20} className="group-hover:scale-110 transition-transform" />
                  Go to Homepage
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold rounded-2xl transition-all flex items-center gap-3"
                >
                  <ArrowLeft size={20} />
                  Go Back
                </button>
              </div>

              {/* Search suggestion */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl max-w-md mx-auto"
              >
                <div className="flex items-center gap-3 text-gray-400 mb-3">
                  <Search size={18} />
                  <span className="text-sm">Looking for something specific?</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Home', 'Projects', 'About', 'Services', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`)}
                      className="px-4 py-2 bg-white/5 hover:bg-primary/20 hover:text-primary text-gray-300 rounded-lg text-sm transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="fixed top-1/4 left-10 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="fixed bottom-1/4 right-10 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default NotFound;

