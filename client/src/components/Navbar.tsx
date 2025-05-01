import { useState, useEffect } from 'react';
import { Link } from 'wouter';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full top-0 z-50 border-b transition-all duration-300 ${
      scrolled ? 'border-neon-pink bg-cyber-black/80 backdrop-blur-md' : 'border-transparent bg-cyber-black/50 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="#home" className="text-neon-blue font-pixel text-xl tracking-wider">
          J<span className="text-neon-pink">T</span>V
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="text-neon-blue hover:text-neon-pink transition-colors">HOME</a>
          <a href="#skills" className="text-neon-blue hover:text-neon-pink transition-colors">SKILLS</a>
          <a href="#projects" className="text-neon-blue hover:text-neon-pink transition-colors">PROJECTS</a>
          <a href="#services" className="text-neon-blue hover:text-neon-pink transition-colors">SERVICES</a>
          <a href="#contact" className="text-neon-blue hover:text-neon-pink transition-colors">CONTACT</a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-neon-blue focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-cyber-black border-t border-neon-pink transition-all duration-300 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
          <a href="#home" onClick={closeMenu} className="text-neon-blue hover:text-neon-pink py-2 px-4 hover:bg-deep-purple/50 transition-colors">HOME</a>
          <a href="#skills" onClick={closeMenu} className="text-neon-blue hover:text-neon-pink py-2 px-4 hover:bg-deep-purple/50 transition-colors">SKILLS</a>
          <a href="#projects" onClick={closeMenu} className="text-neon-blue hover:text-neon-pink py-2 px-4 hover:bg-deep-purple/50 transition-colors">PROJECTS</a>
          <a href="#services" onClick={closeMenu} className="text-neon-blue hover:text-neon-pink py-2 px-4 hover:bg-deep-purple/50 transition-colors">SERVICES</a>
          <a href="#contact" onClick={closeMenu} className="text-neon-blue hover:text-neon-pink py-2 px-4 hover:bg-deep-purple/50 transition-colors">CONTACT</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
