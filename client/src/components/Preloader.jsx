import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const fullText = "AVIRA TECH";

  useEffect(() => {
    // Quick loading animation
    const duration = 600;
    const intervalTime = 15;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Quick exit
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
          }, 100);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const charsToShow = Math.floor((progress / 100) * fullText.length);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5 }
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" 
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-8">
              <div className="relative w-16 h-16">
                <motion.svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="2" 
                  />
                  <motion.circle 
                    cx="50" cy="50" r="45" 
                    fill="none" stroke="#ff6b00" strokeWidth="2" 
                    strokeDasharray="283"
                    animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                    transition={{ ease: "easeOut" }}
                  />
                </motion.svg>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 flex">
              {fullText.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ 
                    opacity: i < charsToShow ? 1 : 0.1,
                    filter: i < charsToShow ? 'blur(0px)' : 'blur(5px)'
                  }}
                  className="inline-block"
                  style={{ 
                    color: i < 5 ? '#ff6b00' : 'white'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

