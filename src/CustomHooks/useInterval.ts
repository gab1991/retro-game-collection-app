import { useCallback, useRef } from 'react';

interface IUseIntervalReturn {
  clearHookInterval: (callback?: () => void) => void;
  setHookInterval: (callback: () => void, time: number) => void;
}

export function useInterval(): IUseIntervalReturn {
  const timerRef = useRef(0);

  const setHookInterval = useCallback((callback: () => void, time: number) => {
    timerRef.current = window.setInterval(callback, time);
  }, []);

  const clearHookInterval = useCallback((callback?: () => void) => {
    window.clearInterval(timerRef.current);
    callback && callback();
  }, []);

  return { clearHookInterval, setHookInterval };
}
