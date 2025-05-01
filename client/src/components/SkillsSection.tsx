import { useQuery } from '@tanstack/react-query';
import GlitchText from '@/components/ui/glitch-text';
import { Skill } from '@shared/schema';

const SkillsSection = () => {
  const { data: skills, isLoading, error } = useQuery<Skill[]>({
    queryKey: ['/api/skills'],
  });

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card-3d bg-gradient-to-br from-deep-purple/80 to-cyber-black border border-neon-blue p-6 rounded-lg animate-pulse">
                <div className="h-8 w-8 bg-neon-blue/20 rounded mb-4"></div>
                <div className="h-6 w-32 bg-neon-blue/20 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-700/30 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-700/30 rounded"></div>
                  <div className="h-4 w-full bg-gray-700/30 rounded"></div>
                  <div className="h-4 w-full bg-gray-700/30 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-neon-pink">
            Failed to load skills. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills?.map((skill) => (
              <div 
                key={skill.id} 
                className={`card-3d bg-gradient-to-br from-deep-purple/80 to-cyber-black border border-${skill.borderColor} p-6 rounded-lg hover:border-neon-pink group transition-all duration-300`}
              >
                <div className={`text-${skill.iconColor} text-4xl mb-4 group-hover:text-neon-pink transition-colors`}>
                  <i className={skill.icon}></i>
                </div>
                <h3 className={`font-future text-xl text-${skill.titleColor} mb-2 group-hover:text-neon-pink transition-colors`}>
                  {skill.title}
                </h3>
                <p className="text-gray-300 mb-4">{skill.description}</p>
                <ul className="space-y-2 text-sm">
                  {skill.items.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className={`inline-block w-2 h-2 bg-${item.bulletColor} mr-2`}></span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
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
