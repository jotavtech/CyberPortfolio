import { useQuery } from '@tanstack/react-query';
import GlitchText from '@/components/ui/glitch-text';
import { Service } from '@shared/schema';

const ServicesSection = () => {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  return (
    <section id="services" className="py-20 relative bg-cyber-black">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-neon-blue mb-4">
            <GlitchText text="DIGITAL SERVICES" />
          </h2>
          <div className="h-1 w-24 bg-neon-green mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Transforming ideas into digital reality with cutting-edge technology and creative design.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative overflow-hidden rounded-lg p-6 border border-neon-pink bg-deep-purple/30 animate-pulse">
                <div className="h-8 w-8 bg-neon-pink/30 rounded mb-4"></div>
                <div className="h-6 w-48 bg-neon-pink/30 rounded mb-3"></div>
                <div className="h-16 w-full bg-gray-700/30 rounded mb-4"></div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 w-full bg-gray-700/30 rounded"></div>
                  <div className="h-4 w-full bg-gray-700/30 rounded"></div>
                  <div className="h-4 w-full bg-gray-700/30 rounded"></div>
                </div>
                <div className="h-6 w-32 bg-neon-pink/30 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-neon-pink">
            Failed to load services. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services?.map((service) => (
              <div 
                key={service.id} 
                className={`group relative overflow-hidden rounded-lg p-6 border border-${service.borderColor} bg-deep-purple/30 hover:bg-deep-purple/50 transition-all duration-300`}
              >
                <div className={`absolute -bottom-16 -right-16 w-32 h-32 bg-${service.borderColor}/10 rounded-full group-hover:bg-${service.borderColor}/20 transition-all duration-300`}></div>
                <div className={`absolute -top-20 -left-20 w-40 h-40 bg-${service.accentColor}/5 rounded-full group-hover:bg-${service.accentColor}/10 transition-all duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`text-4xl text-${service.titleColor} mb-4`}>
                    <i className={service.icon}></i>
                  </div>
                  <h3 className={`font-future text-xl text-${service.titleColor} mb-3`}>{service.title}</h3>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <i className={`fas fa-check text-${service.checkColor} mr-2`}></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a 
                    href="#contact" 
                    className={`inline-block text-${service.titleColor} border-b border-${service.titleColor} hover:text-${service.hoverColor} hover:border-${service.hoverColor} transition-colors`}
                  >
                    Start a project <i className="fas fa-arrow-right ml-1"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* CTA Banner */}
        <div className="mt-16 relative overflow-hidden rounded-lg border border-neon-pink bg-gradient-to-r from-deep-purple/80 to-cyber-black p-8 md:p-12">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon-pink/10 rounded-full"></div>
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-neon-blue/10 rounded-full"></div>
          
          <div className="relative z-10 text-center">
            <h3 className="font-pixel text-2xl md:text-3xl text-neon-blue mb-4">READY TO BRING YOUR VISION TO LIFE?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's collaborate on creating a unique digital experience that will captivate your audience and elevate your brand.
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-neon-pink text-cyber-black px-8 py-4 font-future font-bold rounded-md hover:bg-neon-blue transition-colors duration-300 animate-pulse-neon"
            >
              GET IN TOUCH NOW <i className="fas fa-bolt ml-2"></i>
            </a>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzOUZGMTQiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaC00djFoNHYtMXptLTYgM2gtNHYxaDR2LTF6TTQyIDMxaC00djFoNHYtMXptLTYtMmgtNHYxaDR2LTF6TTM0IDI5aC00djFoNHYtMXptLTIgMmgtNHYxaDR2LTF6bS04IDBIMjB2MWg0di0xem02LThIMjB2MWgxMHYtMXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      </div>
    </section>
  );
};

export default ServicesSection;
