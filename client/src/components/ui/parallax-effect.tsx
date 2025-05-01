import React, { useEffect, RefObject } from 'react';

interface ParallaxEffectProps {
  children: React.ReactNode;
  containerRef: RefObject<HTMLDivElement>;
  depth?: number;
}

const ParallaxEffect: React.FC<ParallaxEffectProps> = ({ children, containerRef, depth = 20 }) => {
  useEffect(() => {
    const parallaxContainer = containerRef.current;
    const parallaxItems = parallaxContainer?.querySelectorAll('.parallax-item');
    
    if (parallaxContainer && parallaxItems?.length) {
      const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        parallaxItems.forEach(item => {
          const moveX = (x * depth) - (depth / 2);
          const moveY = (y * depth) - (depth / 2);
          
          (item as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [containerRef, depth]);

  return <>{children}</>;
};

export default ParallaxEffect;
