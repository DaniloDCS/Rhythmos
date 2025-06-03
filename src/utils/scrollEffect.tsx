import React, { useEffect } from 'react';

const ScrollEffect: React.FC = () => {
  useEffect(() => {
    // Função para observar os elementos
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const direction = entry.target.getAttribute('data-direction');
            if (direction) {
              entry.target.classList.add(`aparence-${direction}`);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Selecionar os elementos com a classe 'aparence'
    const elements = document.querySelectorAll<HTMLElement>('.aparence');
    elements.forEach((element) => observer.observe(element));

    // Função para controle de rolagem
    const scrollSpeed = 1;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      window.scrollBy({
        top: e.deltaY * scrollSpeed,
        behavior: 'smooth',
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    // Scroll suave para âncoras
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const section = document.querySelector(target.getAttribute('href')!);
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    anchors.forEach((anchor) => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return null;
};

export default ScrollEffect;
