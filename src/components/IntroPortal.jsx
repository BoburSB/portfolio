import { useEffect, useState, useRef } from 'react';

export default function IntroPortal({ onComplete }) {
  const [stage, setStage] = useState(0);

  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    document.body.style.overflow = 'hidden';

    setTimeout(() => setStage(1), 800);
    setTimeout(() => setStage(2), 2200);
    setTimeout(() => {
      setStage(3);
      onComplete();
      document.body.style.overflow = '';
    }, 3500);

  }, [onComplete]);

  if (stage === 3) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center pointer-events-none transition-opacity duration-700 ${stage === 2 ? 'opacity-0' : 'opacity-100'}`}
         style={{ background: '#000', perspective: '1000px' }}>
      
      {/* Tunnel walls */}
      <div className={`absolute inset-0 transition-transform duration-[2000ms] ease-in ${stage >= 1 ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}
           style={{
             backgroundImage: 'radial-gradient(circle at center, transparent 20%, rgba(255,255,255,0.05) 21%, transparent 22%, transparent 40%, rgba(255,255,255,0.05) 41%, transparent 42%, transparent 70%, rgba(255,255,255,0.05) 71%, transparent 72%)',
             backgroundSize: '100vw 100vh',
           }}
      />
      
      {/* Central "opening" light */}
      <div className={`absolute transition-all duration-[1200ms] cubic-bezier(0.8, 0, 0.2, 1) ${stage === 2 ? 'w-full h-full rounded-none opacity-0' : 'w-2 h-2 rounded-full opacity-100'}`}
           style={{ background: '#fff', boxShadow: '0 0 40px 10px rgba(255,255,255,0.8)' }}
      />
      
      {/* System booting text */}
      <div className={`absolute bottom-10 left-10 font-mono text-[10px] text-white/40 tracking-widest uppercase transition-opacity duration-300 ${stage === 1 ? 'opacity-100' : 'opacity-0'}`}>
        <p>INITIALIZING ENVIRONMENT...</p>
        <p>CONNECTING PROTOCOLS...</p>
        <p>ENTERING MAINFRAME.</p>
      </div>
    </div>
  );
}
