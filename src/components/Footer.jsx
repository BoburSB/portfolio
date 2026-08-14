import { useLang } from '../context/LangContext';

export default function Footer() {
  const { T } = useLang();
  return (
    <footer className="bg-black border-t border-white/[0.06] py-8">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-h
          className="font-mono text-sm tracking-[0.2em] text-white/50 hover:text-white transition-colors uppercase">
          SB<span className="text-white/20">.</span>
        </button>
        <p className="font-mono text-xs text-white/20">
          © 2026 Sodiqov Bobur — {T.footer_copy}
        </p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-h
          className="num-label hover:text-white/60 transition-colors">
          Tepaga ↑
        </button>
      </div>
    </footer>
  );
}
