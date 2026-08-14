import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Cursor      from './components/Cursor';
import Navbar      from './components/Navbar';
import Hero        from './components/Hero';
import About       from './components/About';
import Work        from './components/Work';
import Skills      from './components/Skills';
import Experience  from './components/Experience';
import Process     from './components/Process';
import Numbers     from './components/Numbers';
import FAQ         from './components/FAQ';
import Contact     from './components/Contact';
import Footer      from './components/Footer';
import IntroPortal from './components/IntroPortal';
import { LangProvider } from './context/LangContext';

export default function App() {
  const [portalDone, setPortalDone] = useState(false);

  useEffect(() => {
    // Lenis smooth scrolling setup
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.2,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <LangProvider>
      <Cursor />
      <IntroPortal onComplete={() => setPortalDone(true)} />
      
      {/* The main app content is wrapped to allow for the portal "fly-in" effect */}
      <div className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${portalDone ? 'scale-100 opacity-100 blur-0' : 'scale-110 opacity-0 blur-md h-screen overflow-hidden'}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Work />
          <Skills />
          <Experience />
          <Process />
          <Numbers />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
