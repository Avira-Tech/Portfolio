import { Suspense, lazy } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Different from '../components/Different'
import Tech from '../components/Tech'
import Testimonials from '../components/Testimonials'
import Blogs from '../components/Blogs'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const ThreeBackground = lazy(() => import('../components/ThreeBackground'))

const LandingPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-dark min-h-screen text-white selection:bg-primary/30 selection:text-white"
    >
      <SEO 
        title="Home"
        description="Avira Tech offers top-tier web development, mobile apps, and digital transformation services. Build your future with our expert team."
        keywords="web development, mobile apps, software company, digital transformation, react developers"
        url="https://aviratech.com"
      />
      <Suspense fallback={null}>
        <ThreeBackground bounded={false} className="fixed inset-0 z-0 pointer-events-none" opacity={0.4} />
      </Suspense>
      <Navbar />
      <main className="relative z-10">
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
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
        <section id="blogs">
          <Blogs />
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
