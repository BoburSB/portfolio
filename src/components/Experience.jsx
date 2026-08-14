import { useLang } from '../context/LangContext';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15, mass: 1 } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
};

export default function Experience() {
  const { T } = useLang();

  const TIMELINE = [
    { period: `2024 — ${T.xp_now}`, role: T.xp1_r, company: T.xp1_c, desc: T.xp1_d, current: true },
    { period: '2023 — 2024', role: T.xp2_r, company: T.xp2_c, desc: T.xp2_d, current: false },
    { period: '2022 — 2023', role: T.xp3_r, company: T.xp3_c, desc: T.xp3_d, current: false },
  ];

  return (
    <section id="experience" className="bg-black py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex items-center gap-8 mb-20">
          <motion.span variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15, mass: 1 } } }}><span className="sec-label">{T.xp_label}</span></motion.span>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, type: "spring", stiffness: 60, damping: 15, mass: 1 }} className="flex-1 h-px bg-white/[0.08] origin-left" />
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="mb-20">
          <motion.h2 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15, mass: 1 } } }} style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            {T.xp_h}
          </motion.h2>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          className="relative border-l border-white/[0.08] ml-4 md:ml-6 pl-8 md:pl-16 space-y-20">
          {TIMELINE.map((item, i) => (
            <motion.div key={i} variants={variants} className="relative">
              <div className={`absolute -left-[45px] md:-left-[77px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center bg-black border ${item.current ? 'border-white' : 'border-white/20'}`}>
                 <div className={`w-1.5 h-1.5 rounded-full ${item.current ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-white/20'}`} />
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-4">
                <span className="num-label bg-white/5 px-2 py-1 rounded-sm w-fit inline-block">{item.period}</span>
                <h3 className="text-xl md:text-3xl font-bold text-white">{item.role}</h3>
              </div>
              <p className="text-white/60 text-base font-semibold mb-4">{item.company}</p>
              <p className="text-white/40 text-[15px] leading-relaxed max-w-2xl">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
