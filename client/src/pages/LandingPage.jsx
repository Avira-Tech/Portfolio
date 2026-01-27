import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Different from '../components/Different'
import Tech from '../components/Tech'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { motion, useScroll, useSpring } from 'framer-motion'
import PixiParticles from '../components/PixiParticles' 
import Project3DViewer from '../components/Project3DViewer'
import SEO from '../components/SEO'

const LandingPage = () => {
  // Reading scroll progress for a subtle top progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0a0a0a] min-h-screen text-white selection:bg-primary/30 selection:text-white overflow-x-hidden"
    >
      <SEO />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Enhanced Background Layer */}
      <div className="fixed inset-0 z-0">
        <PixiParticles 
          className="w-full h-full pointer-events-none opacity-60" 
          particleCount={80} // Increased slightly for depth
          connectionDistance={150}
          backgroundColor="#080808"
        />
        {/* Subtle Radial Vignette to focus attention on content */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,8,8,0.8)_100%)] pointer-events-none" />
      </div>

      <Navbar />
      
      <main className="relative z-10">
        {/* Hero: High impact, minimal distractions */}
        <section id="home" className="relative">
          <Hero />
          {/* Transition Gradient to next section */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </section>
        
        {/* About: Clean entry */}
        <section id="about" className="relative py-20 bg-[#0a0a0a]/40">
          <About />
        </section>

        {/* 3D Viewer: Floating Glass Container */}
        <section id="3d-viewer" className="relative py-32 overflow-hidden">
          <div className="container mx-auto px-6 relative z-20">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Next Dimension</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-lg">
                Experience our architecture through an immersive, interactive 3D environment.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] w-full rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden group shadow-2xl"
            >
              {/* Decorative Corner Accents */}
              <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-primary/30 rounded-tl-xl" />
              <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-primary/30 rounded-br-xl" />
              
              <Project3DViewer />
              
              {/* Interaction Hint */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-1 h-8 rounded-full bg-white/20 relative overflow-hidden">
                    <motion.div 
                      animate={{ y: [0, 24, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-full h-1/3 bg-primary"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll to rotate</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Sections: Layered on top of particles */}
        <section id="projects" className="py-20 bg-dark/20 backdrop-blur-[2px]">
          <Projects />
        </section>

        <section id="different" className="py-20 relative">
          {/* Subtle glow behind "Different" section */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          <Different />
        </section>

        <section id="tech" className="py-20">
          <Tech />
        </section>

        <section id="testimonials" className="py-20 bg-white/[0.02]">
          <Testimonials />
        </section>

        <section id="contact" className="py-20">
          <Contact />
        </section>
      </main>

      <Footer />
    </motion.div>
  )
}

export default LandingPage