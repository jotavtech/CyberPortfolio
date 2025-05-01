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
      scrolled ? 'border-mono-white bg-mono-black/80 backdrop-blur-md' : 'border-transparent bg-mono-black/50 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="#home" className="text-mono-white font-pixel text-xl tracking-wider">
          J<span className="text-mono-light">T</span>V
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="text-mono-medium hover:text-mono-white transition-colors decorative-line">INÍCIO</a>
          <a href="#skills" className="text-mono-medium hover:text-mono-white transition-colors decorative-line">HABILIDADES</a>
          <a href="#projects" className="text-mono-medium hover:text-mono-white transition-colors decorative-line">PROJETOS</a>
          <a href="#services" className="text-mono-medium hover:text-mono-white transition-colors decorative-line">SERVIÇOS</a>
          <a href="#contact" className="text-mono-medium hover:text-mono-white transition-colors decorative-line">CONTATO</a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-mono-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Alternar menu mobile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-mono-black border-t border-mono-white/20 transition-all duration-300 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
          <a href="#home" onClick={closeMenu} className="text-mono-medium hover:text-mono-white py-2 px-4 hover:bg-mono-deeper transition-colors">INÍCIO</a>
          <a href="#skills" onClick={closeMenu} className="text-mono-medium hover:text-mono-white py-2 px-4 hover:bg-mono-deeper transition-colors">HABILIDADES</a>
          <a href="#projects" onClick={closeMenu} className="text-mono-medium hover:text-mono-white py-2 px-4 hover:bg-mono-deeper transition-colors">PROJETOS</a>
          <a href="#services" onClick={closeMenu} className="text-mono-medium hover:text-mono-white py-2 px-4 hover:bg-mono-deeper transition-colors">SERVIÇOS</a>
          <a href="#contact" onClick={closeMenu} className="text-mono-medium hover:text-mono-white py-2 px-4 hover:bg-mono-deeper transition-colors">CONTATO</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
