import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/Avira_Tech_logo.png';

const Logo = ({ className = '', size = 36 }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Link 
      to="/" 
      className={`group flex items-center gap-3 transition-opacity hover:opacity-90 ${className}`} 
      aria-label="Avira Tech Home"
    >
      <div className="relative">
        {!imgError ? (
          <motion.img
            src={logo}
            alt="Avira Tech Logo"
            style={{ width: size, height: size }}
            onError={() => setImgError(true)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="object-contain relative z-10 drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)]"
            loading="lazy"
          />
        ) : (
          // Fallback if logo fails to load
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded-sm animate-pulse" />
          </div>
        )}
        
        {/* Subtle glow behind the logo on hover */}
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="flex flex-col -space-y-1">
        <div className="text-2xl font-black tracking-tighter flex items-center">
          <span className="text-white">AVIRA</span>
          <span className="text-primary ml-1 group-hover:translate-x-0.5 transition-transform duration-300">
            TECH
          </span>
        </div>
        {/* Optional tagline or subtle underline */}
        <motion.div 
          className="h-[2px] bg-gradient-to-r from-primary to-transparent w-0 group-hover:w-full transition-all duration-500" 
        />
      </div>
    </Link>
  );
};

export default Logo;