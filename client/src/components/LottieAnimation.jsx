import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

// Sample loading animation data
const loadingAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Loading",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ i: {x:[0.833],y:[0.833]}, o: {x:[0.167],y:[0.167]}, t: 0, s: [0]}, {t: 60, s: [360]}] },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{i: {x:[0.667,0.667,0.667],y:[1,1,1]}, o: {x:[0.333,0.333,0.333],y:[0,0,0]}, t: 0, s: [0, 0, 100]}, {t: 30, s: [100, 100, 100]}, {t: 60, s: [0, 0, 100]}] }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [80, 80] },
              p: { a: 0, k: [0, 0] },
              nm: "Ellipse"
            },
            {
              ty: "st",
              c: { a: 0, k: [1, 0.4, 0, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 8 },
              lc: 2,
              lj: 1,
              nm: "Stroke"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ],
          nm: "Circle Group"
        },
        {
          ty: "tm",
          s: { a: 0, k: 0 },
          e: { a: 0, k: 75 },
          o: { a: 0, k: 0 },
          m: 1
        }
      ],
      ip: 0,
      op: 60,
      st: 0
    }
  ]
};

// Sample success animation data
const successAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Success",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Check",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{i: {x:[0.667,0.667,0.667],y:[1,1,1]}, o: {x:[0.333,0.333,0.333],y:[0,0,0]}, t: 0, s: [0, 0, 100]}, {t: 20, s: [120, 120, 100]}, {t: 35, s: [100, 100, 100]}] }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [120, 120] },
              p: { a: 0, k: [0, 0] },
              nm: "Circle"
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.063, 0.4, 0.98, 1] },
              o: { a: 0, k: 100 },
              nm: "Fill"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ],
          nm: "Background"
        },
        {
          ty: "gr",
          it: [
            {
              ind: 0,
              ty: "sh",
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0]],
                  v: [[-30, 0], [-10, 20], [30, -20]],
                  c: false
                }
              },
              nm: "Check Path"
            },
            {
              ty: "st",
              c: { a: 0, k: [1, 1, 1, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 10 },
              lc: 2,
              lj: 2,
              nm: "Stroke"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ],
          nm: "Checkmark"
        }
      ],
      ip: 0,
      op: 60,
      st: 0
    }
  ]
};

// Sample hero abstract animation data
const heroAbstractAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 120,
  w: 400,
  h: 400,
  nm: "Hero Abstract",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Shape 1",
      sr: 1,
      ks: {
        o: { a: 1, k: [{i: {x:[0.667],y:[1]}, o: {x:[0.333],y:[0]}, t: 0, s: [30]}, {i: {x:[0.667],y:[1]}, o: {x:[0.333],y:[0]}, t: 60, s: [60]}, {t: 120, s: [30]}] },
        r: { a: 1, k: [{i: {x:[0.667],y:[1]}, o: {x:[0.333],y:[0]}, t: 0, s: [0]}, {t: 120, s: [360]}] },
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{i: {x:[0.667,0.667,0.667],y:[1,1,1]}, o: {x:[0.333,0.333,0.333],y:[0,0,0]}, t: 0, s: [100, 100, 100]}, {t: 120, s: [120, 120, 100]}] }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [150, 150] },
              p: { a: 0, k: [0, 0] },
              nm: "Ellipse"
            },
            {
              ty: "st",
              c: { a: 0, k: [1, 0.4, 0, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 2 },
              lc: 1,
              lj: 1,
              nm: "Stroke"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ],
          nm: "Circle"
        }
      ],
      ip: 0,
      op: 120,
      st: 0
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Shape 2",
      sr: 1,
      ks: {
        o: { a: 1, k: [{i: {x:[0.667],y:[1]}, o: {x:[0.333],y:[0]}, t: 20, s: [20]}, {i: {x:[0.667],y:[1]}, o: {x:[0.333],y:[0]}, t: 80, s: [40]}, {t: 120, s: [20]}] },
        r: { a: 1, k: [{i: {x:[0.667],y:[1]}, o: {x:[0.333],y:[0]}, t: 20, s: [0]}, {t: 120, s: [-360]}] },
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{i: {x:[0.667,0.667,0.667],y:[1,1,1]}, o: {x:[0.333,0.333,0.333],y:[0,0,0]}, t: 20, s: [80, 80, 100]}, {t: 120, s: [100, 100, 100]}] }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [100, 100] },
              p: { a: 0, k: [0, 0] },
              nm: "Ellipse"
            },
            {
              ty: "st",
              c: { a: 0, k: [0.227, 0.514, 0.965, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 3 },
              lc: 1,
              lj: 1,
              nm: "Stroke"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ],
          nm: "Circle"
        }
      ],
      ip: 0,
      op: 120,
      st: 0
    }
  ]
};

// Export animation data for reuse
export const animations = {
  loading: loadingAnimation,
  success: successAnimation,
  heroAbstract: heroAbstractAnimation
};

// Animation type options
const animationTypes = {
  loading: loadingAnimation,
  success: successAnimation,
  heroAbstract: heroAbstractAnimation
};

const LottieAnimation = ({ 
  animationType = 'loading',
  customAnimation = null,
  className = "",
  loop = true,
  autoplay = true,
  speed = 1,
  height = 200,
  width = 200,
  onComplete,
  containerClassName = ""
}) => {
  const lottieRef = useRef(null);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    if (customAnimation) {
      setAnimationData(customAnimation);
    } else if (animationTypes[animationType]) {
      setAnimationData(animationTypes[animationType]);
    }
  }, [animationType, customAnimation]);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  if (!animationData) {
    return (
      <div 
        className={`flex items-center justify-center ${containerClassName}`}
        style={{ width, height }}
      >
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${containerClassName}`}
      style={{ width, height }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        className={className}
        onDOMLoaded={() => {
          if (lottieRef.current) {
            lottieRef.current.setSpeed(speed);
          }
        }}
      />
    </motion.div>
  );
};

export default LottieAnimation;

