import { useRef, useEffect } from 'react';
import GlitchText from '@/components/ui/glitch-text';
import ThreeDCube from '@/components/ThreeDCube';
import ParallaxEffect from '@/components/ui/parallax-effect';

const HeroSection = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  return (
    <section id="home" className="min-h-screen pt-28 md:pt-24 pb-16 relative overflow-hidden bg-mono-black">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <ParallaxEffect containerRef={parallaxRef}>
            <div ref={parallaxRef} className="parallax">
              <h1 className="font-pixel text-4xl md:text-5xl lg:text-6xl mb-4 text-mono-white parallax-item">
                <GlitchText text="JOTAVE" />
              </h1>
              <div className="h-1 w-32 bg-mono-white mb-6 parallax-item"></div>
              <p className="font-digital text-xl md:text-2xl mb-8 terminal-text parallax-item">
                <span className="text-mono-white">DESENVOLVEDOR FRONT-END</span> & <span className="text-mono-light">DESIGNER UI/UX</span>
              </p>
              <p className="text-mono-medium mb-8 max-w-lg parallax-item">
                Criando experiências digitais na interseção entre tecnologia e arte.
                Especializado em desenvolvimento frontend moderno com foco em design e usabilidade.
              </p>
              <div className="flex flex-wrap gap-4 parallax-item">
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#contact');
                    if (element) {
                      window.scrollTo({
                        top: element.getBoundingClientRect().top + window.scrollY - 80,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="inline-block bg-mono-white text-mono-black px-6 py-3 font-future font-bold hover:bg-mono-medium transition-colors duration-300 button-highlight"
                >
                  CONTRATE-ME
                </a>
                <a 
                  href="#projects" 
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#projects');
                    if (element) {
                      window.scrollTo({
                        top: element.getBoundingClientRect().top + window.scrollY - 80,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="inline-block border-2 border-mono-medium text-mono-medium px-6 py-3 font-future font-bold hover:border-mono-white hover:text-mono-white transition-all duration-300"
                >
                  VER PROJETOS
                </a>
              </div>
            </div>
          </ParallaxEffect>
          
          <div className="relative">
            {/* Cubo 3D rotativo com brilho animado */}
            <div className="w-full h-64 md:h-96 relative perspective-1000 mx-auto max-w-md">
              <ThreeDCube />
            </div>
            
            {/* Links de redes sociais */}
            <div className="flex justify-center mt-6 space-x-4">
              <a 
                href="https://github.com/jotavtech" 
                target="_blank" 
                rel="noreferrer"
                className="text-mono-white hover:text-mono-medium transition-colors text-2xl"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a 
                href="https://wa.me/5583999290376" 
                target="_blank" 
                rel="noreferrer"
                className="text-mono-white hover:text-mono-medium transition-colors text-2xl"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a 
                href="mailto:martinsjoao1227@gmail.com" 
                className="text-mono-white hover:text-mono-medium transition-colors text-2xl"
                aria-label="Email"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Elementos de fundo */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgTCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4zIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')]"></div>
      </div>
    </section>
  );
};

export default HeroSection;
