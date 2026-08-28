import React, { useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import PageTransition from '../components/PageTransition';
import confetti from 'canvas-confetti';
import { Mail, Send, Terminal, Github, Linkedin, Twitter, Copy, Check, Sparkles, MessageSquare, MapPin } from 'lucide-react';

export default function Contact({ soundEnabled }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Terminal state
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState([
    { type: 'system', text: 'Gagan OS v4.2 Terminal [Type "help" for available commands]' },
  ]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#7928ca', '#ff007a', '#34d399'],
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('gagan.dev.arch@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // CLI submit handler
  const handleCliSubmit = (e) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    let response = [];
    if (cmd === 'help') {
      response = [
        { type: 'output', text: 'Available commands:' },
        { type: 'output', text: '  email     - Display & copy contact email' },
        { type: 'output', text: '  socials   - List official social media links' },
        { type: 'output', text: '  status    - View direct hiring availability' },
        { type: 'output', text: '  skills    - Print top engineering stack summary' },
        { type: 'output', text: '  clear     - Wipe terminal history' },
      ];
    } else if (cmd === 'email') {
      navigator.clipboard.writeText('gagan.dev.arch@gmail.com');
      response = [{ type: 'output', text: '✓ gagan.dev.arch@gmail.com copied to clipboard!' }];
    } else if (cmd === 'socials') {
      response = [
        { type: 'output', text: 'GitHub:   https://github.com/gagan-dev' },
        { type: 'output', text: 'LinkedIn: https://linkedin.com/in/gagan-dev-arch' },
        { type: 'output', text: 'Twitter:  https://x.com/gagan_architect' },
      ];
    } else if (cmd === 'status') {
      response = [{ type: 'output', text: 'Status: AVAILABLE for Lead / Senior Staff Software Engineer roles & advisory.' }];
    } else if (cmd === 'skills') {
      response = [{ type: 'output', text: 'Core: React/Next.js, Node.js, Go, Python RAG, Three.js, Kafka, Kubernetes, AWS.' }];
    } else if (cmd === 'clear') {
      setCliHistory([]);
      setCliInput('');
      return;
    } else {
      response = [{ type: 'error', text: `Command not found: "${cmd}". Type "help" for command list.` }];
    }

    setCliHistory((prev) => [...prev, { type: 'user', text: `$ ${cliInput}` }, ...response]);
    setCliInput('');
  };

  return (
    <section
      id="contact"
      style={{
        padding: '100px 24px 120px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <PageTransition>
        <SectionLabel
          number="06"
          title="Initiate Contact & Collaboration"
          subtitle="Whether you're looking for a Lead Architect, Senior Full-Stack Engineer, or technical advisor, let's build something extraordinary together."
        />
      </PageTransition>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '32px',
        }}
      >
        {/* Left Column: Interactive Command Line Terminal */}
        <PageTransition delay={100}>
          <div
            className="glass-card"
            style={{
              padding: '32px',
              background: 'var(--bg-secondary)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Terminal color="var(--accent-cyan)" />
                  <h3 style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 700 }}>
                    gagan --interactive-cli
                  </h3>
                </div>
                <button
                  onClick={handleCopyEmail}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    color: copiedEmail ? 'var(--accent-emerald)' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Copied Email' : 'Copy Email'}</span>
                </button>
              </div>

              {/* CLI Screen */}
              <div
                style={{
                  background: '#04060a',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '16px',
                  height: '240px',
                  overflowY: 'auto',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  marginBottom: '16px',
                }}
              >
                {cliHistory.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      color:
                        item.type === 'user'
                          ? 'var(--accent-cyan)'
                          : item.type === 'error'
                          ? 'var(--accent-pink)'
                          : 'var(--text-muted)',
                    }}
                  >
                    {item.text}
                  </div>
                ))}
              </div>

              {/* CLI Form */}
              <form onSubmit={handleCliSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', alignSelf: 'center' }}>$</span>
                <input
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="type help, email, socials, status..."
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    color: '#fff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                  }}
                />
              </form>
            </div>

            {/* Social Buttons */}
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
                DIRECT NETWORK LINKS
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: '10px 16px', fontSize: '0.85rem' }}
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: '10px 16px', fontSize: '0.85rem' }}
                >
                  <Linkedin size={16} color="var(--accent-cyan)" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: '10px 16px', fontSize: '0.85rem' }}
                >
                  <Twitter size={16} color="var(--accent-blue)" />
                  <span>Twitter/X</span>
                </a>
              </div>
            </div>
          </div>
        </PageTransition>

        {/* Right Column: Contact Message Form */}
        <PageTransition delay={200}>
          <div
            className="glass-card"
            style={{
              padding: '32px',
              background: 'var(--bg-secondary)',
            }}
          >
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              Send Direct Message
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Drop a note directly to Gagan's inbox. Guaranteed reply within 24 hours.
            </p>

            {submitted ? (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid var(--accent-emerald)',
                  borderRadius: '12px',
                  padding: '32px',
                  textAlign: 'center',
                }}
              >
                <Sparkles size={36} color="var(--accent-emerald)" style={{ margin: '0 auto 16px auto' }} />
                <h4 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>Message Transmitted!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
                  Thank you for reaching out. Gagan has received your message and will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                  style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#fff',
                      fontSize: '0.95rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#fff',
                      fontSize: '0.95rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                    Subject / Role Type
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Senior Full-Stack Architect Position"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#fff',
                      fontSize: '0.95rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project goals or team needs..."
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#fff',
                      fontSize: '0.95rem',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '14px',
                    marginTop: '8px',
                  }}
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Transmitting Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </PageTransition>
      </div>
    </section>
  );
}
