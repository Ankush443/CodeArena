import { useEffect, useRef } from 'react';

const CursorTrail = () => {
  const trailRef = useRef(null);
  const glowRef = useRef(null);
  const particles = useRef([]);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const colors = [
      'rgba(6, 182, 212, 0.8)',    // cyan
      'rgba(59, 130, 246, 0.8)',   // blue
      'rgba(168, 85, 247, 0.8)',   // purple
      'rgba(236, 72, 153, 0.8)',   // pink
    ];

    const handleMouseMove = (e) => {
      const now = Date.now();
      
      // Update glow position
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX - 10}px`;
        glowRef.current.style.top = `${e.clientY - 10}px`;
      }

      // Throttle particle creation (create particle every 30ms)
      if (now - lastTime.current < 30) return;
      lastTime.current = now;

      // Create particle
      const particle = document.createElement('div');
      particle.className = 'cursor-particle';
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      particle.style.background = color;
      particle.style.boxShadow = `0 0 10px ${color}`;

      if (trailRef.current) {
        trailRef.current.appendChild(particle);
        particles.current.push(particle);

        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
          particles.current = particles.current.filter(p => p !== particle);
        }, 800);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      // Cleanup particles
      particles.current.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      particles.current = [];
    };
  }, []);

  return (
    <>
      <div ref={trailRef} className="cursor-trail" />
      <div ref={glowRef} className="cursor-glow" />
    </>
  );
};

export default CursorTrail;