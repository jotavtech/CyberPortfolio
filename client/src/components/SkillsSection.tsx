import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import GlitchText from '@/components/ui/glitch-text';
import { Skill } from '@shared/schema';

// Componente de partículas de energia
const EnergyParticles = ({ skillColor }: { skillColor: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Definindo o tamanho do canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Classe para as partículas
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor(color: string) {
        this.x = Math.random() * (canvas?.width || 800);
        this.y = Math.random() * (canvas?.height || 600);
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = color;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.size > 0.2) this.size -= 0.01;
        
        // Manter partículas dentro do canvas com rebote nas bordas
        if (this.x > (canvas?.width || 800) || this.x < 0) {
          this.speedX *= -1;
        }
        
        if (this.y > (canvas?.height || 600) || this.y < 0) {
          this.speedY *= -1;
        }
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Adicionar um brilho (glow)
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
      }
    }
    
    // Criar array de partículas
    const particlesArray: Particle[] = [];
    const numberOfParticles = 30;
    
    // Definir cores baseadas no skillColor
    let particleColor = 'hsl(180, 100%, 60%)'; // Padrão azul neon
    
    if (skillColor === 'neon-pink') {
      particleColor = 'hsl(300, 100%, 60%)';
    } else if (skillColor === 'neon-green') {
      particleColor = 'hsl(120, 100%, 60%)';
    } else if (skillColor === 'neon-yellow') {
      particleColor = 'hsl(60, 100%, 60%)';
    } else if (skillColor === 'digital-orange') {
      particleColor = 'hsl(25, 100%, 60%)';
    } else if (skillColor === 'electric-purple') {
      particleColor = 'hsl(280, 100%, 60%)';
    }
    
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(particleColor));
    }
    
    // Função de animação
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      // Conectar partículas próximas com linhas
      connectParticles();
      
      requestAnimationFrame(animate);
    };
    
    // Função para conectar partículas próximas
    const connectParticles = () => {
      if (!ctx) return;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.strokeStyle = particleColor;
            ctx.lineWidth = 0.2;
            ctx.globalAlpha = 1 - (distance / 100);
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [skillColor]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
    />
  );
};

