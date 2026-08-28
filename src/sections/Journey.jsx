import React, { useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import PageTransition from '../components/PageTransition';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const journeyCategories = [
  { id: 'all', label: 'All Trajectory' },
  { id: 'experience', label: 'Work Experience' },
  { id: 'education', label: 'Education' },
  { id: 'learning', label: 'Learning' },
  { id: 'projects', label: 'Projects' },
  { id: 'community', label: 'Community' },
  { id: 'current', label: 'Current' },
];

const timelineData = [
  {
    id: 'independent-developer',
    type: 'experience',
    role: '💻 Independent Developer',
    organization: 'Self-Directed / Independent',
    period: '2025 — Present',
    location: 'Type: Independent / Self-Directed',
    summary: 'Designing and developing independent software projects while exploring AI, web technologies, system design and product development.',
    details: [
      'Architected end-to-end applications (PrivLink, ZYNK, Earth-Pulse-Monitor, CALX-G).',
      'Hands-on exploration of Full-Stack web stacks, WebSockets, Three.js 3D shaders, and Machine Learning.',
      'Open to future industry internships and software engineering opportunities.',
    ],
    skills: ['Full-Stack', 'AI & ML', 'System Design', 'Web Tech'],
    icon: Briefcase,
    color: 'var(--accent-cyan)',
  },
  {
    id: 'started-engineering',
    type: 'education',
    role: '🎓 2025 — STARTED ENGINEERING',
    organization: 'Lovely Professional University',
    period: '2025 — Present',
    location: 'B.Tech CSE — AI & ML',
    summary: 'Started my engineering journey with a focus on programming, computer science fundamentals, and Artificial Intelligence & Machine Learning.',
    details: [
      'Core focus on Computer Science Fundamentals & Mathematics.',
      'Specializing in Artificial Intelligence & Machine Learning concepts.',
      'Active participation in coding sessions and hands-on lab work.',
    ],
    skills: ['Python', 'C', 'AI & ML', 'CS Fundamentals'],
    icon: GraduationCap,
    color: 'var(--accent-cyan)',
  },
  {
    id: 'programming-foundations',
    type: 'learning',
    role: '💻 2025 — PROGRAMMING FOUNDATIONS',
    organization: 'Python • C • Web Development',
    period: '2025',
    location: 'Foundational Skill Build',
    summary: 'Built my foundation in programming through Python, C, HTML, CSS, JavaScript, databases, and academic projects.',
    details: [
      'Mastered core procedural and object-oriented programming concepts.',
      'Developed responsive frontend web layouts with HTML5 & CSS3.',
      'Explored database design and SQL relational data storage.',
    ],
    skills: ['Python', 'C', 'HTML', 'CSS', 'JavaScript', 'SQL'],
    icon: Briefcase,
    color: 'var(--accent-purple)',
  },
  {
    id: 'building-projects',
    type: 'projects',
    role: '🛠️ 2025–26 — BUILDING PROJECTS',
    organization: 'Software • Web • UI/UX',
    period: '2025 — 2026',
    location: 'Hands-on Development',
    summary: 'Started turning ideas into practical projects, exploring application development, user interfaces, databases, and real-world problem solving.',
    details: [
      'Architected end-to-end full-stack applications like PrivLink and ZYNK.',
      'Focused on intuitive user experience (UI/UX) and glassmorphic designs.',
      'Integrated real-time WebSockets and client-side encryption algorithms.',
    ],
    skills: ['React', 'Full-Stack', 'UI/UX Design', 'WebSockets'],
    icon: Award,
    color: 'var(--accent-amber)',
  },
  {
    id: 'ai-software-exploration',
    type: 'learning',
    role: '🤖 2026 — AI & SOFTWARE EXPLORATION',
    organization: 'AI/ML • C++ • DSA • Product Development',
    period: '2026',
    location: 'Advanced Concepts',
    summary: 'Expanded my focus toward Artificial Intelligence, Machine Learning, C++, Data Structures & Algorithms, and software product development.',
    details: [
      'Problem solving using C++ with focus on time & space complexity.',
      'Exploring Machine Learning pipelines and scientific compute engines (CALX-G).',
      'Engineered 3D WebGL telemetry visualizations (Earth-Pulse-Monitor).',
    ],
    skills: ['C++', 'DSA', 'Machine Learning', 'Three.js'],
    icon: Briefcase,
    color: 'var(--accent-emerald)',
  },
  {
    id: 'community-development',
    type: 'community',
    role: '🌐 2026 — COMMUNITY DEVELOPMENT',
    organization: 'Python-Integrated Community Development Programme',
    period: '2026',
    location: 'Community & Outreach',
    summary: 'Created Python-focused educational content and contributed to a community-development initiative through technology and content creation.',
    details: [
      'Designed Python tutorials and step-by-step programming content.',
      'Contributed to tech education initiatives to mentor emerging coders.',
    ],
    skills: ['Python', 'Community Outreach', 'Content Creation', 'Mentorship'],
    icon: Award,
    color: 'var(--accent-pink)',
  },
  {
    id: 'currently-building',
    type: 'current',
    role: '🚀 2026 — CURRENTLY BUILDING',
    organization: 'Experiments • Products • Intelligent Systems',
    period: '2026 — Present',
    location: 'Active Innovation',
    summary: 'Exploring new ideas across AI, software engineering, web development, and intelligent systems while building projects beyond the classroom.',
    details: [
      'Developing AI-driven web apps and high-performance interactive web tools.',
      'Continuously expanding open-source contributions on GitHub.',
    ],
    skills: ['AI Systems', 'Vite & React', 'Open Source', 'Innovation'],
    icon: Briefcase,
    color: 'var(--accent-cyan)',
  },
];

export default function Journey() {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedIds, setExpandedIds] = useState(['started-engineering']);

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
          number="03"
          label="JOURNEY"
          title="Career Journey & Key Milestones"
          subtitle="From learning the fundamentals to building software, exploring AI, and experimenting with real-world ideas."
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

        {filteredItems.length === 0 ? (
          <PageTransition>
            <div
              className="glass-card"
              style={{
                padding: '48px 32px',
                textAlign: 'center',
                background: 'var(--bg-secondary)',
                border: '1px dashed rgba(0, 242, 254, 0.3)',
                borderRadius: '16px',
                marginLeft: '16px',
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
                <GraduationCap size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 800, marginBottom: '8px' }}>
                Career &amp; Education Section Open
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto' }}>
                This section is ready for your custom work experience, degree details, certifications, and awards. Tell me what items you'd like to add!
              </p>
            </div>
          </PageTransition>
        ) : (
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

                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '16px' }}>
                        {item.summary}
                      </p>

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
        )}
      </div>
    </section>
  );
}
