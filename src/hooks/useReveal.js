import { useEffect, useRef } from 'react';

export function useReveal(threshold = 0.06) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      // clip reveals
      el.querySelectorAll('.tr').forEach((t, i) => {
        const d = parseFloat(t.style.getPropertyValue('--d')) || 0;
        setTimeout(() => t.classList.add('in'), d * 1000 + i * 70);
      });
      // staggered fades
      el.querySelectorAll('.fade-u, .fade-l, .fade-r, .fade-i, .lg-line, .sk-bar, .n-count').forEach((t) => {
        const d = parseFloat(t.style.getPropertyValue('--d')) || 0;
        setTimeout(() => t.classList.add('in'), d * 1000);
      });
      obs.unobserve(el);
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}
