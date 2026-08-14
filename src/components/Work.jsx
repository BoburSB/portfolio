import { useState, useRef } from 'react';
import { useLang } from '../context/LangContext';
import { RiGithubLine, RiArrowRightUpLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15, mass: 1 } }
};

function ProjectRow({ p }) {
  const [hovered, setHovered] = useState(false);
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
    setHovered(false);
    ref.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.div
      variants={variants}
      ref={ref}
      className="proj-row border-b border-white/[0.06] group cursor-pointer tilt-element rounded-md"
      style={{ transition: 'transform 0.15s ease-out, background 0.25s' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}>
      <div className="py-8 md:py-10 grid grid-cols-[60px_1fr_auto] md:grid-cols-[60px_1fr_240px_auto] gap-6 items-center px-4" style={{ transform: 'translateZ(20px)' }}>
        <span className="num-label">{p.num}</span>
        <div>
          <div className="flex items-center gap-4 flex-wrap">
            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-white/80 transition-colors duration-300 ul-hover">
              {p.title}
            </h3>
            <div className="flex gap-1.5 flex-wrap">
              {p.tags.map(t => <span key={t} className="tag bg-white/5">{t}</span>)}
            </div>
          </div>
          <p className={`text-white/40 text-sm mt-3 leading-relaxed max-w-lg transition-all duration-500 overflow-hidden ${hovered ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
            {p.desc}
          </p>
        </div>
        <span className="hidden md:block num-label text-right">{p.year}</span>
        <div className="flex items-center gap-4">
          <a href={p.github} data-h aria-label="GitHub"
            className="text-white/25 hover:text-white transition-colors duration-200">
            <RiGithubLine size={20} />
          </a>
          <a href={p.live} data-h aria-label="Live"
            className="text-white/25 hover:text-white transition-colors duration-200">
            <RiArrowRightUpLine size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const { T } = useLang();

  const PROJECTS = [
    { num: '01', title: 'AI Code Analyzer', year: '2026', tags: ['React', 'TypeScript', 'AI/ML'], desc: T.work_desc1, github: '#', live: '#' },
    { num: '02', title: 'UstaBor Platform', year: '2025', tags: ['React', 'REST API', 'UI/UX'], desc: T.work_desc2, github: '#', live: '#' },
    { num: '03', title: 'English Test Platform', year: '2024', tags: ['React', 'TypeScript', 'Education'], desc: T.work_desc3, github: '#', live: '#' },
    { num: '04', title: 'CRM Attendance', year: '2024', tags: ['React', 'TypeScript', 'CRM'], desc: T.work_desc4, github: '#', live: '#' },
  ];

  return (
    <section id="work" className="bg-black py-32 md:py-40 tilt-container">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          className="flex items-center gap-8 mb-20">
          <motion.span variants={variants}><span className="sec-label">{T.work_label}</span></motion.span>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, type: "spring", stiffness: 60, damping: 15, mass: 1 }} className="flex-1 h-px bg-white/[0.08] origin-left" />
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="mb-16">
          <motion.h2 variants={variants} style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            {T.work_h}
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-[60px_1fr_auto] md:grid-cols-[60px_1fr_240px_auto] gap-6 pb-4 border-b border-white/[0.06] px-4">
          <span className="num-label">№</span>
          <span className="num-label">{T.work_col1}</span>
          <span className="hidden md:block num-label text-right">{T.work_col2}</span>
          <span className="num-label">Links</span>
        </div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
          {PROJECTS.map((p) => <ProjectRow key={p.num} p={p} />)}
        </motion.div>
      </div>
    </section>
  );
}
