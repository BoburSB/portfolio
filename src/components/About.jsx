import { useRef } from 'react';
import { useLang } from '../context/LangContext';
import { motion } from 'framer-motion';

function use3dTilt() {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };
  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15, mass: 1 } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function About() {
  const { T } = useLang();
  const tilt = use3dTilt();

  return (
    <section id="about" className="bg-black py-32 md:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          className="flex items-center gap-8 mb-20">
          <motion.span variants={variants}>
            <span className="sec-label">{T.about_label}</span>
          </motion.span>
          <motion.div 
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, type: "spring", stiffness: 60, damping: 15, mass: 1 }}
            className="flex-1 h-px bg-white/[0.08] origin-left" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-20 lg:gap-32 items-start">

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={variants} className="mb-12">
              <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                {T.about_h.split('\n').map((line, i) => (
                  <span key={i}>
                    <span style={{ color: i === 1 ? 'rgba(255,255,255,0.25)' : '#fff' }}>{line}</span>
                    <br/>
                  </span>
                ))}
              </h2>
            </motion.div>

            <div className="space-y-6 max-w-lg mb-16">
              {[T.about_p1, T.about_p2].map((text, i) => (
                <motion.p variants={variants} key={i} className="text-white/50 leading-relaxed text-[17px]">
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="pt-10 border-t border-white/[0.06] grid grid-cols-3 gap-8">
              {[
                { n: '20+', l: T.about_n1 },
                { n: '2+',  l: T.about_n2 },
                { n: '∞',   l: T.about_n3  },
              ].map(({ n, l }) => (
                <motion.div variants={variants} key={l}>
                  <p className="text-3xl md:text-4xl font-bold text-white mb-2">{n}</p>
                  <p className="num-label">{l}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 60, damping: 15, mass: 1 }}
            viewport={{ once: true }}
            className="tilt-container">
            <div className="relative tilt-element rounded-md overflow-hidden" 
                 ref={tilt.ref} 
                 onMouseMove={tilt.onMouseMove} 
                 onMouseLeave={tilt.onMouseLeave}
                 style={{ transition: 'transform 0.2s ease-out' }}>
              <div className="absolute -inset-px border border-white/[0.08] pointer-events-none z-10 rounded-sm" />

              <img src="/character.jpg" alt="Sodiqov Bobur"
                className="w-full object-cover object-top rounded-sm"
                style={{ height: '560px', filter: 'grayscale(20%) contrast(1.05)', display: 'block' }}
              />

              <div className="absolute inset-x-0 bottom-0 h-32 rounded-b-sm"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)' }} />

              <div className="absolute bottom-6 left-6 right-6 z-20" style={{ transform: 'translateZ(30px)' }}>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="num-label mb-2">{T.about_role_tag}</p>
                    <p className="text-white font-semibold text-lg">Sodiqov Bobur</p>
                  </div>
                  <div className="flex gap-2">
                    {['React', 'TS', 'Figma'].map(t => (
                      <span key={t} className="tag bg-white/5">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
