import React, { useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import PageTransition from '../components/PageTransition';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const journeyCategories = [
  { id: 'all', label: 'All Trajectory' },
  { id: 'experience', label: 'Work Experience' },
  { id: 'education', label: 'Education' },
  { id: 'awards', label: 'Awards & Honors' },
];

const timelineData = [
  {
    id: 'lead-architect',
    type: 'experience',
    role: 'Lead Systems Architect',
    organization: 'Nova Cloud Tech',
    period: '2024 — Present',
    location: 'San Francisco, CA (Remote)',
    summary: 'Spearheaded distributed microservices platform migration, engineered high-throughput Kafka pipelines, and managed a team of 8 senior engineers.',
    details: [
      'Reduced p99 system latency by 68% through Rust/Go core buffer optimizations.',
      'Architected multi-tenant RAG search solution serving over 2M monthly queries.',
      'Enforced strict Zero Trust security models across AWS Elastic Kubernetes clusters.',
    ],
    skills: ['Go', 'Kubernetes', 'Kafka', 'AWS', 'Python RAG', 'Rust'],
    icon: Briefcase,
    color: 'var(--accent-cyan)',
  },
  {
    id: 'senior-fullstack',
    type: 'experience',
    role: 'Senior Full-Stack Engineer',
    organization: 'HyperScale Labs',
    period: '2022 — 2024',
    location: 'New York, NY',
    summary: 'Designed real-time WebGL financial telemetry dashboards, Next.js web applications, and optimized PostgreSQL query indexes.',
    details: [
      'Built custom WebGL chart library handling 50,000+ data points rendered at 60fps.',
      'Accelerated CI/CD build speeds by 3.5x using TurboRepo and Docker caching layers.',
    ],
    skills: ['React', 'Next.js', 'Three.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    icon: Briefcase,
    color: 'var(--accent-purple)',
  },
  {
    id: 'hackathon-first',
    type: 'awards',
    role: '1st Place Grand Winner',
    organization: 'Global AI & Cloud Hackathon 2023',
    period: 'Nov 2023',
    location: 'Global',
    summary: 'Awarded 1st place among 1,400+ international developers for building an autonomous multi-agent code refactoring bot.',
    details: [
      'Integrated Llama-3 local quantization with AST code parser.',
      'Demonstrated live automated PR generation with unit test creation.',
    ],
    skills: ['AI Agents', 'LangChain', 'FastAPI', 'Python'],
    icon: Award,
    color: 'var(--accent-amber)',
  },
  {
    id: 'btech-cs',
    type: 'education',
    role: 'B.Tech in Computer Science & Engineering',
    organization: 'Institute of Technology',
    period: '2018 — 2022',
    location: 'GPA: 3.9 / 4.0',
    summary: 'Graduated with Highest Honors. Focused on Distributed Algorithms, Operating Systems, Machine Learning, and Computer Graphics.',
    details: [
      'Published undergrad paper on Distributed Hash Table optimization.',
      'Head of University Open Source & Competitive Programming Club.',
    ],
    skills: ['C++', 'Data Structures', 'Operating Systems', 'Algorithms'],
    icon: GraduationCap,
    color: 'var(--accent-emerald)',
  },
];

export default function Journey() {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedIds, setExpandedIds] = useState(['lead-architect']);

  const filteredItems = activeTab === 'all'
    ? timelineData
    : timelineData.filter((item) => item.type === activeTab);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="journey"
      style={{
        padding: '100px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <PageTransition>
        <SectionLabel
          number="05"
          title="Career Journey & Key Milestones"
          subtitle="My path through software engineering, technical leadership, hackathons, and continuous learning."
        />
      </PageTransition>

      {/* Filter Tabs */}
      <PageTransition delay={100}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '48px',
          }}
        >
          {journeyCategories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  background: isActive ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#000' : 'var(--text-muted)',
                  border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                  fontWeight: isActive ? 700 : 500,
                  borderRadius: '99px',
                  padding: '10px 20px',
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
      </PageTransition>

      {/* Vertical Interactive Timeline */}
      <div style={{ position: 'relative', paddingLeft: '24px' }}>
        {/* Timeline Center Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '11px',
            width: '2px',
            background: 'linear-gradient(180deg, var(--accent-cyan), var(--accent-purple), transparent)',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {filteredItems.map((item, idx) => {
            const IconComponent = item.icon;
            const isExpanded = expandedIds.includes(item.id);

            return (
              <PageTransition key={item.id} delay={idx * 120}>
                <div style={{ position: 'relative' }}>
                  {/* Timeline Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-24px',
                      top: '20px',
                      transform: 'translateX(-50%)',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'var(--bg-primary)',
                      border: `2px solid ${item.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 3,
                      boxShadow: `0 0 12px ${item.color}`,
                    }}
                  >
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: item.color,
                      }}
                    />
                  </div>

                  {/* Card Content */}
                  <div
                    className="glass-card"
                    style={{
                      padding: '28px',
                      background: 'var(--bg-secondary)',
                      marginLeft: '16px',
                    }}
                  >
                    {/* Header */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-mono)',
                            color: item.color,
                            background: `${item.color}15`,
                            padding: '4px 10px',
                            borderRadius: '99px',
                          }}
                        >
                          {item.organization}
                        </span>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginTop: '6px' }}>
                          {item.role}
                        </h3>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                          <Calendar size={14} />
                          <span>{item.period}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                          {item.location}
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '16px' }}>
                      {item.summary}
                    </p>

                    {/* Expandable details */}
                    {isExpanded && (
                      <div
                        style={{
                          background: 'rgba(0, 0, 0, 0.3)',
                          borderLeft: `3px solid ${item.color}`,
                          borderRadius: '0 8px 8px 0',
                          padding: '16px 20px',
                          marginBottom: '20px',
                        }}
                      >
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                          Key Achievements &amp; Impact:
                        </div>
                        <ul style={{ paddingLeft: '18px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                          {item.details.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Footer Row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {item.skills.map((s) => (
                          <span
                            key={s}
                            style={{
                              fontSize: '0.75rem',
                              fontFamily: 'var(--font-mono)',
                              color: 'var(--text-dim)',
                              background: 'rgba(255, 255, 255, 0.04)',
                              padding: '3px 8px',
                              borderRadius: '4px',
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => toggleExpand(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--accent-cyan)',
                          fontSize: '0.85rem',
                          fontFamily: 'var(--font-mono)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <span>{isExpanded ? 'Hide Details' : 'Expand Impact'}</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </PageTransition>
            );
          })}
        </div>
      </div>
    </section>
  );
}
