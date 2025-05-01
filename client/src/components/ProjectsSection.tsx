import { useState } from 'react';
import HighlightText from '@/components/ui/glitch-text';
import { Project } from '../types';
import { projects as mockProjects } from '../data/mockData';

type ProjectCategory = 'all' | 'websites' | 'ui/ux' | 'mobile';

const ProjectsSection = () => {
  // Usando dados locais em vez de consultar a API
  const projects = mockProjects;
  const isLoading = false;
  const error = null;
  
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  
  // Filtrar projetos por categoria
  const filteredProjects = !projects
    ? []
    : activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  // Função para fazer a tradução dinâmica das categorias
  const translateCategory = (category: string) => {
    switch (category) {
      case 'all':
        return 'Todos';
      case 'websites':
        return 'Websites';
      case 'ui/ux':
        return 'UI/UX';
      case 'mobile':
        return 'Mobile';
      default:
        return category;
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="font-future text-3xl md:text-4xl text-mono-white mb-4 tracking-wide">
              <HighlightText text="PROJETOS RECENTES" highlight="gradient" />
            </h2>
            <div className="h-1 w-16 bg-mono-white absolute -bottom-2 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-mono-medium mt-8 max-w-2xl mx-auto leading-relaxed">
            Uma seleção de trabalhos recentes em desenvolvimento web, design de interfaces e experiência do usuário.
          </p>
        </div>
        
        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'websites', 'ui/ux', 'mobile'].map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as ProjectCategory)}
              className={`px-6 py-2 rounded-sm border transition-all hover:bg-mono-white hover:text-mono-black transform active:scale-95 ${
                activeCategory === category
                  ? 'border-mono-white text-mono-white'
                  : 'border-mono-medium text-mono-medium'
              }`}
            >
              {translateCategory(category)}
            </button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-mono-deeper border border-mono-medium/20 rounded-sm overflow-hidden shadow-lg animate-pulse">
                <div className="h-56 bg-mono-medium/10"></div>
                <div className="p-6">
                  <div className="h-6 bg-mono-medium/20 rounded-sm mb-4 w-2/3"></div>
                  <div className="h-4 bg-mono-medium/10 rounded-sm mb-4"></div>
                  <div className="h-4 bg-mono-medium/10 rounded-sm mb-6 w-5/6"></div>
                  <div className="flex justify-between">
                    <div className="h-10 w-28 bg-mono-medium/20 rounded-sm"></div>
                    <div className="h-10 w-28 bg-mono-medium/10 rounded-sm"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-mono-white">
            Falha ao carregar projetos. Por favor, tente novamente mais tarde.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            {filteredProjects.map(project => (
              <div 
                key={project.id}
                className="bg-gradient-to-b from-mono-deeper to-mono-black border border-mono-white/10 rounded-sm overflow-hidden shadow-xl group transition-transform hover:-translate-y-2 backdrop-blur-sm"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mono-black/70 to-transparent opacity-100"></div>
                </div>
                <div className="p-6 relative">
                  <h3 
                    className={`font-future text-xl mb-3 text-mono-white`}
                  >
                    {project.title}
                  </h3>
                  <p className="text-mono-medium mb-4">
                    {project.description}
                  </p>
                  <div className="text-mono-light text-sm mb-5">
                    <span className="font-mono">
                      {project.technologies}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <a 
                      href={project.projectUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`py-2 px-4 border border-mono-white/80 text-mono-white rounded-sm transition-all hover:bg-mono-white hover:text-mono-black transform active:scale-95 inline-flex items-center gap-2`}
                    >
                      <i className="fas fa-external-link-alt text-xs"></i>
                      Ver Projeto
                    </a>
                    <a 
                      href={project.caseStudyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`py-2 px-4 border border-mono-medium/50 text-mono-medium rounded-sm transition-all hover:bg-mono-white hover:text-mono-black hover:border-mono-white transform active:scale-95 inline-flex items-center gap-2`}
                    >
                      <i className="fas fa-file-alt text-xs"></i>
                      Detalhes
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;