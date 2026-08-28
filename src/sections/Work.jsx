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
    id: 'nexus-stream',
    title: 'NexusStream — Real-Time Event Bus',
    category: 'systems',
    categoryLabel: 'Systems & Cloud',
    description: 'Distributed pub-sub event streaming platform capable of processing 250,000+ events per second with sub-10ms p99 latency.',
    metrics: [
      { label: 'Throughput', value: '250K ops/sec' },
      { label: 'p99 Latency', value: '< 8.4ms' },
      { label: 'Uptime', value: '99.999%' },
    ],
    tech: ['Go', 'Kafka', 'Redis Cluster', 'Docker', 'React', 'gRPC'],
    github: 'https://github.com/gagan-dev/nexus-stream',
    live: 'https://nexus-stream-demo.gagan.dev',
    featured: true,
    accentColor: 'var(--accent-cyan)',
    architecture: `Architecture Overview:
• Distributed Broker Cluster using Go raft consensus.
• In-memory ring buffer memory pool to eliminate garbage collection pauses.
• Real-time WebSocket & gRPC bridge for web UI metric monitoring.`,
  },
  {
    id: 'cortex-rag',
    title: 'CortexRAG — Intelligent Enterprise Search',
    category: 'ai',
    categoryLabel: 'AI & Neural Systems',
    description: 'Context-aware semantic knowledge engine combining hybrid dense vector retrieval with LLM graph synthesis.',
    metrics: [
      { label: 'Doc Ingestion', value: '50K pages/min' },
      { label: 'Query Recall', value: '96.2%' },
      { label: 'Cost Reduction', value: '45%' },
    ],
    tech: ['Python', 'FastAPI', 'LangChain', 'Qdrant Vector DB', 'Next.js', 'PostgreSQL'],
    github: 'https://github.com/gagan-dev/cortex-rag',
    live: 'https://cortex-rag-demo.gagan.dev',
    featured: true,
    accentColor: 'var(--accent-purple)',
    architecture: `Architecture Overview:
• Multi-modal chunking pipeline utilizing SentenceTransformers.
• Two-stage re-ranking algorithm (Cross-Encoder + BM25 hybrid).
• Async streaming SSE response protocol with client-side token rendering.`,
  },
  {
    id: 'synthwave-canvas',
    title: 'SynthWave — 3D Audio Visualizer Studio',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Apps',
    description: 'Interactive web visualizer synth generating real-time WebGL shader GPU FX driven by audio frequency decomposition.',
    metrics: [
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Audio Latency', value: '12ms' },
      { label: 'GPU Draw Calls', value: '< 15' },
    ],
    tech: ['React', 'Three.js', 'Web Audio API', 'GLSL Shaders', 'TypeScript'],
    github: 'https://github.com/gagan-dev/synthwave-canvas',
    live: 'https://synthwave-studio.gagan.dev',
    featured: true,
    accentColor: 'var(--accent-pink)',
    architecture: `Architecture Overview:
• Custom Fragment & Vertex GLSL Shaders for audio reactive mesh deformation.
• Web Audio AnalyserNode FFT processing in a dedicated Web Worker thread.
• Export pipeline supporting WebM video canvas recordings.`,
  },
  {
    id: 'cloud-guard',
    title: 'CloudGuard — Automated K8s Sentinel',
    category: 'systems',
    categoryLabel: 'Systems & Cloud',
    description: 'Security & compliance auditor for Kubernetes clusters with automated drift detection and instant remediations.',
    metrics: [
      { label: 'Scan Speed', value: '1,000 pods/sec' },
      { label: 'CVE Detection', value: 'Real-time' },
      { label: 'FPR', value: '< 0.01%' },
    ],
    tech: ['Go', 'Kubernetes API', 'OPA Rego', 'Prometheus', 'Grafana', 'React'],
    github: 'https://github.com/gagan-dev/cloud-guard',
    live: 'https://cloud-guard.gagan.dev',
    featured: false,
    accentColor: 'var(--accent-emerald)',
    architecture: `Architecture Overview:
• Admission Controller webhook in Kubernetes intercepting manifest deployments.
• Real-time Prometheus metrics exporter with Grafana dashboard integration.`,
  },
  {
    id: 'dev-flow',
    title: 'DevFlow — AI Pair Programming Workspace',
    category: 'ai',
    categoryLabel: 'AI & Neural Systems',
    description: 'Collaborative cloud IDE with AI inline refactoring, AST code graph analysis, and instant sandbox previews.',
    metrics: [
      { label: 'User Rating', value: '4.9 / 5' },
      { label: 'Latency', value: '85ms' },
      { label: 'Active Users', value: '12,500+' },
    ],
    tech: ['Next.js', 'TypeScript', 'WebContainers API', 'Monaco Editor', 'Node.js'],
    github: 'https://github.com/gagan-dev/dev-flow',
    live: 'https://devflow-ide.gagan.dev',
    featured: false,
    accentColor: 'var(--accent-blue)',
    architecture: `Architecture Overview:
• In-browser Node.js runtime using WebContainers for zero-server execution.
• Real-time collaborative operational transformation (OT) sync.`,
  },
  {
    id: 'vault-pay',
    title: 'VaultPay — Cross-Border Payment Protocol',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Apps',
    description: 'High-security fintech gateway enabling instant cryptographic settlement and multi-currency ledger management.',
    metrics: [
      { label: 'Tx Volume', value: '$12M+' },
      { label: 'Settlement Time', value: '2.1 sec' },
      { label: 'Compliance', value: 'SOC 2 Type II' },
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe API', 'Docker', 'Redis'],
    github: 'https://github.com/gagan-dev/vault-pay',
    live: 'https://vaultpay-fintech.gagan.dev',
    featured: false,
    accentColor: 'var(--accent-amber)',
    architecture: `Architecture Overview:
• Double-entry accounting transaction engine enforcing strict ledger invariants.
• Encrypted payload signing with hardware security module (HSM) hooks.`,
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
