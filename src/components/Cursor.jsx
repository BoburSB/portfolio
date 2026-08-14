import { useEffect, useRef } from 'react';

export default function Cursor() {
  const crossRef = useRef(null);
  const dotRef   = useRef(null);
  const coordsRef = useRef(null);
  const state   = useRef({ mx: window.innerWidth / 2, my: window.innerHeight / 2, rx: window.innerWidth / 2, ry: window.innerHeight / 2, raf: null, initialized: false });

  useEffect(() => {
    const cross  = crossRef.current;
    const dot    = dotRef.current;
    const coords = coordsRef.current;
    if (!cross || !dot || !coords) return;

    const onMove = (e) => {
      state.current.mx = e.clientX;
      state.current.my = e.clientY;
      if (!state.current.initialized) {
        state.current.rx = e.clientX;
        state.current.ry = e.clientY;
        state.current.initialized = true;
      }
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      coords.style.transform = `translate(${e.clientX + 14}px, ${e.clientY - 20}px)`;
      coords.innerText = `[${e.clientX}, ${e.clientY}]`;
    };

    const tick = () => {
      state.current.rx += (state.current.mx - state.current.rx) * 0.15;
      state.current.ry += (state.current.my - state.current.ry) * 0.15;
      cross.style.transform = `translate(${state.current.rx}px, ${state.current.ry}px) translate(-50%, -50%)`;
      state.current.raf = requestAnimationFrame(tick);
    };
    tick();

    document.addEventListener('mousemove', onMove, { passive: true });

    const addHover = (el) => { 
      const enter = () => cross.classList.add('hover');
      const leave = () => cross.classList.remove('hover');
      el.addEventListener('mouseenter', enter); 
      el.addEventListener('mouseleave', leave);
      el._hoverListeners = { enter, leave };
    };

    const applyToElements = () => {
      document.querySelectorAll('a, button, [data-h], input, textarea').forEach(el => {
        if (!el._hoverListeners) addHover(el);
      });
    };

    applyToElements();
    const obs = new MutationObserver(() => applyToElements());
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(state.current.raf);
      obs.disconnect();
      document.querySelectorAll('a, button, [data-h], input, textarea').forEach(el => {
        if (el._hoverListeners) {
          el.removeEventListener('mouseenter', el._hoverListeners.enter);
          el.removeEventListener('mouseleave', el._hoverListeners.leave);
        }
      });
    };
  }, []);

  return (
    <>
      <div ref={crossRef} className="cur-cross" style={{ left: 0, top: 0, transform: 'translate(-50%, -50%)' }} />
      <div ref={dotRef} className="cur-dot" style={{ left: 0, top: 0, transform: 'translate(-50%, -50%)' }} />
      <div ref={coordsRef} className="cur-coords" style={{ left: 0, top: 0 }} />
    </>
  );
}
