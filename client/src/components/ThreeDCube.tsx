import { useEffect, useRef } from 'react';

const ThreeDCube = () => {
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;

    let rotateY = 0;
    let rotateX = 0;
    let animationFrameId: number;

    const animateCube = () => {
      rotateY += 0.5;
      if (rotateY >= 360) rotateY = 0;
      
      cube.style.transform = `rotateY(${rotateY}deg) rotateX(${Math.sin(rotateY * Math.PI / 180) * 10}deg)`;
      
      animationFrameId = requestAnimationFrame(animateCube);
    };
    
    animateCube();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const faces = [
    { transform: 'rotateY(0deg) translateZ(5rem)', icon: 'fas fa-code', color: 'neon-blue', border: 'neon-pink' },
    { transform: 'rotateY(90deg) translateZ(5rem)', icon: 'fas fa-laptop-code', color: 'neon-green', border: 'neon-green' },
    { transform: 'rotateY(180deg) translateZ(5rem)', icon: 'fas fa-mobile-alt', color: 'neon-pink', border: 'neon-blue' },
    { transform: 'rotateY(270deg) translateZ(5rem)', icon: 'fas fa-paint-brush', color: 'digital-orange', border: 'digital-orange' },
    { transform: 'rotateX(90deg) translateZ(5rem)', icon: 'fas fa-database', color: 'neon-yellow', border: 'neon-yellow' },
    { transform: 'rotateX(-90deg) translateZ(5rem)', icon: 'fas fa-server', color: 'electric-purple', border: 'electric-purple' },
  ];

  return (
    <div className="cube w-full h-full relative animate-float" ref={cubeRef} style={{ transformStyle: 'preserve-3d' }}>
      {faces.map((face, index) => (
        <div 
          key={index} 
          className={`w-full h-full absolute border-2 border-${face.border} bg-cyber-black/50 flex items-center justify-center`}
          style={{ transform: face.transform }}
        >
          <i className={`${face.icon} text-6xl text-${face.color}`}></i>
        </div>
      ))}
    </div>
  );
};

export default ThreeDCube;
