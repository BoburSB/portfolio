import { useState } from 'react';
import { useLang } from '../context/LangContext';
import { RiTelegramLine, RiGithubLine, RiInstagramLine, RiLinkedinLine, RiArrowRightLine, RiCheckLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const SOCIALS = [
  { Icon: RiGithubLine,    href: 'https://github.com',    label: 'GitHub'    },
  { Icon: RiTelegramLine,  href: 'https://t.me/bobursodiqov', label: 'Telegram' },
  { Icon: RiInstagramLine, href: 'https://instagram.com', label: 'Instagram'  },
  { Icon: RiLinkedinLine,  href: 'https://linkedin.com',  label: 'LinkedIn'   },
];

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 60, damping: 15, mass: 1 } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function Contact() {
  const { T } = useLang();
  const [form, setForm]   = useState({ name: '', email: '', msg: '' });
  const [busy, setBusy]   = useState(false);
  const [done, setDone]   = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.msg) return;
    setBusy(true);
    setTimeout(() => { setBusy(false); setDone(true); setForm({ name: '', email: '', msg: '' }); }, 1400);
  };

  return (
    <section id="contact" className="bg-black py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex items-center gap-8 mb-20">
          <motion.span variants={variants}><span className="sec-label">{T.contact_label}</span></motion.span>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, type: "spring", stiffness: 60, damping: 15, mass: 1 }} className="flex-1 h-px bg-white/[0.08] origin-left" />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            <motion.div variants={variants} className="mb-8">
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                {T.contact_h.split('\n').map((line, i) => (
                  <span key={i}>
                    <span style={{ color: i === 1 ? 'rgba(255,255,255,0.2)' : '#fff' }}>{line}</span><br/>
                  </span>
                ))}
              </h2>
            </motion.div>
            
            <motion.div variants={variants} className="mb-12">
              <p className="text-white/40 leading-relaxed max-w-sm text-[15px]">
                {T.contact_p}
              </p>
            </motion.div>
            
            <motion.div variants={variants} className="space-y-3 mb-14">
              {[
                { k: T.contact_email, v: 'bobur@example.com' },
                { k: T.contact_tg,    v: '@bobursodiqov' },
                { k: T.contact_loc,   v: T.contact_loc_v },
              ].map(({ k, v }) => (
                <div key={k} className="flex items-center gap-6 py-3 border-b border-white/[0.06]">
                  <span className="num-label w-20 flex-shrink-0">{k}</span>
                  <span className="text-white/50 text-[15px] font-medium">{v}</span>
                </div>
              ))}
            </motion.div>
            
            <motion.div variants={variants} className="flex gap-4">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" data-h aria-label={label}
                  className="w-12 h-12 border border-white/[0.12] flex items-center justify-center text-white/30 hover:text-white hover:border-white/40 transition-all duration-300 rounded-sm hover:-translate-y-1">
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 15, mass: 1 }} viewport={{ once: true, margin: "-50px" }}>
            {done ? (
              <div className="border border-white/[0.08] rounded-sm p-12 flex flex-col items-center justify-center text-center gap-5 bg-white/[0.01]" style={{ minHeight: '400px' }}>
                <div className="w-14 h-14 border border-white/20 flex items-center justify-center rounded-full bg-white/5">
                  <RiCheckLine size={24} className="text-white/70" />
                </div>
                <p className="text-white text-xl font-bold">{T.form_ok}</p>
                <p className="text-white/40 text-[15px]">{T.form_ok2}</p>
                <button onClick={() => setDone(false)} className="num-label hover:text-white transition-colors mt-4 bg-white/5 px-4 py-2 rounded-sm" data-h>
                  {T.form_again}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="border border-white/[0.08] rounded-sm p-8 md:p-10 space-y-6 bg-white/[0.01] backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-8">{T.form_h}</h3>
                {[
                  { id: 'name',  type: 'text',  label: T.form_name,  ph: T.form_ph_name, k: 'name' },
                  { id: 'email', type: 'email', label: T.form_email, ph: 'email@example.com', k: 'email' },
                ].map(({ id, type, label, ph, k }) => (
                  <div key={id}>
                    <label htmlFor={id} className="num-label block mb-2">{label}</label>
                    <input id={id} type={type} required placeholder={ph} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                      className="w-full bg-transparent border-b border-white/[0.15] py-3 text-white text-[15px] placeholder-white/20 outline-none focus:border-white/50 transition-colors font-sans" />
                  </div>
                ))}
                <div>
                  <label htmlFor="msg" className="num-label block mb-2">{T.form_msg}</label>
                  <textarea id="msg" rows={4} required placeholder={T.form_ph_msg} value={form.msg} onChange={e => setForm(f => ({ ...f, msg: e.target.value }))}
                    className="w-full bg-transparent border-b border-white/[0.15] py-3 text-white text-[15px] placeholder-white/20 outline-none focus:border-white/50 transition-colors resize-none font-sans" />
                </div>
                <button type="submit" disabled={busy} data-h className="btn-w w-full justify-center mt-4 disabled:opacity-40">
                  {busy ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />{T.form_busy}</span> : <><RiArrowRightLine size={16}/> {T.form_btn}</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
