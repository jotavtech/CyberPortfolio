import React, { useEffect, useRef } from 'react';

interface HighlightTextProps {
  text: string;
  className?: string;
  highlight?: 'underline' | 'gradient' | 'none';
  reveal?: boolean;
}

const HighlightText: React.FC<HighlightTextProps> = ({ 
  text, 
  className = '', 
  highlight = 'underline',
  reveal = false
}) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current || !reveal) return;
    
    // Adicionar classe para ativar a animação
    const timer = setTimeout(() => {
      if (textRef.current) {
        textRef.current.classList.add('revealed');
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [reveal]);

  const getClasses = () => {
    let classes = className;
    
    if (highlight === 'underline') {
      classes += ' highlight-text';
    } else if (highlight === 'gradient') {
      classes += ' gradient-text';
    }
    
    if (reveal) {
      classes += ' reveal-section';
      if (textRef.current?.classList.contains('revealed')) {
        classes += ' revealed';
      }
    }
    
    return classes;
  };
  
  return (
    <span ref={textRef} className={getClasses()}>
      {text}
    </span>
  );
};

export { HighlightText };
export default HighlightText;
