import {
  X,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <X size={20} />, label: "Twitter", href: "#" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
  ];

  const footerLinks = [
    { name: "Projects", path: "/projects" },
    { name: "Blogs", path: "/blog/1" },
    { name: "Why We Are Different", path: "/why-we-are-different" },
    { name: "Contact", path: "/contact" },
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
              Crafting digital experiences that merge high-performance
              engineering with intuitive design. Building the future, one line
              of code at a time.
            </p>
            <div className="mt-8 space-y-3">
              <a
                href="mailto:hello@aviratech.com"
                className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group"
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/10 transition-colors">
                  <Mail size={18} />
                </div>
                <span className="text-sm font-medium">hello@aviratech.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400 cursor-default">
                <div className="p-2 rounded-lg bg-white/5">
                  <MapPin size={18} />
                </div>
                <span className="text-sm font-medium">Remote / Worldwide</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[10px]">
              Navigation
            </h4>
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
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[10px]">
              Expertise
            </h4>
            <div className="grid grid-cols-1 gap-4 text-sm">
              {[
                "Custom Software",
                "Cloud Architecture",
                "UI/UX Strategy",
                "AI Integration",
              ].map((service) => (
                <div
                  key={service}
                  className="text-gray-400 flex items-center gap-2"
                >
                  <div className="w-1 h-1 rounded-full bg-primary/40" />
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Column */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[10px]">
              Start a Project
            </h4>
            <div className="mb-6">
              <p className="text-gray-200 font-semibold text-base">
                Have a project in mind?
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Let’s build something impactful together.
              </p>
            </div>

            <Link
              to="/contact"
              className="relative group overflow-hidden inline-flex items-center gap-3 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full text-sm font-bold transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
            >
              {/* The Sliding Background Fill */}
              <div className="absolute inset-0 w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full" />

              {/* Content (needs relative z-index to stay above the fill) */}
              <span className="relative z-10 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary group-hover:bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary group-hover:bg-white"></span>
              </span>

              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                Get in Touch
              </span>

              <Send
                size={16}
                className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-12 transition-all duration-500 text-primary group-hover:text-white"
              />

              {/* Subtle Inner Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out" />
            </Link>

            <div className="mt-8 flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
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
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-gray-500 text-[10px] tracking-wide">
            &copy; {currentYear}{" "}
            <span className="text-gray-300 font-medium">AVIRA TECH</span>. ALL
            RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
