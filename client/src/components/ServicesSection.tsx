import { useRef, useEffect } from 'react';
import HighlightText from '@/components/ui/glitch-text';
import { Service } from '../types';
import { services as mockServices } from '../data/mockData';

const ServicesSection = () => {
  // Usando dados locais em vez de consultar a API
  const services = mockServices;
  const isLoading = false;
  const error = null;
  
  const sectionRef = useRef<HTMLElement>(null);
  
  // Animação de fade-in nos cards de serviços
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = sectionRef.current?.querySelectorAll('.service-card');
            cards?.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('fade-in');
              }, 100 * index);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [services]);

  // Animação de hover para os cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  // Animação de carregamento skeleton para os cards
  const ServiceCardSkeleton = () => (
    <div className="bg-mono-deeper border border-mono-medium/20 rounded-sm p-8 animate-pulse h-full">
      <div className="flex items-center mb-6">
        <div className="h-10 w-10 bg-mono-medium/20 rounded-sm mr-4"></div>
        <div className="h-6 w-40 bg-mono-medium/20 rounded-sm"></div>
      </div>
      <div className="h-4 w-full bg-mono-medium/10 rounded-sm mb-8"></div>
      <div className="space-y-3">
        <div className="flex items-center">
          <div className="h-4 w-4 bg-mono-medium/20 rounded-sm mr-3"></div>
          <div className="h-4 w-full bg-mono-medium/10 rounded-sm"></div>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 bg-mono-medium/20 rounded-sm mr-3"></div>
          <div className="h-4 w-full bg-mono-medium/10 rounded-sm"></div>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 bg-mono-medium/20 rounded-sm mr-3"></div>
          <div className="h-4 w-full bg-mono-medium/10 rounded-sm"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="services" className="py-24 relative" ref={sectionRef}>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="font-future text-3xl md:text-4xl text-mono-white mb-4 tracking-wide">
              <HighlightText text="SERVIÇOS DIGITAIS" highlight="gradient" />
            </h2>
            <div className="h-1 w-16 bg-mono-white absolute -bottom-2 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-mono-medium mt-8 max-w-2xl mx-auto leading-relaxed">
            Oferecendo soluções digitais completas que combinam design estético com funcionalidade e performance.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-mono-white">
            Falha ao carregar serviços. Por favor, tente novamente mais tarde.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {services?.map(service => (
              <div
                key={service.id}
                className="service-card bg-gradient-to-b from-mono-deeper/90 to-mono-black border border-mono-white/10 rounded-sm p-8 flex flex-col h-full transform-gpu transition-all duration-500 opacity-0 translate-y-10 shadow-xl backdrop-blur-sm hover:border-mono-white/30"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4 text-mono-white">
                    <i className={service.icon}></i>
                  </div>
                  <h3 className="font-future text-xl text-mono-white tracking-wide">
                    {/* Tradução dinâmica dos títulos */}
                    {service.title === "Frontend Development" ? "Desenvolvimento Frontend" :
                      service.title === "UI/UX Design" ? "Design de UI/UX" :
                      service.title === "Mobile App Development" ? "Desenvolvimento Mobile" :
                      service.title === "Creative Web Experiences" ? "Experiências Web Criativas" :
                      service.title}
                  </h3>
                </div>
                
                <p className="text-mono-medium mb-8 leading-relaxed">
                  {/* Tradução dinâmica das descrições */}
                  {service.description.includes("Creating responsive") ? 
                    "Criando interfaces web responsivas e interativas com frameworks modernos e performance otimizada." :
                   service.description.includes("Crafting beautiful") ? 
                    "Elaborando interfaces de usuário bonitas e experiências que engajam usuários e atendem objetivos de negócio." :
                   service.description.includes("Building cross-platform") ? 
                    "Construindo aplicativos mobile multiplataforma com performance e experiência de usuário nativas." :
                   service.description.includes("Developing immersive") ? 
                    "Desenvolvendo experiências web imersivas com tecnologias avançadas de animação e interação." :
                   service.description}
                </p>
                
                <ul className="space-y-3 mt-auto">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-mono-white mr-3 mt-1">
                        <i className="fas fa-check text-xs"></i>
                      </span>
                      <span className="text-mono-light">
                        {/* Tradução dinâmica dos recursos */}
                        {feature.includes("React & Vue") ? "React & Vue.js" :
                         feature.includes("Responsive UIs") ? "Interfaces responsivas" :
                         feature.includes("Performance") ? "Otimização de performance" :
                         feature.includes("User research") ? "Pesquisa de usuários" :
                         feature.includes("Wireframing") ? "Wireframing e protótipos" :
                         feature.includes("Visual design") ? "Design visual" :
                         feature.includes("React Native") ? "React Native & Expo" :
                         feature.includes("Native UI") ? "Componentes UI nativos" :
                         feature.includes("App store") ? "Submissão para app stores" :
                         feature.includes("WebGL") ? "WebGL & Three.js" :
                         feature.includes("Advanced animations") ? "Animações avançadas" :
                         feature.includes("Interactive") ? "Storytelling interativo" :
                         feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;