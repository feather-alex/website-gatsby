import { RefObject, useEffect, useCallback } from 'react';

export interface Args<T> {
  callback?: () => void;
  ref: RefObject<T>;
}

const useIntersect = <T extends Element>({ callback, ref }: Args<T>) => {
  const handleOnScreen = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && callback) {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    if (ref.current && callback) {
      observer = new IntersectionObserver(handleOnScreen, {
        rootMargin: '20%'
      });
      window.requestAnimationFrame(() => {
        if (observer && ref.current) {
          observer.observe(ref.current);
        } else {
          callback();
        }
      });
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [ref, handleOnScreen, callback]);
};

export default useIntersect;
