import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';
import About from './sections/About';
import Work from './sections/Work';
import Journey from './sections/Journey';
import Contact from './sections/Contact';
import { ArrowUp, Terminal, Heart, Code2 } from 'lucide-react';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-main)',
        overflowX: 'hidden',
      }}
    >
      {/* Custom Mouse Cursor */}
      <CustomCursor />

      {/* Glassmorphic Navigation Bar */}
      <Navbar soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <Work />
        <Journey />
        <Contact soundEnabled={soundEnabled} />
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'var(--bg-secondary)',
          padding: '48px 24px',
          position: 'relative',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          {/* Left Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #00f2fe 0%, #7928ca 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Terminal size={16} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
              GAGAN<span style={{ color: 'var(--accent-cyan)' }}> JADAUN</span>
            </span>
          </div>

          {/* Center Copyright */}
          <div
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>&copy; 2026 Gagan. Engineered with React, Three.js &amp; Creative Rigor.</span>
          </div>

          {/* Right Scroll to top */}
          <button
            onClick={scrollToTop}
            className="btn-secondary"
            style={{
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Scroll to Top"
          >
            <ArrowUp size={18} color="var(--accent-cyan)" />
          </button>
        </div>
      </footer>
    </div>
  );
}
