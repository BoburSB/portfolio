import { useLang } from '../context/LangContext';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15, mass: 1 } }
};

export default function Numbers() {
  const { T } = useLang();

  const STATS = [
    { n: '98%', l: 'Foydalanuvchi qoniqishi' },
    { n: '1.2s', l: "O'rtacha yuklanish tezligi" },
    { n: '0', l: 'Deadlines missed' },
  ];

  return (
    <section className="bg-black py-32 md:py-40 border-y border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="mb-6 flex justify-center">
          <motion.span variants={variants} className="sec-label">{T.nums_label}</motion.span>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="mb-20 flex justify-center">
          <motion.h2 variants={variants} className="text-3xl md:text-5xl font-bold text-white/50">{T.nums_h}</motion.h2>
        </motion.div>
        
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {STATS.map((s, i) => (
            <motion.div key={i} variants={variants}>
               <p className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" style={{ letterSpacing: '-0.04em' }}>{s.n}</p>
               <p className="num-label bg-white/5 px-4 py-2 rounded-sm inline-block">{s.l}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
