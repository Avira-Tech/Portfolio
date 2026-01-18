import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const EnhancedButton = ({
  children,
  variant = 'primary',
  size = 'medium',
  icon = null,
  iconPosition = 'right',
  magnetic = true,
  className = "",
  onClick,
  disabled = false,
  loading = false,
  ...props
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic effect - track mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for magnetic effect
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Transform spring values to movement
  const moveX = useTransform(xSpring, [-100, 100], [-10, 10]);
  const moveY = useTransform(ySpring, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!ref.current || !magnetic) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / 10);
    y.set((e.clientY - centerY) / 10);
  };

  const handleMouseLeave = () => {
    if (!magnetic) return;
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Variant styles
  const variants = {
    primary: {
      rest: { background: 'linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%)' },
      hover: { background: 'linear-gradient(135deg, #ff8c00 0%, #ffa500 100%)' }
    },
    secondary: {
      rest: { background: 'transparent', border: '2px solid rgba(255,255,255,0.3)' },
      hover: { background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.5)' }
    },
    ghost: {
      rest: { background: 'transparent' },
      hover: { background: 'rgba(255,255,255,0.05)' }
    },
    glow: {
      rest: { background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' },
      hover: { background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)' }
    }
  };

  // Size styles
  const sizes = {
    small: { padding: 'px-4 py-2 text-sm', iconSize: 16 },
    medium: { padding: 'px-6 py-3 text-base', iconSize: 18 },
    large: { padding: 'px-8 py-4 text-lg', iconSize: 20 }
  };

  const { padding, iconSize } = sizes[size];

  const IconComponent = icon;

  return (
    <motion.button
      ref={ref}
      className={`
        relative overflow-hidden rounded-full font-semibold text-white
        ${padding} ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      style={{
        x: magnetic ? moveX : 0,
        y: magnetic ? moveY : 0,
        ...variants[variant].rest
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      initial="rest"
      animate={isHovered ? "hover" : "rest"}
      {...props}
    >
      {/* Animated background gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5 }}
      />

      {/* Glow effect */}
      {variant === 'glow' && (
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background: variant === 'glow' ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)' : 'transparent',
            opacity: isHovered ? 0.5 : 0,
            filter: 'blur(20px)'
          }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && iconPosition === 'left' && !loading && (
          <IconComponent size={iconSize} className="transition-transform duration-300 group-hover:-translate-x-1" />
        )}
        {loading ? (
          <motion.span
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          children
        )}
        {icon && iconPosition === 'right' && !loading && (
          <IconComponent size={iconSize} className="transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>

      {/* Scale animation for children */}
      <motion.span
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

// Icon button variant
export const IconButton = ({
  icon: Icon,
  size = 'medium',
  variant = 'primary',
  className = "",
  ...props
}) => {
  const sizes = {
    small: { size: 36, iconSize: 18 },
    medium: { size: 48, iconSize: 22 },
    large: { size: 60, iconSize: 28 }
  };
  const { size: buttonSize, iconSize } = sizes[size];

  const variants = {
    primary: 'bg-primary hover:bg-orange-600',
    secondary: 'bg-white/10 hover:bg-white/20 border border-white/20',
    ghost: 'hover:bg-white/10'
  };

  return (
    <EnhancedButton
      className={`rounded-full flex items-center justify-center ${className}`}
      style={{ width: buttonSize, height: buttonSize, padding: 0 }}
      variant={variant}
      size="small"
      {...props}
    >
      <Icon size={iconSize} />
    </EnhancedButton>
  );
};

// Social button with hover effect
export const SocialButton = ({
  icon: Icon,
  href,
  label,
  color = "#3b82f6",
  className = ""
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`relative p-3 rounded-full overflow-hidden group ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileHover={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <Icon size={20} className="relative text-white" />
    </motion.a>
  );
};

// Arrow button with animated line
export const ArrowButton = ({
  text = "Learn More",
  href = "#",
  className = ""
}) => {
  return (
    <motion.a
      href={href}
      className={`inline-flex items-center gap-3 group ${className}`}
      whileHover={{ x: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <span className="text-white font-medium">{text}</span>
      <motion.span
        className="relative flex items-center"
        initial={{ width: 24 }}
        whileHover={{ width: 48 }}
      >
        <ArrowRight
          size={20}
          className="text-primary absolute left-0"
        />
        <motion.span
          className="h-0.5 bg-primary absolute left-0"
          initial={{ width: 24 }}
          whileHover={{ width: 48 }}
          transition={{ duration: 0.3 }}
        />
      </motion.span>
    </motion.a>
  );
};

export default EnhancedButton;

