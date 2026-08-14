import { useEffect, useRef, useState } from 'react';
import { RiArrowDownLine } from 'react-icons/ri';
import { useLang } from '../context/LangContext';
import { motion } from 'framer-motion';

function ScrambleText({ text, delay = 0, trigger = true }) {
  const [chars, setChars] = useState([]);
  const allowed = '!<>-_\\\\/[]{}—=+*^?#________';
  
  useEffect(() => {
    if (!trigger) return;
    const finalChars = text.split('');
    const timers = [];
    
    setChars(finalChars.map(() => allowed[Math.floor(Math.random() * allowed.length)]));

    setTimeout(() => {
      finalChars.forEach((char, i) => {
        const t = setTimeout(() => {
          setChars(prev => {
            const next = [...prev];
            next[i] = char;
            return next;
          });
        }, i * 60 + Math.random() * 100);
        timers.push(t);
      });
    }, delay);

    return () => timers.forEach(clearTimeout);
  }, [text, delay, trigger]);

  return <span>{chars.join('')}</span>;
}

export default function Hero() {
  const { T } = useLang();
  const heroRef   = useRef(null);
  const charRef   = useRef(null);
  const [ready, setReady] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const raf   = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const bar = document.getElementById('scrollBar');
    if (!bar) return;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const char = charRef.current;
    if (!hero || !char) return;

    const onMove = (e) => {
      const r  = hero.getBoundingClientRect();
      mouse.current.x = ((e.clientX - r.left) / r.width  - 0.5);
      mouse.current.y = ((e.clientY - r.top)  / r.height - 0.5);
    };
    hero.addEventListener('mousemove', onMove, { passive: true });

    const animate = () => {
      const { x, y } = mouse.current;
      char.style.transform = `
        translateY(${-20 + y * 14}px)
        rotateY(${x * 12}deg)
        rotateX(${-y * 8}deg)
        scale(1)
      `;
      raf.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      hero.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15, mass: 1 } }
  };

  return (
    <section id="hero" ref={heroRef}
      className="relative min-h-screen flex items-stretch overflow-hidden bg-black pt-16">

      <div className="absolute inset-0 pointer-events-none grid-overlay" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        className="relative z-10 flex-1 flex flex-col justify-center pb-12 px-8 md:px-16 max-w-[780px]">

        <div>
          <motion.div variants={childVariants} className="mb-8">
            <span className="num-label inline-block px-3 py-1 border border-white/10 rounded-sm bg-white/5">
              {T.hero_role}
            </span>
          </motion.div>

          <div className="overflow-hidden mb-8">
            <h1 className="block"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', color: '#fff' }}>
              <ScrambleText text="SODIQOV" delay={400} trigger={ready} />
            </h1>
            <h1 className="block"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', color: 'rgba(255,255,255,0.15)' }}>
              <ScrambleText text="BOBUR" delay={800} trigger={ready} />
            </h1>
          </div>

          <motion.div variants={childVariants} className="max-w-md mb-12">
            <p className="text-white/50 text-base leading-relaxed text-[17px]">
              {T.hero_desc}
            </p>
          </motion.div>
        </div>

        <div>
          <motion.div variants={childVariants} className="flex flex-wrap gap-4 mb-10">
            <button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-w" data-h>
              {T.hero_btn1}
              <RiArrowDownLine size={14} />
            </button>
            <a href="https://t.me/bobursodiqov" target="_blank" rel="noreferrer"
              className="btn-b" data-h>
              {T.hero_btn2}
            </a>
          </motion.div>

          <motion.div variants={childVariants} className="divider mb-8" />
          
          <motion.div variants={childVariants} className="flex gap-10">
            {[
              { n: '20+', l: T.hero_s1 },
              { n: '2+',  l: T.hero_s2 },
              { n: '10+', l: T.hero_s3 },
            ].map(({ n, l }) => (
              <div key={l}>
                <p className="text-2xl font-bold text-white tabular-nums">{n}</p>
                <p className="num-label mt-0.5">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="hidden lg:flex relative flex-shrink-0 w-[42vw] items-end justify-center overflow-hidden">
        <div className="absolute left-0 inset-y-0 w-px bg-white/[0.06]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-3/4 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(255,255,255,0.04) 0%, transparent 70%)' }} />

        <div ref={charRef} className="char-float relative w-full flex justify-center items-end"
          style={{ transformStyle: 'preserve-3d', transition: 'transform 0.18s ease-out', willChange: 'transform' }}>

          <motion.img
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.5, type: "spring", stiffness: 60, damping: 15, mass: 1, delay: 1 }}
            src="/character.jpg"
            alt="Sodiqov Bobur"
            className="relative z-10 w-full object-cover object-top select-none"
            style={{
              height: '90vh', maxWidth: '520px', objectPosition: 'center top',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
              filter: 'contrast(1.05) brightness(0.95)',
            }}
            draggable={false}
          />

          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={ready ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute left-6 top-1/3 z-20">
            <div className="border border-white/10 bg-black/60 backdrop-blur-sm rounded-sm px-4 py-3">
              <p className="num-label mb-1">{T.hero_stack}</p>
              <p className="text-white text-sm font-semibold">React · TypeScript</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={ready ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1.7, duration: 0.8 }}
            className="absolute right-6 top-1/2 z-20">
            <div className="border border-white/10 bg-black/60 backdrop-blur-sm rounded-sm px-4 py-3 text-right">
              <p className="num-label mb-1">Status</p>
              <div className="flex items-center justify-end gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <p className="text-white text-sm font-semibold">{T.hero_status}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
