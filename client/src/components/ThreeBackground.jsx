import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const ThreeBackground = ({ count = 1200, size = 0.02, opacity = 0.6, bounded = true, className = 'absolute inset-0 z-0 pointer-events-none' }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const setRendererSize = () => {
      const w = bounded ? mount.clientWidth : window.innerWidth;
      const h = bounded ? mount.clientHeight : window.innerHeight;
      camera.aspect = w / h || 1;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    mount.appendChild(renderer.domElement);
    setRendererSize();

    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      const c = Math.random();
      colors[i3] = c;
      colors[i3 + 1] = 0.6 + c * 0.4;
      colors[i3 + 2] = 1 - c * 0.3;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size,
      vertexColors: true,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    camera.position.z = 3;

    let lastMove = 0;
    const handleMouseMove = (event) => {
      const now = performance.now();
      if (now - lastMove < 50) return;
      lastMove = now;
      const mx = event.clientX / (bounded ? mount.clientWidth : window.innerWidth) - 0.5;
      const my = event.clientY / (bounded ? mount.clientHeight : window.innerHeight) - 0.5;
      gsap.to(particlesMesh.rotation, { x: my * 0.4, y: mx * 0.4, duration: 1.2, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    let running = true;
    const render = () => {
      if (!running) return;
      particlesMesh.rotation.y += 0.0008;
      particlesMesh.rotation.x += 0.0006;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };
    render();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          running = entry.isIntersecting;
          if (running) render();
        });
      },
      { root: null, threshold: 0.1 }
    );
    io.observe(mount);

    const handleResize = () => setRendererSize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      io.disconnect();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [count, size, opacity, bounded]);

  return <div ref={mountRef} className={className} style={{ background: 'transparent' }} />;
};

export default ThreeBackground;
