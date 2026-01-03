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

const LandingPage = () => {
  return (
    <div className="bg-dark min-h-screen text-white selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main>
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
    </div>
  )
}

export default LandingPage
