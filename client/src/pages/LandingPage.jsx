import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Different from '../components/Different'
import Tech from '../components/Tech'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import PixiParticles from '../components/PixiParticles' 
import Project3DViewer from '../components/Project3DViewer'
import SEO from '../components/SEO'

const LandingPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-dark min-h-screen text-white selection:bg-primary/30 selection:text-white"
    >
      <SEO />
      
      <PixiParticles 
        className="fixed inset-0 z-0 pointer-events-none" 
        particleCount={60}
        connectionDistance={120}
        backgroundColor="#121212"
      />

      <Navbar />
      
      <main className="relative z-10">
        <section id="home">
          <Hero />
        </section>
        
        <section id="about">
          <About />
        </section>

        <section id="3d-viewer">
          <div className="py-24 bg-dark/60 backdrop-blur-sm relative">
            <div className="container mx-auto px-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  3D <span className="text-primary">Project Viewer</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Interactive 3D product viewer with scroll animations
                </p>
              </div>
              <div className="h-[500px] w-full rounded-2xl overflow-hidden">
                <Project3DViewer />
              </div>
            </div>
          </div>
        </section>

        <section id="projects">
          <Projects />
        </section>
        <section id="different">
          <Different />
        </section>
        <section id="tech">
          <Tech />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </motion.div>
  )
}

export default LandingPage

