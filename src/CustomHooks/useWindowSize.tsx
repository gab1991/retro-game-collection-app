import { useEffect, useState } from 'react';

function getSize(): IWindowSize {
  return {
    height: window ? window.innerHeight : undefined,
    width: window ? window.innerWidth : undefined,
  };
}

interface IWindowSize {
  height?: number;
  width?: number;
}

export function useWindowSize(): IWindowSize {
  const [windowSize, setWindowSize] = useState(getSize());

  useEffect(() => {
    if (!window) {
      return;
    }

    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
