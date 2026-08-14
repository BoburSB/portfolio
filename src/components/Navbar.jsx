import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, T } = useLang();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const LINKS = [
    { label: T.nav_home,    id: 'hero' },
    { label: T.nav_about,   id: 'about' },
    { label: T.nav_work,    id: 'work' },
    { label: T.nav_skills,  id: 'skills' },
    { label: T.nav_xp,      id: 'experience' },
    { label: T.nav_faq,     id: 'faq' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 15, mass: 1, delay: 3.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-black/80 backdrop-blur-md border-white/[0.06] py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 flex items-center justify-between">
          
          <button onClick={() => scrollTo('hero')} data-h
            className="font-mono text-sm tracking-[0.2em] text-white hover:text-white/70 transition-colors uppercase relative group">
            SB<span className="text-white/20">.</span>
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
          </button>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {LINKS.map(l => (
                <button key={l.id} onClick={() => scrollTo(l.id)} data-h
                  className="text-[13px] uppercase tracking-widest text-white/50 hover:text-white transition-colors relative ul-hover">
                  {l.label}
                </button>
              ))}
            </div>
            <div className="w-px h-4 bg-white/20" />
            
            <button onClick={() => setLang(lang === 'uz' ? 'en' : 'uz')} data-h
              className="text-[13px] uppercase tracking-widest text-white/50 hover:text-white transition-colors flex items-center gap-1.5">
              <span>{lang}</span>
            </button>

            <button onClick={() => scrollTo('contact')} data-h
              className="text-[13px] uppercase tracking-widest text-black bg-white px-5 py-2.5 rounded-sm hover:bg-white/80 transition-colors font-medium">
              {T.nav_cta}
            </button>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-6 h-4 relative flex flex-col justify-between">
              <span className={`w-full h-px bg-white transition-all duration-300 origin-left ${menuOpen ? 'rotate-45 translate-x-px' : ''}`} />
              <span className={`w-full h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-px bg-white transition-all duration-300 origin-left ${menuOpen ? '-rotate-45 translate-x-px' : ''}`} />
            </div>
          </button>
        </div>

        <div id="scrollBar" className="absolute bottom-0 left-0 h-[1px] bg-white/40 z-50 transition-all duration-150" style={{ width: '0%' }} />
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }} 
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }} 
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-40 bg-black/90 md:hidden flex flex-col items-center justify-center gap-8">
            {LINKS.map((l, i) => (
              <motion.button 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                key={l.id} onClick={() => scrollTo(l.id)}
                className="text-2xl font-bold text-white uppercase tracking-widest hover:text-white/50 transition-colors">
                {l.label}
              </motion.button>
            ))}
            <motion.button 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              onClick={() => { setLang(lang === 'uz' ? 'en' : 'uz'); setMenuOpen(false); }}
              className="text-xl font-bold text-white/50 uppercase tracking-widest mt-8 flex items-center gap-2 border border-white/20 px-6 py-2 rounded-sm">
              Language: <span className="text-white">{lang.toUpperCase()}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
