import React, { useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import PageTransition from '../components/PageTransition';
import { ExternalLink, Github, Layers, Sparkles, X, ChevronRight, Activity, Terminal, Shield, Zap } from 'lucide-react';

const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full-Stack Apps' },
  { id: 'ai', label: 'AI & Neural Systems' },
  { id: 'systems', label: 'Systems & Cloud' },
];

const projectsData = [
  {
    id: 'priv-link',
    title: 'PrivLink — Encrypted Secret Sharing',
    category: 'fullstack',
    categoryLabel: 'Security & Full-Stack',
    description: 'Zero-knowledge encrypted link generator for secure secret transmission, self-destructing credentials, and privacy-first payload storage.',
    metrics: [
      { label: 'Security', value: 'E2E Crypto' },
      { label: 'Storage', value: 'Zero-Knowledge' },
      { label: 'Latency', value: '< 25ms' },
    ],
    tech: ['React', 'Node.js', 'Web Crypto API', 'Express', 'Redis', 'Tailwind CSS'],
    github: 'https://github.com/gagan2007jadaun/PrivLink',
    live: 'https://github.com/gagan2007jadaun/PrivLink',
    featured: true,
    accentColor: 'var(--accent-cyan)',
    architecture: `Architecture Overview:
• Client-side Web Crypto API key generation ensuring unencrypted data never touches server network sockets.
• In-memory ephemeral Redis store for instant payload expiration and auto-purge after access.
• Secure tokenized URL routing with rate-limiting throttling guards.`,
  },
  {
    id: 'zynk',
    title: 'ZYNK — Real-Time Collaborative Workspace',
    category: 'fullstack',
    categoryLabel: 'Full-Stack & Real-Time',
    description: 'High-performance real-time collaboration engine supporting instant messaging, WebSocket state sync, dynamic rooms, and live media sharing.',
    metrics: [
      { label: 'Sync Latency', value: '< 15ms' },
      { label: 'Protocol', value: 'WebSockets' },
      { label: 'Concurrence', value: 'Multi-Room' },
    ],
    tech: ['React', 'TypeScript', 'WebSockets', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/gagan2007jadaun/ZYNK',
    live: 'https://github.com/gagan2007jadaun/ZYNK',
    featured: true,
    accentColor: 'var(--accent-purple)',
    architecture: `Architecture Overview:
• Event-driven WebSocket engine with automatic reconnection heartbeat monitoring.
• Room-based broadcast channel architecture for isolated state updates and instant messaging.
• Optimistic UI updates with client-side state reconciliation.`,
  },
  {
    id: 'earth-pulse-monitor',
    title: 'Earth-Pulse-Monitor — Global Seismic Telemetry',
    category: 'systems',
    categoryLabel: 'Systems & WebGL Visualizer',
    description: 'Interactive 3D Earth visualization platform monitoring real-time seismic events, planetary telemetry, and climate sensor feeds.',
    metrics: [
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Data Source', value: 'Live Telemetry' },
      { label: 'Visual Engine', value: 'Three.js' },
    ],
    tech: ['React', 'Three.js', 'WebGL', 'GeoJSON', 'Open API', 'Tailwind CSS'],
    github: 'https://github.com/gagan2007jadaun/Earth-Pulse-Monitor',
    live: 'https://github.com/gagan2007jadaun/Earth-Pulse-Monitor',
    featured: true,
    accentColor: 'var(--accent-emerald)',
    architecture: `Architecture Overview:
• Interactive Three.js 3D sphere mesh rendering geocoded coordinate point clouds in real time.
• Async stream parser consuming global seismic and meteorological API feeds.
• Custom shader uniforms for pulse wave rendering around active epicenter coordinate locations.`,
  },
  {
    id: 'calx-g',
    title: 'CALX-G — Advanced Computational Engine',
    category: 'ai',
    categoryLabel: 'AI & Computational Engines',
    description: 'Scientific calculator and high-speed mathematical engine designed for complex expression parsing, matrix transformations, and numerical algorithms.',
    metrics: [
      { label: 'Precision', value: 'High-Float' },
      { label: 'Engine', value: 'Algorithmic' },
      { label: 'Exec Speed', value: 'Instant' },
    ],
    tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'NumPy', 'MathJS'],
    github: 'https://github.com/gagan2007jadaun/CALX-G',
    live: 'https://github.com/gagan2007jadaun/CALX-G',
    featured: false,
    architecture: `Architecture Overview:
• Abstract Syntax Tree (AST) expression parser evaluating complex mathematical formulas.
• High-efficiency matrix calculation engine supporting linear algebra transformations.`,
  },
];

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section
      id="work"
      style={{
        padding: '100px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <PageTransition>
        <SectionLabel
          number="02"
          label="PROJECTS"
          title="Flagship Software Projects"
          subtitle="A selection of high-performance web applications, distributed backend services, and AI solutions I have architected and built."
        />
      </PageTransition>

      {/* Category Filter Tabs */}
      <PageTransition delay={100}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '40px',
          }}
        >
          {projectCategories.map((cat) => {
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
                  padding: '10px 20px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </PageTransition>

      {/* Projects Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '28px',
        }}
      >
        {filteredProjects.map((project, idx) => (
          <PageTransition key={project.id} delay={idx * 100}>
            <div
              className="glass-card"
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                borderTop: `3px solid ${project.accentColor}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div>
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: project.accentColor,
                      background: `${project.accentColor}15`,
                      padding: '4px 10px',
                      borderRadius: '99px',
                      border: `1px solid ${project.accentColor}33`,
                    }}
                  >
                    {project.categoryLabel}
                  </span>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                      title="View GitHub Source"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                      title="Live Demonstration"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: '12px',
                    lineHeight: 1.3,
                  }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    marginBottom: '24px',
                  }}
                >
                  {project.description}
                </p>

                {/* Metrics Badges */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    marginBottom: '24px',
                  }}
                >
                  {project.metrics.map((m) => (
                    <div key={m.label} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                        {m.value}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Pills */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '20px',
                  }}
                >
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-muted)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* View Details Drawer CTA */}
                <button
                  onClick={() => setSelectedProject(project)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '10px',
                    color: '#fff',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>Architecture Deep-Dive</span>
                  <ChevronRight size={16} color={project.accentColor} />
                </button>
              </div>
            </div>
          </PageTransition>
        ))}
      </div>

      {/* Project Architecture Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '680px',
              width: '100%',
              padding: '36px',
              background: 'var(--bg-secondary)',
              border: `1px solid ${selectedProject.accentColor}`,
              boxShadow: `0 0 50px ${selectedProject.accentColor}33`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: selectedProject.accentColor }}>
                  {selectedProject.categoryLabel}
                </span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>

            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
              {selectedProject.description}
            </p>

            <div
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '24px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: '#e2e8f0',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.7,
              }}
            >
              {selectedProject.architecture}
            </div>

            <div style={{ display: 'flex', gap: '14px' }}>
              <a
                href={selectedProject.live}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <ExternalLink size={16} />
                <span>Launch Live App</span>
              </a>
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Github size={16} />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
