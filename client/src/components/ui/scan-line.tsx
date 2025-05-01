import React from 'react';

const ScanLine: React.FC = () => {
  return (
    <div 
      className="scanline fixed top-0 left-0 w-full h-full pointer-events-none z-99 opacity-30" 
      style={{
        background: 'linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.04), transparent)',
        animation: 'scanline 8s linear infinite'
      }}
    ></div>
  );
};

export default ScanLine;
