import { useEffect, useRef } from 'react';

export function useGlitchAnimation(element: HTMLElement | null) {
  useEffect(() => {
    if (!element) return;
    
    const animation = element.animate(
      [
        { transform: 'translate(0)' },
        { transform: 'translate(-5px, 5px)' },
        { transform: 'translate(-5px, -5px)' },
        { transform: 'translate(5px, 5px)' },
        { transform: 'translate(5px, -5px)' },
        { transform: 'translate(0)' }
      ],
      {
        duration: 1000,
        iterations: Infinity
      }
    );
    
    return () => {
      animation.cancel();
    };
  }, [element]);
}

export function useTerminalTypingEffect(element: HTMLElement | null, text: string, speed = 50) {
  useEffect(() => {
    if (!element) return;
    
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, speed);
    
    return () => {
      clearInterval(typing);
    };
  }, [element, text, speed]);
}

export function use3DCardEffect() {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'rotateX(0) rotateY(0)';
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return cardRef;
}
