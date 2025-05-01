import { useRef, useEffect } from 'react';
import GlitchText from '@/components/ui/glitch-text';
import ThreeDCube from '@/components/ThreeDCube';
import ParallaxEffect from '@/components/ui/parallax-effect';

const HeroSection = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  return (
    <section id="home" className="min-h-screen pt-28 md:pt-24 pb-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <ParallaxEffect containerRef={parallaxRef}>
            <div ref={parallaxRef} className="parallax">
              <h1 className="font-pixel text-4xl md:text-5xl lg:text-6xl mb-4 text-neon-blue parallax-item">
                <GlitchText text="JOTAVE" />
              </h1>
              <div className="h-1 w-32 bg-neon-pink mb-6 parallax-item"></div>
              <p className="font-digital text-xl md:text-2xl mb-8 terminal-text parallax-item">
                <span className="text-neon-green">FRONT-END DEVELOPER</span> & <span className="text-neon-pink">UI/UX DESIGNER</span>
              </p>
              <p className="text-gray-300 mb-8 max-w-lg parallax-item">
                Creating digital experiences at the intersection of technology and art.
                Specializing in cybertribal aesthetics and cutting-edge frontend development.
              </p>
              <div className="flex flex-wrap gap-4 parallax-item">
                <a 
                  href="#contact" 
                  className="inline-block bg-neon-pink text-cyber-black px-6 py-3 font-future font-bold rounded hover:bg-neon-blue transition-colors duration-300 animate-pulse-neon"
                >
                  HIRE ME
                </a>
                <a 
                  href="#projects" 
                  className="inline-block border-2 border-neon-blue text-neon-blue px-6 py-3 font-future font-bold rounded hover:bg-neon-blue hover:text-cyber-black transition-all duration-300"
                >
                  SEE MY WORK
                </a>
              </div>
            </div>
          </ParallaxEffect>
          
          <div className="relative">
            {/* 3D rotating cube with animated glow */}
            <div className="w-full h-64 md:h-96 relative perspective-1000 mx-auto max-w-md">
              <ThreeDCube />
            </div>
            
            {/* Social links */}
            <div className="flex justify-center mt-6 space-x-4">
              <a 
                href="https://github.com/jotavtech" 
                target="_blank" 
                rel="noreferrer"
                className="text-neon-blue hover:text-neon-pink transition-colors text-2xl"
              >
                <i className="fab fa-github"></i>
              </a>
              <a 
                href="https://wa.me/5583999290376" 
                target="_blank" 
                rel="noreferrer"
                className="text-neon-green hover:text-neon-pink transition-colors text-2xl"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a 
                href="mailto:martinsjoao1227@gmail.com" 
                className="text-neon-yellow hover:text-neon-pink transition-colors text-2xl"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgTCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNGRjAwRkYiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4yIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')]"></div>
      </div>
    </section>
  );
};

export default HeroSection;
