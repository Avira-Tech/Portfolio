import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 2000;
    
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for(let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
      
      // GSAP animation on mouse move
      gsap.to(particlesMesh.rotation, {
        x: mouseY * 0.5,
        y: mouseX * 0.5,
        duration: 2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Gentle constant rotation
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.001;
      
      // Wave effect
      const positions = particlesGeometry.attributes.position.array;
      for(let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = particlesGeometry.attributes.position.array[i3];
        // positions[i3 + 1] = Math.sin(elapsedTime + x) * 0.5; // Simple wave on Y axis
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      
      // Dispose resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default ThreeBackground;