const SkillsSection = () => {
  const { data: skills, isLoading, error } = useQuery<Skill[]>({
    queryKey: ['/api/skills'],
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Função para ir para o próximo card
  const goToNextCard = () => {
    if (isAnimating || !skills) return;
    
    setDirection('next');
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % skills.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Função para ir para o card anterior
  const goToPrevCard = () => {
    if (isAnimating || !skills) return;
    
    setDirection('prev');
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (skills?.length || 0)) % (skills?.length || 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Auto-rotate cards every 5 seconds if not interacting
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && skills && skills.length > 0) {
        goToNextCard();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAnimating, skills]);

  // Function to generate the z-index and transform styles for each card
  const getCardStyle = (index: number) => {
    if (!skills) return {};
    
    const totalCards = skills.length;
    const diff = (index - currentIndex + totalCards) % totalCards;
    
    // Z-index: highest for current card, decreasing as cards get further away
    const zIndex = totalCards - diff;
    
    // Rotation: add slight rotation for stacked effect
    const rotate = diff * 2;
    
    // Offset: cards behind current card are increasingly offset
    const translateY = diff * 5;
    
    // Scale: cards behind current card are increasingly smaller
    const scale = 1 - (diff * 0.05);
    
    // Opacity: cards further back are more transparent
    const opacity = 1 - (diff * 0.15);
    
    return {
      zIndex,
      transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
      opacity: opacity > 0 ? opacity : 0,
      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    };
  };

  // Skeleton loader animation for cards
  const SkillCardSkeleton = () => (
    <div className="card-3d bg-gradient-to-br from-deep-purple/80 to-cyber-black border border-neon-blue p-6 rounded-lg animate-pulse absolute w-full">
      <div className="h-8 w-8 bg-neon-blue/20 rounded mb-4"></div>
      <div className="h-6 w-32 bg-neon-blue/20 rounded mb-2"></div>
      <div className="h-4 w-full bg-gray-700/30 rounded mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-700/30 rounded"></div>
        <div className="h-4 w-full bg-gray-700/30 rounded"></div>
        <div className="h-4 w-full bg-gray-700/30 rounded"></div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 relative bg-cyber-black">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-neon-green mb-4">
            <GlitchText text="TECH ARSENAL" />
          </h2>
          <div className="h-1 w-24 bg-neon-pink mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Equipped with a diverse set of cutting-edge tools and technologies to create immersive digital experiences.
          </p>
        </div>
        
        {isLoading ? (
          <div className="relative h-[400px] md:h-[450px] w-full max-w-3xl mx-auto mt-12">
            <div className="absolute inset-0 flex items-center justify-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="absolute" style={{ transform: `translateY(${i * 10}px)` }}>
                  <SkillCardSkeleton />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-neon-pink">
            Failed to load skills. Please try again later.
          </div>
        ) : (
          <div className="relative h-[400px] md:h-[450px] w-full max-w-3xl mx-auto mt-12">
            {/* Efeito de partículas de energia com a cor do card atual */}
            {skills && skills[currentIndex] && (
              <EnergyParticles skillColor={skills[currentIndex].iconColor} />
            )}
            
            <div className="absolute inset-0 skills-cards-container" ref={cardsContainerRef}>
              {/* Overlay cards - stacked one over the other */}
              <div className="relative w-full h-full perspective-1000">
                {skills?.map((skill, index) => (
                  <div
                    key={skill.id}
                    className={`skills-card card-3d absolute top-0 left-0 w-full p-6 rounded-lg border-2 bg-gradient-to-br from-deep-purple/80 to-cyber-black
                      ${currentIndex === index ? 'animate-card-glow' : ''}
                      ${direction === 'next' && currentIndex === index ? 'animate-card-enter-right' : ''}
                      ${direction === 'prev' && currentIndex === index ? 'animate-card-enter-left' : ''}
                    `}
                    style={{
                      ...getCardStyle(index),
                      borderColor: `hsl(var(--${skill.borderColor}))`
                    }}
                  >
                    <div className={`text-4xl mb-4 transition-colors`} style={{ color: `hsl(var(--${skill.iconColor}))` }}>
                      <i className={skill.icon}></i>
                    </div>
                    <h3 className={`font-future text-xl mb-2 transition-colors`} style={{ color: `hsl(var(--${skill.titleColor}))` }}>
                      {skill.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{skill.description}</p>
                    <ul className="space-y-2 text-sm">
                      {skill.items.map((item, idx) => (
                        <li key={idx} className="flex items-center">
                          <span 
                            className={`inline-block w-2 h-2 mr-2 rounded-full`}
                            style={{ backgroundColor: `hsl(var(--${item.bulletColor}))` }}
                          ></span>
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="absolute bottom-[-60px] left-0 right-0 flex justify-center items-center gap-8">
                <button
                  onClick={goToPrevCard}
                  disabled={isAnimating}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-cyber-black border-2 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-cyber-black transition-colors disabled:opacity-50 hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] active:scale-95"
                  aria-label="Previous skill"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                <div className="flex space-x-3">
                  {skills?.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (isAnimating) return;
                        
                        const newDirection = idx > currentIndex ? 'next' : 'prev';
                        setDirection(newDirection);
                        setIsAnimating(true);
                        setCurrentIndex(idx);
                        
                        setTimeout(() => {
                          setIsAnimating(false);
                        }, 500);
                      }}
                      disabled={isAnimating || currentIndex === idx}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentIndex === idx 
                          ? 'bg-neon-pink scale-125 shadow-[0_0_10px_rgba(255,0,255,0.5)]' 
                          : 'bg-gray-700 hover:bg-gray-500'
                      }`}
                      aria-label={`Go to skill ${idx + 1}`}
                    ></button>
                  ))}
                </div>
                
                <button
                  onClick={goToNextCard}
                  disabled={isAnimating}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-cyber-black border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-cyber-black transition-colors disabled:opacity-50 hover:shadow-[0_0_15px_rgba(255,0,255,0.5)] active:scale-95"
                  aria-label="Next skill"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-24 text-center">
          <a 
            href="#contact" 
            className="inline-block bg-neon-green text-cyber-black px-6 py-3 font-future font-bold rounded hover:bg-neon-blue transition-colors duration-300"
          >
            WORK WITH ME <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPgo8cmVjdCB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBmaWxsPSIjMEQwRDBEIj48L3JlY3Q+CjxwYXRoIGQ9Ik0yOCA2NkwwIDUwTDAgMTZMMjggMEw1NiAxNkw1NiA1MEwyOCA2NkwyOCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzM5RkYxNCIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+CjxwYXRoIGQ9Ik0yOCAwTDI4IDY2TDU2IDUwTDU2IDE2TDI4IDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGMDBGRiIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+Cjwvc3ZnPg==')]"></div>
      </div>
    </section>
  );
};

export default SkillsSection;
