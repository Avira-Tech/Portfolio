import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

// Card variants for different animation styles
export const cardVariants = {
  // Fade in up
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  },
  // Scale up with fade
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  },
  // Slide in from left/right
  slideIn: (direction = 'left') => ({
    hidden: { opacity: 0, x: direction === 'left' ? -60 : 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }),
  // Flip animation
  flip: {
    hidden: { opacity: 0, rotateX: 90 },
    visible: { 
      opacity: 1, 
      rotateX: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  },
  // Bounce in
  bounce: {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }
};

// Child animation variants for staggered effects
export const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

// Stagger container for list animations
export const StaggerContainer = ({ 
  children, 
  className = "",
  staggerDelay = 0.1,
  containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  },
  viewport = { once: true, margin: "-50px" }
}) => {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
};

// Animated Card Component
const AnimatedCard = ({
  children,
  variant = 'fadeUp',
  className = "",
  hoverEffect = true,
  glowColor = "rgba(255, 107, 0, 0.3)",
  onClick,
  delay = 0,
  customVariant = null,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const selectedVariant = customVariant || cardVariants[variant];

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      variants={selectedVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={hoverEffect ? { scale: 1.02 } : {}}
      style={{ perspective: 1000 }}
      {...props}
    >
      {/* Glow effect on hover */}
      {hoverEffect && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${glowColor}, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
            filter: 'blur(20px)',
            zIndex: -1
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Border gradient on hover */}
      {hoverEffect && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, rgba(255,107,0,0.5), rgba(59,130,246,0.5))`,
            padding: '2px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            opacity: isHovered ? 1 : 0,
            zIndex: 10
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Card content */}
      <motion.div
        className="relative z-10 h-full"
        animate={hoverEffect ? {
          rotateX: isHovered ? 2 : 0,
          rotateY: isHovered ? 2 : 0
        } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Feature Card with icon
export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className = "",
  variant = 'fadeUp',
  delay = 0
}) => {
  return (
    <AnimatedCard
      variant={variant}
      delay={delay}
      className={`p-6 rounded-2xl bg-card border border-gray-800 ${className}`}
      glowColor="rgba(59, 130, 246, 0.3)"
    >
      <motion.div
        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
        whileHover={{ scale: 1.1, rotate: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Icon className="w-6 h-6 text-primary" />
      </motion.div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </AnimatedCard>
  );
};

// Stats Card with animated number
export const StatsCard = ({
  value,
  label,
  suffix = "",
  prefix = "",
  className = "",
  variant = 'fadeUp',
  delay = 0
}) => {
  return (
    <AnimatedCard
      variant={variant}
      delay={delay}
      className={`p-6 rounded-2xl bg-card border border-gray-800 ${className}`}
      glowColor="rgba(16, 185, 129, 0.3)"
    >
      <motion.div
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, duration: 0.5 }}
      >
        {prefix}{value}{suffix}
      </motion.div>
      <p className="text-gray-400 mt-2">{label}</p>
    </AnimatedCard>
  );
};

// Info Card with decorative elements
export const InfoCard = ({
  number,
  title,
  content,
  className = "",
  variant = 'slideIn',
  delay = 0
}) => {
  return (
    <AnimatedCard
      variant={variant}
      delay={delay}
      className={`p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-gray-800 ${className}`}
      glowColor="rgba(255, 107, 0, 0.2)"
    >
      <div className="flex items-start gap-4">
        <span className="text-5xl font-black text-primary/20">{number}</span>
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
          <p className="text-gray-400 leading-relaxed">{content}</p>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default AnimatedCard;

