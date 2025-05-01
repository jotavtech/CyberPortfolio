import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import HighlightText from '@/components/ui/glitch-text';
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
    
    // Definir cores baseadas no skillColor (agora em escala monocromática)
    let particleColor = 'hsl(0, 0%, 100%)'; // Branco
    
    if (skillColor === 'neon-pink' || skillColor === 'digital-orange') {
      particleColor = 'hsl(0, 0%, 100%)'; // Branco
    } else if (skillColor === 'neon-green' || skillColor === 'neon-yellow') {
      particleColor = 'hsl(0, 0%, 90%)'; // Cinza claro
    } else if (skillColor === 'neon-blue' || skillColor === 'electric-purple') {
      particleColor = 'hsl(0, 0%, 80%)'; // Cinza médio
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

  // Rotação automática dos cards a cada 5 segundos se não houver interação
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && skills && skills.length > 0) {
        goToNextCard();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAnimating, skills]);

  // Função para gerar os estilos z-index e transform para cada card
  const getCardStyle = (index: number) => {
    if (!skills) return {};
    
    const totalCards = skills.length;
    const diff = (index - currentIndex + totalCards) % totalCards;
    
    // Z-index: maior para o card atual, diminuindo conforme os cards se afastam
    const zIndex = totalCards - diff;
    
    // Rotação: adicionar leve rotação para efeito de empilhamento
    const rotate = diff * 2;
    
    // Offset: cards atrás do card atual são incrementalmente deslocados
    const translateY = diff * 5;
    
    // Escala: cards atrás do card atual são incrementalmente menores
    const scale = 1 - (diff * 0.05);
    
    // Opacidade: cards mais ao fundo são mais transparentes
    const opacity = 1 - (diff * 0.15);
    
    return {
      zIndex,
      transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
      opacity: opacity > 0 ? opacity : 0,
      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    };
  };

  // Animação de carregamento skeleton para os cards
  const SkillCardSkeleton = () => (
    <div className="skills-card border bg-gradient-to-b from-mono-deeper to-mono-black/90 border-mono-medium/30 p-8 rounded-sm animate-pulse absolute w-full shadow-2xl backdrop-blur-sm">
      <div className="flex items-center mb-6">
        <div className="h-8 w-8 bg-mono-white/20 rounded-sm mr-4"></div>
        <div className="h-6 w-32 bg-mono-medium/20 rounded-sm"></div>
      </div>
      <div className="h-4 w-full bg-mono-medium/10 rounded-sm mb-6"></div>
      <div className="space-y-3">
        <div className="flex items-center">
          <div className="h-1.5 w-1.5 bg-mono-medium/20 rounded-full mr-3"></div>
          <div className="h-4 w-full bg-mono-medium/10 rounded-sm"></div>
        </div>
        <div className="flex items-center">
          <div className="h-1.5 w-1.5 bg-mono-medium/20 rounded-full mr-3"></div>
          <div className="h-4 w-full bg-mono-medium/10 rounded-sm"></div>
        </div>
        <div className="flex items-center">
          <div className="h-1.5 w-1.5 bg-mono-medium/20 rounded-full mr-3"></div>
          <div className="h-4 w-full bg-mono-medium/10 rounded-sm"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-24 relative bg-mono-black">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="font-future text-3xl md:text-4xl text-mono-white mb-4 tracking-wide">
              <HighlightText text="EXPERIÊNCIA & HABILIDADES" highlight="gradient" />
            </h2>
            <div className="h-1 w-16 bg-mono-white absolute -bottom-2 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-mono-medium mt-8 max-w-2xl mx-auto leading-relaxed">
            Equipado com habilidades técnicas focadas em design e experiência para criar experiências digitais modernas e envolventes.
          </p>
        </div>
        
        {isLoading ? (
          <div className="relative h-[400px] md:h-[450px] w-full max-w-3xl mx-auto mt-16">
            <div className="absolute inset-0 flex items-center justify-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="absolute" style={{ transform: `translateY(${i * 10}px)` }}>
                  <SkillCardSkeleton />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-mono-white">
            Falha ao carregar habilidades. Por favor, tente novamente mais tarde.
          </div>
        ) : (
          <div className="relative h-[400px] md:h-[450px] w-full max-w-3xl mx-auto mt-16">
            {/* Efeito de partículas de energia com a cor do card atual */}
            {skills && skills[currentIndex] && (
              <EnergyParticles skillColor={skills[currentIndex].iconColor} />
            )}
            
            <div className="absolute inset-0 skills-cards-container" ref={cardsContainerRef}>
              {/* Cards sobrepostos - empilhados um sobre o outro */}
              <div className="relative w-full h-full perspective-1000">
                {skills?.map((skill, index) => (
                  <div
                    key={skill.id}
                    className={`skills-card absolute top-0 left-0 w-full p-8 rounded-sm border bg-gradient-to-b from-mono-deeper/95 to-mono-black shadow-2xl backdrop-blur-sm
                      ${currentIndex === index ? 'animate-card-glow' : ''}
                      ${direction === 'next' && currentIndex === index ? 'animate-card-enter-right' : ''}
                      ${direction === 'prev' && currentIndex === index ? 'animate-card-enter-left' : ''}
                    `}
                    style={{
                      ...getCardStyle(index),
                      borderColor: `hsl(var(--mono-white))`
                    }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="text-3xl mr-4 transition-colors text-mono-white">
                        <i className={skill.icon}></i>
                      </div>
                      <h3 className="font-future text-xl transition-colors tracking-wider text-mono-white">
                        {/* Tradução dinâmica dos títulos */}
                        {skill.title === "Frontend Development" ? "Desenvolvimento Frontend" :
                         skill.title === "UI/UX Design" ? "Design de UI/UX" :
                         skill.title === "Mobile Development" ? "Desenvolvimento Mobile" :
                         skill.title === "Web Animation" ? "Animação Web" :
                         skill.title}
                      </h3>
                    </div>
                    
                    <p className="text-mono-medium mb-6 leading-relaxed">
                      {/* Tradução dinâmica das descrições */}
                      {skill.description.includes("Creating modern") ? 
                        "Criando interfaces web modernas, responsivas e de alta performance com as mais recentes tecnologias frontend." :
                      skill.description.includes("Designing intuitive") ? 
                        "Projetando interfaces de usuário intuitivas e experiências de usuário que equilibram estética e funcionalidade." :
                      skill.description.includes("Building responsive") ? 
                        "Construindo aplicativos mobile responsivos e de alta performance para as plataformas iOS e Android." :
                      skill.description.includes("Crafting engaging") ? 
                        "Criando animações web envolventes e interativas que elevam a experiência do usuário e o engajamento." :
                      skill.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {skill.items.map((item, idx) => (
                        <li key={idx} className="flex items-center text-mono-light">
                          <span 
                            className="inline-block w-1.5 h-1.5 mr-3 rounded-full bg-mono-white"
                          ></span>
                          {/* Tradução dinâmica dos itens */}
                          {item.text.includes("React") && item.text.includes("Next.js") ? "React, Next.js e ecossistema moderno" :
                           item.text.includes("Responsive") ? "Design responsivo e mobile-first" :
                           item.text.includes("Performance") ? "Otimização de performance e acessibilidade" :
                           item.text.includes("User-centered") ? "Design centrado no usuário e prototipagem" :
                           item.text.includes("Wireframing") ? "Wireframing, testes de usabilidade" :
                           item.text.includes("Design systems") ? "Sistemas de design e documentação" :
                           item.text.includes("React Native") ? "React Native e Flutter" :
                           item.text.includes("Native") ? "Integrações nativas e APIs" :
                           item.text.includes("CI/CD") ? "CI/CD e distribuição de apps" :
                           item.text.includes("GSAP") ? "GSAP, Framer Motion, Three.js" :
                           item.text.includes("CSS") ? "CSS avançado e animações SVG" :
                           item.text.includes("Particle") ? "Sistemas de partículas e efeitos visuais" :
                           item.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Botões de navegação */}
              <div className="absolute bottom-[-60px] left-0 right-0 flex justify-center items-center gap-10">
                <button
                  onClick={goToPrevCard}
                  disabled={isAnimating}
                  className="w-10 h-10 flex items-center justify-center rounded-sm bg-transparent border border-mono-medium text-mono-medium hover:bg-mono-white hover:border-mono-white hover:text-mono-black transition-colors disabled:opacity-50 active:scale-95"
                  aria-label="Habilidade anterior"
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
                      className={`w-2.5 h-2.5 rounded-sm transition-all duration-300 ${
                        currentIndex === idx 
                          ? 'bg-mono-white scale-125' 
                          : 'bg-mono-medium hover:bg-mono-light'
                      }`}
                      aria-label={`Ir para habilidade ${idx + 1}`}
                    ></button>
                  ))}
                </div>
                
                <button
                  onClick={goToNextCard}
                  disabled={isAnimating}
                  className="w-10 h-10 flex items-center justify-center rounded-sm bg-transparent border border-mono-medium text-mono-medium hover:bg-mono-white hover:border-mono-white hover:text-mono-black transition-colors disabled:opacity-50 active:scale-95"
                  aria-label="Próxima habilidade"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-32 text-center">
          <a 
            href="#contact" 
            className="inline-block bg-mono-white text-mono-black px-8 py-3 font-future tracking-wider hover:bg-mono-medium hover:text-mono-black transition-colors duration-300 button-highlight"
          >
            TRABALHE COMIGO <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
      
      {/* Padrão de fundo sutil */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div className="h-full w-full bg-gradient-to-b from-transparent to-mono-white/10"></div>
      </div>
    </section>
  );
};

export default SkillsSection;
