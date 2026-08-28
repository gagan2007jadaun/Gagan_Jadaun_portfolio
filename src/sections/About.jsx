import React from 'react';
import SectionLabel from '../components/SectionLabel';
import PageTransition from '../components/PageTransition';
import { Cpu, Terminal, Compass, Sparkles, Code2, Flame, ArrowRight, Layers } from 'lucide-react';

const pillars = [
  {
    number: '01',
    title: 'ENGINEER',
    icon: Cpu,
    color: 'var(--accent-cyan)',
    description:
      'I like understanding how systems work beneath the surface, from programming fundamentals and data structures to software architecture and AI.',
  },
  {
    number: '02',
    title: 'BUILDER',
    icon: Terminal,
    color: 'var(--accent-purple)',
    description:
      'I learn best by building. I turn concepts and rough ideas into projects that I can actually test, break, improve and use.',
  },
  {
    number: '03',
    title: 'EXPLORER',
    icon: Compass,
    color: 'var(--accent-emerald)',
    description:
      "I'm constantly experimenting with new technologies, interfaces and ideas across AI, software development and the web.",
  },
];

const skillsPills = [
  { name: 'PYTHON', color: 'var(--accent-cyan)' },
  { name: 'C++', color: 'var(--accent-purple)' },
  { name: 'JAVASCRIPT', color: 'var(--accent-amber)' },
  { name: 'REACT', color: 'var(--accent-blue)' },
  { name: 'HTML / CSS', color: 'var(--accent-pink)' },
  { name: 'SQL', color: 'var(--accent-emerald)' },
  { name: 'AI / ML', color: 'var(--accent-cyan)' },
  { name: 'GIT', color: 'var(--text-muted)' },
];

export default function About() {
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
          title="About — The Idea"
          subtitle="Combining deep architectural fundamentals with modern web graphics and AI capabilities."
        />
      </PageTransition>

      {/* Main Big Headline & Intro */}
      <PageTransition delay={100}>
        <div style={{ marginBottom: '64px' }}>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '24px',
              fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase',
            }}
          >
            I'm curious about <br />
            <span
              style={{
                background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              how things work.
            </span>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              color: 'var(--text-muted)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            <div
              className="glass-card"
              style={{
                padding: '28px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderLeft: '4px solid var(--accent-cyan)',
              }}
            >
              I'm <strong style={{ color: '#fff' }}>Gagan Jadaun</strong>, a Computer Science &amp; Engineering student specializing in <strong style={{ color: 'var(--accent-cyan)' }}>Artificial Intelligence &amp; Machine Learning</strong> at Lovely Professional University.
            </div>

            <div
              className="glass-card"
              style={{
                padding: '28px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderLeft: '4px solid var(--accent-purple)',
              }}
            >
              I enjoy turning ideas into functional things—whether that's a web experience, a software project, an intelligent system, or simply an experiment that helps me understand how technology works.
            </div>
          </div>
        </div>
      </PageTransition>

      {/* 🧠 WHO I AM: 3 Pillars Grid */}
      <PageTransition delay={200}>
        <div style={{ marginBottom: '80px' }}>
          <div
            style={{
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-cyan)',
              letterSpacing: '0.1em',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Sparkles size={16} /> WHO I AM
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {pillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="glass-card"
                  style={{
                    padding: '32px',
                    position: 'relative',
                    background: 'var(--bg-secondary)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '20px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '1.4rem',
                          fontWeight: 900,
                          color: 'rgba(255, 255, 255, 0.2)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {pillar.number}
                      </span>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '10px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: `1px solid ${pillar.color}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: pillar.color,
                        }}
                      >
                        <IconComponent size={20} />
                      </div>
                    </div>

                    <h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: '#fff',
                        marginBottom: '12px',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PageTransition>

      {/* ⚙️ WHAT I WORK WITH & CURRENTLY EXPLORING */}
      <PageTransition delay={250}>
        <div
          className="glass-card"
          style={{
            padding: '40px',
            marginBottom: '80px',
            background: 'var(--bg-secondary)',
          }}
        >
          <div
            style={{
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-purple)',
              letterSpacing: '0.1em',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Code2 size={16} /> WHAT I WORK WITH
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '32px',
            }}
          >
            {skillsPills.map((pill) => (
              <div
                key={pill.name}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '10px 20px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: pill.color }} />
                <span>{pill.name}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>Currently exploring:</span>
            <span>Artificial Intelligence · Machine Learning · C++ · DSA · Full-Stack Development · Product Engineering</span>
          </div>
        </div>
      </PageTransition>

      {/* 🔥 YOUR PERSONAL PHILOSOPHY (Visual Centerpiece Banner) */}
      <PageTransition delay={300}>
        <div
          className="glass-card"
          style={{
            padding: '48px 36px',
            marginBottom: '80px',
            background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.05) 0%, rgba(121, 40, 202, 0.05) 100%)',
            border: '1px solid rgba(0, 242, 254, 0.2)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-pink)',
              letterSpacing: '0.1em',
              marginBottom: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Flame size={16} /> PERSONAL PHILOSOPHY
          </div>

          <h3
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 900,
              color: '#fff',
              marginBottom: '20px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            I LEARN BY BUILDING.
          </h3>

          <p
            style={{
              maxWidth: '720px',
              margin: '0 auto 36px auto',
              color: 'var(--text-muted)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            I don't want to learn technology only to complete a syllabus. I want to understand it well enough to use it to solve problems, create products, and explore ideas that don't have obvious answers.
          </p>

          {/* Glowing Loop Statement Banner */}
          <div
            style={{
              background: '#04060a',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              borderRadius: '14px',
              padding: '20px 24px',
              display: 'inline-block',
              boxShadow: '0 0 30px rgba(0, 242, 254, 0.15)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.95rem, 2.2vw, 1.4rem)',
                fontWeight: 800,
                background: 'linear-gradient(90deg, #00f2fe, #7928ca, #ff007a, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.08em',
              }}
            >
              LEARN → BUILD → BREAK → IMPROVE → REPEAT.
            </span>
          </div>
        </div>
      </PageTransition>

      {/* 🌱 WHERE I'M HEADED — THE NEXT CHAPTER */}
      <PageTransition delay={350}>
        <div
          className="glass-card"
          style={{
            padding: '40px',
            background: 'var(--bg-secondary)',
            borderLeft: '4px solid var(--accent-emerald)',
          }}
        >
          <div
            style={{
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-emerald)',
              letterSpacing: '0.1em',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Layers size={16} /> WHERE I'M HEADED — THE NEXT CHAPTER
          </div>

          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '1.05rem',
              lineHeight: 1.75,
              marginBottom: '24px',
              maxWidth: '840px',
            }}
          >
            I'm currently focused on becoming a stronger software engineer while going deeper into AI and Machine Learning. My long-term goal is to build technology that combines strong engineering with useful, thoughtful experiences.
          </p>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--accent-cyan)',
              letterSpacing: '0.05em',
            }}
          >
            Still learning. Still experimenting. Still building.
          </div>
        </div>
      </PageTransition>
    </section>
  );
}
