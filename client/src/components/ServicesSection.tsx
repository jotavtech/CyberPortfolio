import { useQuery } from '@tanstack/react-query';
import GlitchText from '@/components/ui/glitch-text';
import { Service } from '@shared/schema';
import { useRef, useEffect } from 'react';

const ServicesSection = () => {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });
  
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Efeito para adicionar destaque em cards ao rolar a página
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card) => observer.observe(card));
    
    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, [services]);

  // Função para rolagem suave
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 relative bg-mono-black">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-5xl text-mono-white mb-4">
            <GlitchText text="SERVIÇOS DIGITAIS" highlight="gradient" />
          </h2>
          <div className="h-1 w-24 bg-mono-white mx-auto"></div>
          <p className="text-mono-medium mt-6 max-w-2xl mx-auto text-lg">
            Transformando ideias em realidade digital com tecnologia de ponta e design criativo.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative overflow-hidden rounded-xl p-8 border border-mono-white/20 bg-mono-black/80 animate-pulse">
                <div className="h-12 w-12 bg-mono-white/30 rounded-full mb-6"></div>
                <div className="h-8 w-48 bg-mono-white/30 rounded mb-4"></div>
                <div className="h-20 w-full bg-mono-white/10 rounded mb-6"></div>
                <div className="space-y-3 mb-8">
                  <div className="h-4 w-full bg-mono-white/10 rounded"></div>
                  <div className="h-4 w-full bg-mono-white/10 rounded"></div>
                  <div className="h-4 w-full bg-mono-white/10 rounded"></div>
                </div>
                <div className="h-10 w-40 bg-mono-white/30 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-mono-white p-10 bg-mono-black/30 border border-mono-white/20 rounded-xl backdrop-blur-sm">
            Não foi possível carregar os serviços. Por favor, tente novamente mais tarde.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services?.map((service, index) => (
              <div 
                key={service.id} 
                className={`service-card group relative overflow-hidden rounded-xl p-8 border-2 border-mono-white/30 bg-mono-black/80 
                  backdrop-blur-md transition-all duration-500 hover:border-mono-white hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] 
                  opacity-0 translate-y-10 delay-${index * 100}`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Elemento decorativo 1 */}
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-mono-white/5 rounded-full 
                  group-hover:bg-mono-white/10 group-hover:scale-110 transition-all duration-700"></div>
                
                {/* Elemento decorativo 2 */}
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-mono-white/3 rounded-full 
                  group-hover:bg-mono-white/8 group-hover:scale-110 transition-all duration-700"></div>
                
                <div className="relative z-10">
                  {/* Ícone com destaque */}
                  <div className="text-5xl text-mono-white mb-6 transform group-hover:scale-110 transition-transform duration-300
                    p-4 inline-block rounded-full bg-mono-deeper/80 group-hover:bg-mono-deeper border border-mono-white/20">
                    <i className={service.icon}></i>
                  </div>
                  
                  {/* Título com efeito de destaque */}
                  <h3 className="font-future text-2xl text-mono-white mb-4 group-hover:text-mono-white transition-colors relative">
                    {service.title}
                    <span className="block h-1 w-12 bg-mono-white/50 mt-2 group-hover:w-full transition-all duration-300"></span>
                  </h3>
                  
                  {/* Descrição com melhor legibilidade */}
                  <p className="text-mono-medium mb-6 leading-relaxed text-lg">{service.description}</p>
                  
                  {/* Lista de características com animação */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center group-hover:translate-x-1 transition-transform" 
                          style={{transitionDelay: `${index * 0.05}s`}}>
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-mono-white/10 mr-3 group-hover:bg-mono-white/20 transition-colors">
                          <i className="fas fa-check text-mono-white text-xs"></i>
                        </span>
                        <span className="text-mono-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Botão com destaque */}
                  <a 
                    href="#contact"
                    onClick={(e) => smoothScroll(e, '#contact')} 
                    className="inline-flex items-center justify-center px-6 py-3 border border-mono-white/30 
                      text-mono-white hover:bg-mono-white hover:text-mono-black transition-all 
                      duration-300 group-hover:border-mono-white"
                  >
                    <span className="mr-2">Iniciar projeto</span>
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* CTA Banner mais chamativo */}
        <div className="mt-24 relative overflow-hidden rounded-xl border-2 border-mono-white/40 
          bg-gradient-to-r from-mono-deeper to-mono-black p-10 md:p-14 
          shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-md">
          
          {/* Elementos decorativos */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-mono-white/5 rounded-full"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-mono-white/5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full 
            bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
          
          <div className="relative z-10 text-center">
            <h3 className="font-pixel text-2xl md:text-4xl text-mono-white mb-6">
              PRONTO PARA DAR VIDA À SUA VISÃO?
            </h3>
            <p className="text-mono-medium mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Vamos colaborar na criação de uma experiência digital única que cativará seu público e elevará sua marca.
            </p>
            <a 
              href="#contact"
              onClick={(e) => smoothScroll(e, '#contact')} 
              className="inline-flex items-center justify-center px-8 py-4 bg-mono-white text-mono-black font-future font-bold 
                hover:bg-transparent hover:text-mono-white border-2 border-mono-white transition-all duration-300 
                shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              ENTRE EM CONTATO AGORA <i className="fas fa-bolt ml-3"></i>
            </a>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaC00djFoNHYtMXptLTYgM2gtNHYxaDR2LTF6TTQyIDMxaC00djFoNHYtMXptLTYtMmgtNHYxaDR2LTF6TTM0IDI5aC00djFoNHYtMXptLTIgMmgtNHYxaDR2LTF6bS04IDBIMjB2MWg0di0xem02LThIMjB2MWgxMHYtMXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        {/* Linhas de grade */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Brilho central sutil */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-96 
          bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_60%)]"></div>
      </div>
      
      {/* CSS injetado diretamente no head via useEffect */}
    </section>
  );
};

export default ServicesSection;
