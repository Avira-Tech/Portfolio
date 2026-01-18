import { Github, Twitter, Linkedin, Instagram, Mail, MapPin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github size={20} />, label: "GitHub", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" }
  ];

  const footerLinks = [
    { name: "Projects", path: "/projects" },
    { name: "Blogs", path: "/blog/1" },
    { name: "Why We Are Different", path: "/why-we-are-different" },
    { name: "Contact", path: "#contact" },
  ];

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-dark/40 backdrop-blur-xl">
      {/* Decorative Gradient Flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column */}
          <motion.div 
            className="md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Logo />
            <p className="text-gray-400 text-sm mt-6 leading-relaxed max-w-sm">
              Crafting digital experiences that merge high-performance engineering with intuitive design. Building the future, one line of code at a time.
            </p>
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group cursor-pointer">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/10">
                  <Mail size={18} />
                </div>
                <span className="text-sm font-medium">hello@aviratech.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group cursor-pointer">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/10">
                  <MapPin size={18} />
                </div>
                <span className="text-sm font-medium">Remote / Worldwide</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-primary text-sm transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Expertise</h4>
            <div className="grid grid-cols-1 gap-4 text-sm">
              {["Custom Software", "Cloud Architecture", "UI/UX Strategy", "AI Integration"].map((service) => (
                <div key={service} className="text-gray-400 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary/40" />
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Column */}
          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest insights on tech and design.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button className="absolute right-1 top-1 p-2 bg-primary rounded-full hover:bg-primary-dark transition-all hover:scale-105 active:scale-95">
                <Send size={16} className="text-white" />
              </button>
            </div>
            
            <div className="mt-8 flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-500 shadow-lg hover:shadow-primary/20"
                  whileHover={{ y: -5 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {currentYear} <span className="text-gray-300 font-medium">Avira Tech</span>. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs font-medium uppercase tracking-tighter">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;