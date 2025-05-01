import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import GlitchText from '@/components/ui/glitch-text';
import { Project } from '@shared/schema';

type ProjectCategory = 'all' | 'websites' | 'ui/ux' | 'mobile';

const ProjectsSection = () => {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const filteredProjects = projects?.filter(project => 
    filter === 'all' || project.category === filter
  );

  return (
    <section id="projects" className="py-20 relative bg-deep-purple">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-neon-yellow mb-4">
            <GlitchText text="DIGITAL CREATIONS" />
          </h2>
          <div className="h-1 w-24 bg-neon-blue mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Explore a selection of my latest projects showcasing innovative design and technical expertise.
          </p>
        </div>
        
        {/* Project Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button 
            className={`px-4 py-2 bg-cyber-black text-neon-blue border border-neon-blue rounded-md hover:bg-neon-blue hover:text-cyber-black transition-colors ${filter === 'all' ? 'bg-neon-blue text-cyber-black' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 bg-cyber-black text-neon-pink border border-neon-pink rounded-md hover:bg-neon-pink hover:text-cyber-black transition-colors ${filter === 'websites' ? 'bg-neon-pink text-cyber-black' : ''}`}
            onClick={() => setFilter('websites')}
          >
            Websites
          </button>
          <button 
            className={`px-4 py-2 bg-cyber-black text-neon-green border border-neon-green rounded-md hover:bg-neon-green hover:text-cyber-black transition-colors ${filter === 'ui/ux' ? 'bg-neon-green text-cyber-black' : ''}`}
            onClick={() => setFilter('ui/ux')}
          >
            UI/UX
          </button>
          <button 
            className={`px-4 py-2 bg-cyber-black text-neon-yellow border border-neon-yellow rounded-md hover:bg-neon-yellow hover:text-cyber-black transition-colors ${filter === 'mobile' ? 'bg-neon-yellow text-cyber-black' : ''}`}
            onClick={() => setFilter('mobile')}
          >
            Mobile
          </button>
        </div>
        
        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative rounded-lg border-2 border-neon-blue overflow-hidden h-64 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent opacity-80 z-10"></div>
                <div className="w-full h-full bg-deep-purple/40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <div className="h-6 w-32 bg-neon-blue/30 rounded mb-2"></div>
                  <div className="h-4 w-48 bg-gray-400/30 rounded mb-3"></div>
                  <div className="flex space-x-3">
                    <div className="h-8 w-24 bg-neon-blue/20 rounded"></div>
                    <div className="h-8 w-24 bg-neon-pink/20 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-neon-pink mb-10">
            Failed to load projects. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredProjects?.map((project) => (
              <div 
                key={project.id} 
                className={`group relative overflow-hidden rounded-lg border-2 border-${project.borderColor} hover:border-neon-pink transition-colors duration-300`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent opacity-80 z-10"></div>
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className={`font-future text-xl text-${project.titleColor} group-hover:text-neon-pink transition-colors`}>
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mt-1 mb-3">{project.technologies}</p>
                  <div className="flex space-x-3">
                    <a 
                      href={project.projectUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className={`px-3 py-1 bg-${project.primaryBtnColor}/20 backdrop-blur-sm text-${project.primaryBtnColor} text-sm rounded border border-${project.primaryBtnColor} hover:bg-${project.primaryBtnColor} hover:text-cyber-black transition-colors`}
                    >
                      View Project
                    </a>
                    <a 
                      href={project.caseStudyUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className={`px-3 py-1 bg-${project.secondaryBtnColor}/20 backdrop-blur-sm text-${project.secondaryBtnColor} text-sm rounded border border-${project.secondaryBtnColor} hover:bg-${project.secondaryBtnColor} hover:text-cyber-black transition-colors`}
                    >
                      Case Study
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center">
          <a 
            href="#contact" 
            className="inline-block bg-neon-pink/20 backdrop-blur-md text-neon-pink px-6 py-3 font-future font-bold rounded border-2 border-neon-pink hover:bg-neon-pink hover:text-cyber-black transition-colors duration-300"
          >
            INTERESTED IN WORKING TOGETHER? <i className="fas fa-bolt ml-2"></i>
          </a>
        </div>
      </div>
      
      {/* Background grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#FF00FF 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>
    </section>
  );
};

export default ProjectsSection;
