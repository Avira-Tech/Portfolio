import { Github, Twitter, Linkedin, Instagram, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-dark border-t border-gray-800 pt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Logo />
            <p className="text-gray-500 text-sm mt-3">
              Building the future, one line of code at a time.
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>contact@aviratech.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>Remote / Worldwide</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2 text-gray-400">
              <Link to="/projects" className="hover:text-primary transition-colors hover:translate-x-1 duration-300 inline-block">Projects</Link>
              <Link to="/blog/1" className="hover:text-primary transition-colors hover:translate-x-1 duration-300 inline-block">Blogs</Link>
              <Link to="/why-we-are-different" className="hover:text-primary transition-colors hover:translate-x-1 duration-300 inline-block">Why We Are Different</Link>
              <Link to="/#contact" className="hover:text-primary transition-colors hover:translate-x-1 duration-300 inline-block">Contact</Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <div className="flex flex-col gap-2 text-gray-400">
              <span className="hover:text-white transition-colors cursor-default">Frontend Development</span>
              <span className="hover:text-white transition-colors cursor-default">Backend Development</span>
              <span className="hover:text-white transition-colors cursor-default">DevOps & Deployment</span>
              <span className="hover:text-white transition-colors cursor-default">Mobile App Development</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-6">
              {[
                { icon: <Github size={20} />, label: "GitHub" },
                { icon: <Twitter size={20} />, label: "Twitter" },
                { icon: <Linkedin size={20} />, label: "LinkedIn" },
                { icon: <Instagram size={20} />, label: "Instagram" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="text-gray-400 hover:text-primary transition-colors" 
                  aria-label={social.label}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Avira Tech. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
