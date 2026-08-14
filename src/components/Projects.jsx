import { useEffect, useRef, useState } from 'react';
import { RiGithubLine, RiExternalLinkLine, RiReactjsLine } from 'react-icons/ri';
import { SiTypescript, SiTailwindcss } from 'react-icons/si';

const PROJECTS = [
  {
    id: 1,
    num: '01',
    title: 'AI Code Analyzer',
    desc: "AI yordamida kodni tahlil qiluvchi va optimizatsiya tavsiyalari beruvchi zamonaviy web application.",
    tags: ['React', 'TypeScript', 'AI/ML'],
    accent: '#C9A84C',
    github: '#',
    demo: '#',
    preview: (
      <div className="w-full h-full bg-dark-900 p-4 font-mono text-xs overflow-hidden">
        <div className="flex gap-1.5 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"/>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"/>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"/>
          <div className="ml-2 flex-1 h-2.5 rounded bg-white/5"/>
        </div>
        <div className="space-y-1.5">
          <p><span className="text-gold/60">const</span> <span className="text-white/70">analyze</span> = <span className="text-gold/60">async</span> (code) =&gt; {'{'}</p>
          <p className="pl-4"><span className="text-gold/60">const</span> result = <span className="text-white/40">await</span> AI.analyze(code);</p>
          <p className="pl-4 text-white/25">// 42 issues found</p>
          <p className="pl-4"><span className="text-gold/60">return</span> result.optimize();</p>
          <p>{'}'}</p>
          <div className="mt-3 p-2 rounded-lg" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}>
            <p className="text-[10px] text-gold/70">⚡ AI tahlil tugadi — 3 tavsiya</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    num: '02',
    title: 'UstaBor Platform',
    desc: "Xizmat ko'rsatuvchi ustalar va mijozlarni bog'lovchi real-time booking platforma.",
    tags: ['React', 'REST API', 'UI/UX'],
    accent: '#E8C76A',
    github: '#',
    demo: '#',
    preview: (
      <div className="w-full h-full bg-dark-900 p-4 overflow-hidden">
        <div className="flex gap-1.5 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"/>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"/>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"/>
          <div className="ml-2 flex-1 h-2.5 rounded bg-white/5 flex items-center px-2">
            <span className="text-white/20 font-mono text-[8px]">ustabor.uz</span>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border border-white/5" style={{ background: 'rgba(201,168,76,0.06)' }}>
          <div className="px-3 py-2 border-b border-white/5">
            <p className="text-[10px] font-semibold text-white/60">Eng yaxshi ustalar</p>
          </div>
          <div className="p-3 space-y-2">
            {['Santexnik', 'Elektrik', 'Dasturchi'].map((u, i) => (
              <div key={u} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full" style={{ background: `hsl(${40 + i * 30}, 60%, 40%)` }}/>
                  <span className="text-[10px] text-white/50">{u}</span>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(201,168,76,0.1)', color: '#C9A84C' }}>
                  {['⭐ 4.9', '⭐ 4.8', '⭐ 4.7'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    num: '03',
    title: 'English Test Platform',
    desc: "Ingliz tili darajasini aniqlash va test topshirish platformasi. Progress tracking bilan.",
    tags: ['React', 'TypeScript', 'Education'],
    accent: '#C9A84C',
    github: '#',
    demo: '#',
    preview: (
      <div className="w-full h-full bg-dark-900 p-4 overflow-hidden flex flex-col gap-3">
        <div className="flex gap-1.5 mb-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"/>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"/>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"/>
        </div>
        <div className="rounded-xl border border-white/8 p-3">
          <p className="text-[10px] text-white/50 mb-2 font-semibold">Question 12/30</p>
          <p className="text-[11px] text-white/70 mb-3">Choose the correct answer:</p>
          {['A) Present', 'B) Past Simple', 'C) Past Perfect'].map((opt, i) => (
            <div key={opt} className={`text-[10px] px-3 py-1.5 rounded-lg mb-1 ${
              i === 2
                ? 'text-gold border border-gold/30 bg-gold/8'
                : 'text-white/30 border border-white/5'
            }`}>{opt}</div>
          ))}
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gold/60" style={{ width: '40%' }}/>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    num: '04',
    title: 'CRM Attendance',
    desc: "Xodimlar davomatini boshqarish uchun zamonaviy CRM tizimi. Real-time statistika bilan.",
    tags: ['React', 'TypeScript', 'CRM'],
    accent: '#E8C76A',
    github: '#',
    demo: '#',
    preview: (
      <div className="w-full h-full bg-dark-900 overflow-hidden flex">
        <div className="w-10 bg-dark-800 border-r border-white/5 flex flex-col gap-2 p-2">
          {[0,1,2,3].map(i => (
            <div key={i} className={`w-6 h-6 rounded-lg ${i === 0 ? 'bg-gold/20' : 'bg-white/4'}`}/>
          ))}
        </div>
        <div className="flex-1 p-3 space-y-2">
          <p className="text-[10px] font-semibold text-white/50">Davomat — Avgust 2026</p>
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="h-4 rounded"
                style={{ background: Math.random() > 0.2 ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.04)' }}/>
            ))}
          </div>
          <div className="flex gap-1.5 mt-2">
            {[75, 92, 68, 88].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end h-12">
                <div className="rounded-t-sm w-full" style={{ height: `${h}%`, background: `rgba(201,168,76,${0.2 + i * 0.1})` }}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="reveal glass rounded-3xl overflow-hidden border border-white/5 tilt-card group"
      style={{ transitionDelay: `${index * 0.08}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width  / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        e.currentTarget.style.transform = `translateY(-6px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
        e.currentTarget.style.boxShadow = `0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(201,168,76,0.06)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
      }}>

      {/* Preview */}
      <div className="relative h-52 border-b border-white/5 overflow-hidden">
        {project.preview}
        {/* Overlay on hover */}
        <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-400 ${
          hovered ? 'opacity-100 bg-dark-900/70 backdrop-blur-sm' : 'opacity-0'
        }`}>
          <a href={project.github} data-hover
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
            onClick={e => e.stopPropagation()}>
            <RiGithubLine size={16}/> GitHub
          </a>
          <a href={project.demo} data-hover
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-dark-900 text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ background: project.accent }}
            onClick={e => e.stopPropagation()}>
            <RiExternalLinkLine size={16}/> Demo
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className="font-mono text-[10px] tracking-widest text-white/20">{project.num}</span>
          <div className="flex gap-1.5 flex-wrap justify-end">
            {project.tags.map(t => (
              <span key={t} className="font-mono text-[9px] px-2 py-0.5 rounded-md border border-white/8 text-white/25">{t}</span>
            ))}
          </div>
        </div>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">{project.title}</h3>
        <p className="text-white/35 text-sm leading-relaxed">{project.desc}</p>

        <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/5">
          <a href={project.github} data-hover
            className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white transition-colors">
            <RiGithubLine size={14}/> GitHub
          </a>
          <a href={project.demo} data-hover
            className="flex items-center gap-1.5 text-xs hover:opacity-80 transition-opacity font-semibold"
            style={{ color: project.accent }}>
            <RiExternalLinkLine size={14}/> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.reveal').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 80);
        });
        obs.unobserve(e.target);
      }
    }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-28 lg:py-36 bg-dark-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal mb-4"><span className="section-label">Portfolio</span></div>
        <div className="flex items-end justify-between mb-14 gap-4 flex-wrap">
          <h2 className="reveal section-title" style={{ '--delay': '0.1s' }}>Tanlangan<br/><span className="gold-text">loyihalar</span></h2>
          <p className="reveal text-white/30 text-sm max-w-xs leading-relaxed" style={{ '--delay': '0.15s' }}>
            Real loyihalar — real natijalalar va real texnologiyalar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
