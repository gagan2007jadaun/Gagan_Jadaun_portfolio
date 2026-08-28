import React, { useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import PageTransition from '../components/PageTransition';
import confetti from 'canvas-confetti';
import { Mail, Send, Terminal, Github, Linkedin, Twitter, Copy, Check, Sparkles, MessageSquare, MapPin, Code2, Award, Globe, BookOpen } from 'lucide-react';

export default function Contact({ soundEnabled }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mailtoLink, setMailtoLink] = useState('');

  // Terminal state
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState([
    { type: 'system', text: 'Gagan OS v4.2 Terminal [Type "help" for available commands]' },
  ]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    const targetEmail = 'gagan2020jadon@gmail.com';
    const mailSubject = formData.subject || `New Contact Message from ${formData.name}`;
    const mailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;

    // Construct mailto link fallback
    const directMailto = `mailto:${targetEmail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    setMailtoLink(directMailto);

    try {
      // Dispatch payload to Web3Forms API targeting gagan2020jadon@gmail.com
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'b149b5c3-16a8-4e3a-963d-86f77ecb4731', // Web3Forms direct key
          name: formData.name,
          email: formData.email,
          subject: mailSubject,
          message: mailBody,
          to_email: targetEmail,
        }),
      });
    } catch (err) {
      console.log('Email API dispatch notice:', err);
    } finally {
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
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('gagan2020jadon@gmail.com');
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
      navigator.clipboard.writeText('gagan2020jadon@gmail.com');
      response = [
        { type: 'output', text: 'Email: gagan2020jadon@gmail.com' },
        { type: 'output', text: '✓ gagan2020jadon@gmail.com copied to clipboard!' }
      ];
    } else if (cmd === 'socials' || cmd === 'profiles') {
      response = [
        { type: 'output', text: 'GitHub:       https://github.com/gagan2007jadaun' },
        { type: 'output', text: 'LinkedIn:     https://www.linkedin.com/in/gagan-jadaun-62301932a' },
        { type: 'output', text: 'LeetCode:     https://leetcode.com/u/gagan2007jadaun/' },
        { type: 'output', text: 'HackerRank:   https://www.hackerrank.com/profile/gagan2020jadon' },
        { type: 'output', text: 'HackerEarth:  https://www.hackerearth.com/@gagan2020jadon/' },
        { type: 'output', text: 'GeeksforGeeks:https://www.geeksforgeeks.org/profile/gagan2007jadaun' },
      ];
    } else if (cmd === 'status') {
      response = [{ type: 'output', text: 'Status: AVAILABLE for Software Engineer roles & projects.' }];
    } else if (cmd === 'skills') {
      response = [{ type: 'output', text: 'Core: React/Next.js, Node.js, Python, C++, Three.js, WebSockets, Tailwind CSS.' }];
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
          number="05"
          title="Initiate Contact & Collaboration"
          subtitle="Whether you're looking for a Full-Stack Engineer, AI Developer, or technical collaborator, let's connect."
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

            {/* Social & Coding Platform Buttons */}
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
                CODING &amp; NETWORK PROFILES
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a
                  href="https://github.com/gagan2007jadaun"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/gagan-jadaun-62301932a"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                >
                  <Linkedin size={14} color="var(--accent-cyan)" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://leetcode.com/u/gagan2007jadaun/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                >
                  <Code2 size={14} color="var(--accent-amber)" />
                  <span>LeetCode</span>
                </a>
                <a
                  href="https://www.hackerrank.com/profile/gagan2020jadon"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                >
                  <Award size={14} color="var(--accent-emerald)" />
                  <span>HackerRank</span>
                </a>
                <a
                  href="https://www.hackerearth.com/@gagan2020jadon/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                >
                  <Globe size={14} color="var(--accent-purple)" />
                  <span>HackerEarth</span>
                </a>
                <a
                  href="https://www.geeksforgeeks.org/profile/gagan2007jadaun"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                >
                  <BookOpen size={14} color="var(--accent-cyan)" />
                  <span>GeeksforGeeks</span>
                </a>
              </div>
            </div>
          </div>
        </PageTransition>

        {/* Right Column: Direct Contact Channels (WhatsApp, Mail, Telegram) */}
        <PageTransition delay={200}>
          <div
            className="glass-card"
            style={{
              padding: '32px',
              background: 'var(--bg-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                Direct Contact Channels
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Choose your preferred communication channel to reach out directly.
              </p>
            </div>

            {/* Option 1: Mail */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(0, 242, 254, 0.2)',
                borderRadius: '14px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(0, 242, 254, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-cyan)',
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 700 }}>Direct Email</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      gagan2020jadon@gmail.com
                    </span>
                  </div>
                </div>
                {copiedEmail && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                    ✓ Copied
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href="mailto:gagan2020jadon@gmail.com"
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center', padding: '10px', fontSize: '0.85rem' }}
                >
                  <Mail size={14} />
                  <span>Send Mail</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="btn-secondary"
                  style={{ padding: '10px 14px', fontSize: '0.85rem' }}
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>

            {/* Option 2: WhatsApp */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(37, 211, 102, 0.25)',
                borderRadius: '14px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(37, 211, 102, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#25D366',
                  }}
                >
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 700 }}>WhatsApp Chat</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    Instant Direct Messaging
                  </span>
                </div>
              </div>

              <a
                href="https://wa.me/919058201647?text=Hi%20Gagan,%20I%20visited%20your%20portfolio!"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '10px',
                  fontSize: '0.85rem',
                  borderColor: 'rgba(37, 211, 102, 0.4)',
                  color: '#25D366',
                }}
              >
                <MessageSquare size={14} color="#25D366" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </PageTransition>
      </div>
    </section>
  );
}
