import { useEffect, useRef } from 'react';
import { RiCodeSSlashLine, RiPaletteLine, RiFlashlightLine, RiApps2Line, RiArrowRightUpLine } from 'react-icons/ri';

const SERVICES = [
  {
    icon: RiCodeSSlashLine,
    title: 'Frontend Development',
    desc: "React asosida zamonaviy va responsive web applications. Toza kod, yuqori unumdorlik.",
    detail: 'React · TypeScript · REST API',
  },
  {
    icon: RiPaletteLine,
    title: 'UI/UX Design',
    desc: "Foydalanuvchi uchun qulay va professional interfeyslar. Figma da prototiplash.",
    detail: 'Figma · Design Systems',
  },
  {
    icon: RiFlashlightLine,
    title: 'Landing Pages',
    desc: "Biznes va startup uchun yuqori konversiyali landing pages. Tezkor va premium.",
    detail: 'HTML · CSS · JavaScript',
  },
  {
    icon: RiApps2Line,
    title: 'Web Applications',
    desc: "Murakkab va interaktiv web applications. CRM, platforma va SaaS ilovalar.",
    detail: 'React · TypeScript · API',
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.reveal').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 80);
        });
        obs.unobserve(e.target);
      }
    }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative py-28 lg:py-36 bg-dark-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal mb-4"><span className="section-label">Xizmatlar</span></div>
        <h2 className="reveal section-title mb-14" style={{ '--delay': '0.1s' }}>
          Men nima <span className="gold-text">qilaman?</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map(({ icon: Icon, title, desc, detail }, i) => (
            <div key={title} className="reveal group glass rounded-2xl p-6 border border-white/5 cursor-default
              hover:border-gold/20 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
              transition-all duration-500"
              style={{ transitionDelay: `${i * 0.07}s` }}
              data-hover>

              {/* Number */}
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-[10px] text-white/15 tracking-widest">0{i+1}</span>
                <RiArrowRightUpLine size={14} className="text-white/15 group-hover:text-gold group-hover:rotate-45 transition-all duration-300"/>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-gold/8 border border-gold/15 flex items-center justify-center mb-5
                group-hover:bg-gold/15 group-hover:border-gold/30 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.1)]
                transition-all duration-500">
                <Icon size={22} className="text-gold/70 group-hover:text-gold transition-colors duration-300" />
              </div>

              <h3 className="font-bold text-white text-base mb-3 group-hover:text-gold/90 transition-colors duration-300">{title}</h3>
              <p className="text-white/35 text-sm leading-relaxed mb-5">{desc}</p>

              <div className="pt-4 border-t border-white/5">
                <span className="font-mono text-[10px] text-white/20 group-hover:text-gold/40 transition-colors duration-300">{detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
