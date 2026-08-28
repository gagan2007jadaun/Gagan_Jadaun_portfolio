import React, { useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import PageTransition from '../components/PageTransition';
import { Cpu, Server, Code2, Globe, ShieldCheck, Database, Cloud, Terminal, Sparkles, Layers, Box } from 'lucide-react';

const techCategories = [
  { id: 'all', label: 'All Technologies' },
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'backend', label: 'Backend & Systems' },
  { id: 'ai', label: 'AI & Data Engine' },
  { id: 'devops', label: 'Cloud & Infrastructure' },
];

const techStack = [
  // Frontend
  { name: 'React / Next.js', category: 'frontend', level: 95, exp: '5 yrs', icon: Code2, highlight: true },
  { name: 'TypeScript', category: 'frontend', level: 92, exp: '4 yrs', icon: Terminal, highlight: true },
  { name: 'Three.js / WebGL', category: 'frontend', level: 85, exp: '3 yrs', icon: Box, highlight: true },
  { name: 'Tailwind CSS / Vanilla', category: 'frontend', level: 98, exp: '5 yrs', icon: Globe },

  // Backend
  { name: 'Node.js / Express', category: 'backend', level: 94, exp: '5 yrs', icon: Server, highlight: true },
  { name: 'Python / FastAPI', category: 'backend', level: 90, exp: '4 yrs', icon: Cpu, highlight: true },
  { name: 'Go (Golang)', category: 'backend', level: 82, exp: '2 yrs', icon: Layers },
  { name: 'GraphQL / REST APIs', category: 'backend', level: 92, exp: '4 yrs', icon: Globe },

  // AI & Data
  { name: 'PostgreSQL / Supabase', category: 'ai', level: 90, exp: '4 yrs', icon: Database, highlight: true },
  { name: 'Redis Cache Cluster', category: 'ai', level: 88, exp: '3 yrs', icon: Database },
  { name: 'LangChain & LlamaIndex', category: 'ai', level: 86, exp: '2 yrs', icon: Sparkles, highlight: true },
  { name: 'Vector DBs (Qdrant/Pinecone)', category: 'ai', level: 85, exp: '2 yrs', icon: Cpu },

  // Infrastructure
  { name: 'Docker & Kubernetes', category: 'devops', level: 88, exp: '3 yrs', icon: Cloud, highlight: true },
  { name: 'AWS (Lambda, S3, ECS)', category: 'devops', level: 86, exp: '4 yrs', icon: Cloud },
  { name: 'CI/CD Pipelines (GitHub)', category: 'devops', level: 92, exp: '4 yrs', icon: ShieldCheck },
  { name: 'Terraform Infrastructure', category: 'devops', level: 80, exp: '2 yrs', icon: Layers },
];

const philosophyCards = [
  {
    icon: Server,
    title: 'Architected for Resilience',
    description: 'I design software with fault tolerance, clean modular boundaries, and scalable event-driven messaging at its core.',
    color: 'var(--accent-cyan)',
  },
  {
    icon: Sparkles,
    title: 'Visual & Interactive Excellence',
    description: 'Great applications must feel fast, intuitive, and delightful. I prioritize micro-interactions, responsive states, and 60fps performance.',
    color: 'var(--accent-purple)',
  },
  {
    icon: Cpu,
    title: 'AI & Data Augmented Workflows',
    description: 'Harnessing modern LLM pipelines, semantic retrieval (RAG), and intelligent automation to solve complex enterprise problems.',
    color: 'var(--accent-emerald)',
  },
];

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

      {/* Core Philosophy Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '64px',
        }}
      >
        {philosophyCards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <PageTransition key={card.title} delay={idx * 150}>
              <div
                className="glass-card"
                style={{
                  padding: '32px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${card.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.color,
                    boxShadow: `0 0 16px ${card.color}33`,
                  }}
                >
                  <IconComp size={24} />
                </div>
                <h3 style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 700 }}>
                  {card.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {card.description}
                </p>
              </div>
            </PageTransition>
          );
        })}
      </div>

      {/* Interactive Tech Stack Matrix */}
      <PageTransition delay={200}>
        <div
          className="glass-card"
          style={{
            padding: '36px',
            background: 'var(--bg-secondary)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: '32px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '20px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>
                Technical Proficiency Matrix
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Filter by domain to inspect mastery levels and experience metrics.
              </p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {techCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      background: isActive ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.04)',
                      color: isActive ? '#000' : 'var(--text-muted)',
                      border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                      fontWeight: isActive ? 700 : 500,
                      borderRadius: '99px',
                      padding: '8px 16px',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of Tech Pills */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
            }}
          >
            {filteredStack.map((tech) => {
              const IconComponent = tech.icon;
              const isSelected = selectedTech?.name === tech.name;

              return (
                <div
                  key={tech.name}
                  onClick={() => setSelectedTech(isSelected ? null : tech)}
                  style={{
                    background: isSelected ? 'rgba(0, 242, 254, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected
                      ? '1px solid var(--accent-cyan)'
                      : tech.highlight
                      ? '1px solid rgba(255, 255, 255, 0.12)'
                      : '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent-cyan)',
                        }}
                      >
                        <IconComponent size={16} />
                      </div>
                      <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>
                        {tech.name}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-dim)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {tech.exp}
                    </span>
                  </div>

                  {/* Meter bar */}
                  <div
                    style={{
                      height: '5px',
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.06)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${tech.level}%`,
                        background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
                        borderRadius: '4px',
                        transition: 'width 0.8s ease',
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '6px',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <span>Proficiency</span>
                    <span>{tech.level}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PageTransition>
    </section>
  );
}
