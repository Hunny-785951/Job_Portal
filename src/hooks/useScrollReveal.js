import { useEffect } from 'react';

export function useScrollReveal(dependencies = []) {
  useEffect(() => {
    // Add a small timeout to ensure React has painted the new DOM elements
    const timer = setTimeout(() => {
      const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');

      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.15,
        }
      );

      reveals.forEach((reveal) => observer.observe(reveal));
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies); 
}
