import { useState, useEffect, useRef } from 'react';

export function useFullpageScroll() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastWheel = useRef(0);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const sections = () => document.querySelectorAll('section');

    const startTransition = (toIndex: number) => {
      if (isTransitioning) return;
      const count = sections().length;
      const idx = Math.max(0, Math.min(count - 1, toIndex));
      if (idx === currentSection) return;
      setIsTransitioning(true);
      document.documentElement.classList.add('transitioning');
      setCurrentSection(idx);

      // Use smooth native scrolling, then clear lock after duration + small buffer
      const timeout = window.setTimeout(() => {
        setIsTransitioning(false);
        document.documentElement.classList.remove('transitioning');
      }, 2600); // matches CSS animation (2.4s) + buffer

      return () => window.clearTimeout(timeout);
    };

    const handleWheel = (e: WheelEvent) => {
      // debounce subtle wheel noise (be less sensitive to quick repeated events)
      const now = Date.now();
      if (now - lastWheel.current < 350) return;
      lastWheel.current = now;

      if (isTransitioning) return;
      e.preventDefault();
      const delta = e.deltaY;
      if (delta > 0) startTransition(currentSection + 1);
      else if (delta < 0) startTransition(currentSection - 1);
    };

    let touchMoved = false;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchMoved = false;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current == null) return;
      const endY = (e.changedTouches && e.changedTouches[0].clientY) || 0;
      const delta = touchStartY.current - endY;
      if (Math.abs(delta) > 100 && !isTransitioning) {
        if (delta > 0) startTransition(currentSection + 1);
        else startTransition(currentSection - 1);
      }
      touchStartY.current = null;
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection, isTransitioning]);

  useEffect(() => {
    const secs = document.querySelectorAll('section');
    const el = secs[currentSection] as HTMLElement | undefined;
    if (el) {
      // Smooth native scroll - avoids jank and lets browser optimize
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentSection]);

  return { currentSection, isTransitioning };
}