import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ArrowLeft, Search, Compass } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#0a0a0a] min-h-screen text-white overflow-hidden relative"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <Navbar />

      <main className="relative pt-24 pb-20 flex items-center justify-center min-h-[calc(100vh-200px)] z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Visual 404 Header */}
            <div className="relative inline-block mb-12">
              <motion.h1
                animate={{
                  y: [0, -10, 0],
                  filter: [
                    "drop-shadow(0 0 0px #ff6b0000)",
                    "drop-shadow(0 0 20px #ff6b0033)",
                    "drop-shadow(0 0 0px #ff6b0000)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-[clamp(120px,20vw,240px)] font-black leading-none tracking-tighter select-none bg-gradient-to-t from-white/5 via-white/20 to-white/40 bg-clip-text text-transparent"
              >
                404
              </motion.h1>

              <motion.div
                initial={{ rotate: -12, scale: 0 }}
                animate={{ rotate: -12, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="absolute top-1/2 -right-6 md:-right-12 bg-primary px-4 py-2 rounded-full shadow-xl shadow-primary/20 flex items-center gap-2"
              >
                <Compass size={16} className="animate-spin-slow" />
                <span className="text-sm font-bold uppercase tracking-wider">
                  Lost in Space?
                </span>
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-6xl font-bold tracking-tight">
                Houston, we have a{" "}
                <span className="text-primary italic">problem.</span>
              </h2>

              <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                The page you're looking for has vanished into the digital void.
                Let's get you back to safety before the oxygen runs out.
              </p>

              {/* Real-time Countdown */}
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <div className="relative w-2 h-2">
                  <span className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </div>
                <span className="text-gray-400 text-sm">
                  Warping to Home in{" "}
                  <span className="text-white font-mono font-bold w-4 inline-block">
                    {timeLeft}
                  </span>
                  s
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <button
                  onClick={() => navigate("/")}
                  className="group px-10 py-5 bg-primary hover:bg-orange-600 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                >
                  <Home size={22} />
                  Return Home
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 backdrop-blur-sm"
                >
                  <ArrowLeft size={22} />
                  Go Back
                </button>
              </div>

              {/* Quick Links / Search */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-16"
              >
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-6">
                  <div className="h-px w-8 bg-white/10"></div>
                  <span className="uppercase tracking-[0.2em]">
                    Quick Teleport
                  </span>
                  <div className="h-px w-8 bg-white/10"></div>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {["Projects", "About", "Contact"].map((item) => (
                    <button
                      key={item}
                      onClick={() => navigate(`/${item.toLowerCase()}`)}
                      className="px-5 py-2.5 bg-white/5 hover:bg-primary/10 border border-white/5 hover:border-primary/30 rounded-xl text-sm font-medium text-gray-400 hover:text-primary transition-all duration-300"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Glow Blobs */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
      </main>

      <Footer />
    </motion.div>
  );
};

export default NotFound;
