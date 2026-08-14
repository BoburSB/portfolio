import { useState, useRef } from 'react';
import { useLang } from '../context/LangContext';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 60, damping: 15, mass: 1 } }
};

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -2;
    const rotateY = ((x - centerX) / centerX) * 2;
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
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
      className="tilt-element rounded-md" 
      style={{ transition: 'transform 0.15s ease-out' }}>
      <div 
        className="border-b border-white/[0.08] group px-2 py-2"
        style={{ transform: 'translateZ(10px)' }}>
        <button 
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-6 text-left"
          data-h>
          <h3 className="text-lg md:text-xl font-semibold text-white/90 group-hover:text-white transition-colors pr-8">
            {q}
          </h3>
          <span className="text-white/40 flex-shrink-0 group-hover:text-white/80 transition-colors">
            {open ? <RiSubtractLine size={24} /> : <RiAddLine size={24} />}
          </span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 60, damping: 15, mass: 1 }}
              className="overflow-hidden">
              <p className="text-white/40 text-[15px] leading-relaxed pb-8 max-w-3xl">
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const { T } = useLang();

  const FAQS = [
    { q: T.faq_q1, a: T.faq_a1 },
    { q: T.faq_q2, a: T.faq_a2 },
    { q: T.faq_q3, a: T.faq_a3 },
    { q: T.faq_q4, a: T.faq_a4 },
  ];

  return (
    <section id="faq" className="bg-black py-32 md:py-40 tilt-container">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex items-center gap-8 mb-20">
          <motion.span variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15, mass: 1 } } }}><span className="sec-label">{T.faq_label}</span></motion.span>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, type: "spring", stiffness: 60, damping: 15, mass: 1 }} className="flex-1 h-px bg-white/[0.08] origin-left" />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-32 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15, mass: 1 } } }} className="sticky top-32" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              {T.faq_h.split('\n').map((line, i) => (
                <span key={i}>
                  <span style={{ color: i === 1 ? 'rgba(255,255,255,0.2)' : '#fff' }}>{line}</span><br/>
                </span>
              ))}
            </motion.h2>
          </motion.div>
          
          <motion.div 
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
