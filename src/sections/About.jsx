import React, { useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import PageTransition from '../components/PageTransition';
import { Cpu, Server, Code2, Globe, ShieldCheck, Database, Cloud, Terminal, Sparkles, Layers, Box } from 'lucide-react';

const techCategories = [
  { id: 'all', label: 'All Technologies' },
];

const techStack = [];
const philosophyCards = [];

export default function About() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState(null);

  const filteredStack = activeCategory === 'all'
    ? techStack
    : techStack.filter((item) => item.category === activeCategory);

  return (
    <section
      id="about"
      style={{
        padding: '100px 24px',
        position: 'relative',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
    >
      <PageTransition>
        <SectionLabel
          number="01"
          title="Engineering Philosophy & Technical Stack"
          subtitle="Combining deep architectural fundamentals with modern web graphics and AI capabilities."
        />
      </PageTransition>

      <PageTransition delay={100}>
        <div
          className="glass-card"
          style={{
            padding: '48px 32px',
            textAlign: 'center',
            background: 'var(--bg-secondary)',
            border: '1px dashed rgba(0, 242, 254, 0.3)',
            borderRadius: '16px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(0, 242, 254, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              color: 'var(--accent-cyan)',
            }}
          >
            <Code2 size={24} />
          </div>
          <h3 style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 800, marginBottom: '8px' }}>
            Technical Stack &amp; Philosophy Section Open
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto' }}>
            This section is empty and ready for your custom engineering principles, core technical skills, and proficiency matrix.
          </p>
        </div>
      </PageTransition>
    </section>
  );
}
