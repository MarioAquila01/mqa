import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    const target = sessionStorage.getItem('scrollTarget');
    if (target && location.pathname === '/') {
      const interval = setInterval(() => {
        const el = document.getElementById(target);
        if (el) {
          scroller.scrollTo(target, {
            duration: 600,
            smooth: true,
            offset: -80,
          });
          sessionStorage.removeItem('scrollTarget');
          clearInterval(interval);
        }
      }, 100);

      setTimeout(() => clearInterval(interval), 3000); // segurança
    }
  }, [location]);

  return null;
};

export default ScrollManager;
