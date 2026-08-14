import { useRef, useEffect, useState } from 'react';
import { useLang } from '../context/LangContext';
import { RiReactjsLine, RiJavascriptLine, RiHtml5Line, RiCss3Line, RiGitBranchLine, RiCodeSSlashLine } from 'react-icons/ri';
import { SiTypescript, SiTailwindcss, SiFigma, SiGithub } from 'react-icons/si';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15, mass: 1 } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const SKILLS = [
  { name: 'React',        pct: 90, Icon: RiReactjsLine    },
  { name: 'JavaScript',   pct: 92, Icon: RiJavascriptLine },
  { name: 'TypeScript',   pct: 80, Icon: SiTypescript     },
  { name: 'Tailwind CSS', pct: 88, Icon: SiTailwindcss    },
  { name: 'HTML5',        pct: 95, Icon: RiHtml5Line       },
  { name: 'CSS3',         pct: 93, Icon: RiCss3Line        },
  { name: 'Git',          pct: 85, Icon: RiGitBranchLine   },
  { name: 'GitHub',       pct: 85, Icon: SiGithub          },
  { name: 'REST API',     pct: 83, Icon: RiCodeSSlashLine  },
  { name: 'Figma',        pct: 87, Icon: SiFigma           },
];

function SkillRow({ name, pct, Icon }) {
  return (
    <motion.div variants={variants} className="flex items-center gap-5 py-4 border-b border-white/[0.06] group hover:pl-2 transition-all duration-300">
      <div className="w-7 flex-shrink-0">
        <Icon size={16} className="text-white/30 group-hover:text-white/70 transition-colors" />
      </div>
      <span className="text-white/60 text-[15px] font-medium w-32 flex-shrink-0 group-hover:text-white transition-colors">
        {name}
      </span>
      <div className="flex-1 h-px bg-white/[0.06] relative overflow-hidden">
        <motion.div 
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, type: "spring", stiffness: 60, damping: 15, mass: 1, delay: 0.2 }}
          className="h-full bg-white/80 origin-left" style={{ width: pct + '%' }} />
      </div>
      <span className="font-mono text-xs text-white/30 w-9 text-right flex-shrink-0">{pct}%</span>
    </motion.div>
  );
}

function ServiceCard({ n, title, detail }) {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
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
      className="py-8 border-b border-white/[0.06] group cursor-default tilt-element rounded-md px-4"
      style={{ transition: 'transform 0.15s ease-out, background 0.25s' }}>
      <div className="flex items-start gap-6" style={{ transform: 'translateZ(15px)' }}>
        <span className="num-label mt-1 flex-shrink-0">{n}</span>
        <div>
          <p className="text-white font-semibold text-lg group-hover:text-white/80 transition-colors mb-2">{title}</p>
          <p className="text-white/40 text-[15px] leading-relaxed">{detail}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { T } = useLang();

  const SERVICES = [
    { n: '01', title: T.svc1_t, detail: T.svc1_d },
    { n: '02', title: T.svc2_t, detail: T.svc2_d },
    { n: '03', title: T.svc3_t, detail: T.svc3_d },
    { n: '04', title: T.svc4_t, detail: T.svc4_d },
  ];

  return (
    <section id="skills" className="bg-black py-32 md:py-40 tilt-container">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex items-center gap-8 mb-20">
          <motion.span variants={variants}><span className="sec-label">{T.skills_label}</span></motion.span>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, type: "spring", stiffness: 60, damping: 15, mass: 1 }} className="flex-1 h-px bg-white/[0.08] origin-left" />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={variants} className="mb-12">
              <h2 className="text-4xl font-bold tracking-tight" style={{ letterSpacing: '-0.03em' }}>{T.skills_h1}</h2>
            </motion.div>
            <div>
              {SKILLS.map((s) => <SkillRow key={s.name} {...s} />)}
            </div>
          </motion.div>
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.div variants={variants} className="mb-12">
              <h2 className="text-4xl font-bold tracking-tight" style={{ letterSpacing: '-0.03em' }}>{T.skills_h2}</h2>
            </motion.div>
            <div className="space-y-0">
              {SERVICES.map((svc) => <ServiceCard key={svc.n} {...svc} />)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
