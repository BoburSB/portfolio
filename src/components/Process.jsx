import { useRef } from 'react';
import { useLang } from '../context/LangContext';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15, mass: 1 } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

function ProcessCard({ p }) {
  const ref = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.div variants={variants}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="border-t border-white/[0.08] pt-8 tilt-element px-4 py-4 rounded-md group hover:bg-white/[0.02]" 
      style={{ transition: 'transform 0.15s ease-out, background 0.2s' }}>
      <div style={{ transform: 'translateZ(20px)' }}>
        <span className="num-label block mb-6 group-hover:text-white transition-colors">{p.n}</span>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{p.title}</h3>
        <p className="text-white/40 text-[15px] leading-relaxed">{p.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const { T } = useLang();

  const PROCESS = [
    { n: '01', title: T.proc1_t, desc: T.proc1_d },
    { n: '02', title: T.proc2_t, desc: T.proc2_d },
    { n: '03', title: T.proc3_t, desc: T.proc3_d },
    { n: '04', title: T.proc4_t, desc: T.proc4_d },
  ];

  return (
    <section id="process" className="bg-black py-32 md:py-40 tilt-container">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex items-center gap-8 mb-20">
          <motion.span variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15, mass: 1 } } }}><span className="sec-label">{T.proc_label}</span></motion.span>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, type: "spring", stiffness: 60, damping: 15, mass: 1 }} className="flex-1 h-px bg-white/[0.08] origin-left" />
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="mb-20">
          <motion.h2 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15, mass: 1 } } }} style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            {T.proc_h}
          </motion.h2>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {PROCESS.map((p) => (
             <ProcessCard key={p.n} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
