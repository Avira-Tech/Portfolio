// import { useEffect, useRef, useState, useCallback } from 'react';

// const PixiParticles = ({ 
//   className = "absolute inset-0 z-0 pointer-events-none",
//   particleCount = 50,
//   connectionDistance = 100,
//   mouseInteraction = true,
//   colors = ['#ff6b00', '#3b82f6', '#10b981', '#f59e0b'],
//   backgroundColor = '#121212'
// }) => {
//   const containerRef = useRef(null);
//   const appRef = useRef(null);
//   const particlesRef = useRef([]);
//   const mouseRef = useRef({ x: -1000, y: -1000 });
//   const [isReady, setIsReady] = useState(false);

//   const hexToNumber = useCallback((color) => {
//     if (typeof color === 'number') return color;
//     if (typeof color === 'string' && color.startsWith('#')) {
//       return parseInt(color.replace('#', ''), 16);
//     }
//     return 0x121212;
//   }, []);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const initPixi = async () => {
//       try {
//         const PIXI = await import('pixi.js');
        
//         const container = containerRef.current;
        
//         const app = new PIXI.Application();
//         await app.init({
//           width: container.clientWidth || window.innerWidth,
//           height: container.clientHeight || window.innerHeight,
//           background: hexToNumber(backgroundColor),
//           antialias: true,
//           resolution: window.devicePixelRatio || 1,
//           autoDensity: true,
//           powerPreference: 'high-performance'
//         });
        
//         appRef.current = app;
//         container.appendChild(app.canvas);
//         setIsReady(true);

//         const handleResize = () => {
//           if (appRef.current && containerRef.current) {
//             appRef.current.renderer.resize(
//               containerRef.current.clientWidth || window.innerWidth,
//               containerRef.current.clientHeight || window.innerHeight
//             );
//           }
//         };

//         window.addEventListener('resize', handleResize);

//         return () => {
//           window.removeEventListener('resize', handleResize);
//           if (appRef.current) {
//             appRef.current.destroy(true, { children: true, texture: true });
//             appRef.current = null;
//           }
//         };
//       } catch (err) {
//         console.error('Failed to initialize PixiJS:', err);
//       }
//     };

//     const cleanup = initPixi();
//     return () => {
//       cleanup.then(fn => fn && fn());
//     };
//   }, [backgroundColor, hexToNumber]);

//   const createParticles = useCallback((container) => {
//     if (!appRef.current || !isReady) return;

//     const app = appRef.current;
//     const numericColors = colors.map(color => hexToNumber(color));
    
//     particlesRef.current = [];

//     for (let i = 0; i < particleCount; i++) {
//       const color = numericColors[Math.floor(Math.random() * numericColors.length)];
      
//       const circle = new app.Graphics();
//       circle.circle(0, 0, 4);
//       circle.fill(color);
      
//       const texture = app.renderer.generateTexture(circle);
//       circle.destroy();
      
//       const sprite = new app.Sprite(texture);
      
//       sprite.x = Math.random() * app.screen.width;
//       sprite.y = Math.random() * app.screen.height;
//       sprite.anchor.set(0.5);
//       sprite.alpha = Math.random() * 0.5 + 0.3;
//       sprite.scale.set(Math.random() * 0.5 + 0.5);
      
//       sprite.vx = (Math.random() - 0.5) * 2;
//       sprite.vy = (Math.random() - 0.5) * 2;
//       sprite.baseSpeed = Math.random() * 0.5 + 0.5;

//       container.addChild(sprite);
//       particlesRef.current.push(sprite);
//     }
//   }, [isReady, particleCount, colors, hexToNumber]);

//   useEffect(() => {
//     if (!isReady || !appRef.current) return;

//     const app = appRef.current;
//     const particleContainer = new app.Container();
//     const connectionGraphics = new app.Graphics();
    
//     app.stage.addChild(particleContainer);
//     app.stage.addChild(connectionGraphics);
    
//     createParticles(particleContainer);

//     const tickerCallback = () => {
//       const particles = particlesRef.current;
      
//       if (particles.length === 0) return;
      
//       connectionGraphics.clear();

//       particles.forEach((particle) => {
//         particle.x += particle.vx * particle.baseSpeed;
//         particle.y += particle.vy * particle.baseSpeed;

//         if (mouseInteraction && mouseRef.current.x > -500) {
//           const dx = mouseRef.current.x - particle.x;
//           const dy = mouseRef.current.y - particle.y;
//           const distance = Math.sqrt(dx * dx + dy * dy);
          
//           if (distance < 200 && distance > 0) {
//             const force = (200 - distance) / 200;
//             particle.x += (dx / distance) * force * 2;
//             particle.y += (dy / distance) * force * 2;
//           }
//         }

//         if (particle.x < 0) particle.x = app.screen.width;
//         if (particle.x > app.screen.width) particle.x = 0;
//         if (particle.y < 0) particle.y = app.screen.height;
//         if (particle.y > app.screen.height) particle.y = 0;

//         particle.rotation += 0.02;
//       });

//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const p1 = particles[i];
//           const p2 = particles[j];
//           const dx = p1.x - p2.x;
//           const dy = p1.y - p2.y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < connectionDistance && dist > 0) {
//             const alpha = (1 - dist / connectionDistance) * 0.3;
//             connectionGraphics.setStrokeStyle({ width: 1, color: 0xffffff, alpha });
//             connectionGraphics.moveTo(p1.x, p1.y);
//             connectionGraphics.lineTo(p2.x, p2.y);
//           }
//         }
//       }
//     };

