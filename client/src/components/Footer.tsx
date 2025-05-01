import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="py-8 bg-cyber-black border-t border-neon-pink relative">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <a href="#home" className="text-neon-blue hover:text-neon-pink transition-colors font-pixel text-xl inline-block mb-4">
            J<span className="text-neon-pink">T</span>V
          </a>
          <p className="text-gray-400 mb-6">© {new Date().getFullYear()} jotave | Front-end Developer & UI/UX Designer</p>
          <div className="flex justify-center space-x-6 mb-6">
            <a 
              href="https://github.com/jotavtech" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-400 hover:text-neon-blue transition-colors"
            >
              <i className="fab fa-github"></i>
            </a>
            <a 
              href="https://wa.me/5583999290376" 
              className="text-gray-400 hover:text-neon-green transition-colors"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a 
              href="mailto:martinsjoao1227@gmail.com" 
              className="text-gray-400 hover:text-neon-pink transition-colors"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            <span className="inline-block px-2 py-1 bg-deep-purple/50 rounded font-digital">
              <span className="text-neon-green">function</span>{" "}
              <span className="text-neon-blue">createAwesomeWebsites</span>() {"{"}
              <span className="text-neon-pink">return</span>{" "}
              '<span className="text-neon-yellow">✨ magic ✨</span>'; {"}"}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