//     app.ticker.add(tickerCallback);

//     return () => {
//       app.ticker.remove(tickerCallback);
//       app.stage.removeChild(particleContainer);
//       app.stage.removeChild(connectionGraphics);
//       particleContainer.destroy({ children: true });
//       connectionGraphics.destroy();
//     };
//   }, [isReady, createParticles, mouseInteraction, connectionDistance]);

//   useEffect(() => {
//     if (!mouseInteraction) return;

//     const handleMouseMove = (e) => {
//       if (!containerRef.current) return;
//       const rect = containerRef.current.getBoundingClientRect();
//       mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
//     };

//     const handleMouseLeave = () => {
//       mouseRef.current = { x: -1000, y: -1000 };
//     };

//     const container = containerRef.current;
//     container.addEventListener('mousemove', handleMouseMove);
//     container.addEventListener('mouseleave', handleMouseLeave);

//     return () => {
//       container.removeEventListener('mousemove', handleMouseMove);
//       container.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, [mouseInteraction]);

//   return <div ref={containerRef} className={`${className} overflow-hidden`} />;
// };

// export { PixiParticles };

import { useEffect, useRef, useState, useCallback } from 'react';

const PixiParticles = ({ 
  className = "fixed inset-0 z-0 pointer-events-none",
  particleCount = 60,
  connectionDistance = 100,
  mouseInteraction = true,
  colors = ['#ff6b00', '#3b82f6', '#10b981', '#f59e0b'],
  backgroundColor = '#121212'
}) => {
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [isReady, setIsReady] = useState(false);

  const hexToNumber = useCallback((color) => {
    if (typeof color === 'number') return color;
    if (typeof color === 'string' && color.startsWith('#')) {
      return parseInt(color.replace('#', ''), 16);
    }
    return 0x121212;
  }, []);

  useEffect(() => {
    let appInstance = null;

    const initPixi = async () => {
      try {
        // 1. Import PIXI
        const PIXI = await import('pixi.js');
        if (!containerRef.current) return;

        // 2. Initialize Application
        const app = new PIXI.Application();
        await app.init({
          resizeTo: window, // Automatically handle resizing
          background: hexToNumber(backgroundColor),
          antialias: true,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
        });
        
        appRef.current = app;
        appInstance = app;
        containerRef.current.appendChild(app.canvas);

        // 3. Setup Layers
        const particleContainer = new PIXI.Container();
        const connectionGraphics = new PIXI.Graphics();
        app.stage.addChild(particleContainer);
        app.stage.addChild(connectionGraphics);

        // 4. Create Particles
        const numericColors = colors.map(color => hexToNumber(color));
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
          const color = numericColors[Math.floor(Math.random() * numericColors.length)];
          
          const circle = new PIXI.Graphics()
            .circle(0, 0, 3)
            .fill(color);
          
          const texture = app.renderer.generateTexture(circle);
          circle.destroy();
          
          const sprite = new PIXI.Sprite(texture);
          sprite.x = Math.random() * app.screen.width;
          sprite.y = Math.random() * app.screen.height;
          sprite.anchor.set(0.5);
          sprite.alpha = Math.random() * 0.4 + 0.2;
          
          // Movement properties
          sprite.vx = (Math.random() - 0.5) * 1.5;
          sprite.vy = (Math.random() - 0.5) * 1.5;
          sprite.baseSpeed = Math.random() * 0.5 + 0.5;

          particleContainer.addChild(sprite);
          particles.push(sprite);
        }
        particlesRef.current = particles;

        // 5. Animation Loop
        app.ticker.add(() => {
          connectionGraphics.clear();
          
          // Update positions
          particles.forEach(p => {
            p.x += p.vx * p.baseSpeed;
            p.y += p.vy * p.baseSpeed;

            // Mouse Interaction
            if (mouseInteraction && mouseRef.current.x > -500) {
              const dx = mouseRef.current.x - p.x;
              const dy = mouseRef.current.y - p.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 150) {
                const force = (150 - dist) / 150;
                p.x -= (dx / dist) * force * 1.5;
                p.y -= (dy / dist) * force * 1.5;
              }
            }

            // Screen wrap
            if (p.x < 0) p.x = app.screen.width;
            if (p.x > app.screen.width) p.x = 0;
            if (p.y < 0) p.y = app.screen.height;
            if (p.y > app.screen.height) p.y = 0;
          });

          // Draw connections
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const p1 = particles[i];
              const p2 = particles[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < connectionDistance) {
                const alpha = (1 - dist / connectionDistance) * 0.2;
                connectionGraphics.moveTo(p1.x, p1.y);
                connectionGraphics.lineTo(p2.x, p2.y);
                connectionGraphics.stroke({ width: 1, color: 0xffffff, alpha });
              }
            }
          }
        });

        setIsReady(true);
      } catch (err) {
        console.error('PixiJS Error:', err);
      }
    };

    initPixi();

    return () => {
      if (appInstance) {
        appInstance.destroy(true, { children: true, texture: true });
      }
    };
  }, [backgroundColor, particleCount, connectionDistance, mouseInteraction]); // Dependencies

  // Mouse move listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`${className} w-full h-full bg-[#121212]`} 
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}
    />
  );
};

export default PixiParticles;