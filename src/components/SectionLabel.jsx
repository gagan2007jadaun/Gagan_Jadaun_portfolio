import React from 'react';

export default function SectionLabel({ number, title, subtitle, label, align = 'left' }) {
  const isCenter = align === 'center';

  return (
    <div
      style={{
        marginBottom: '48px',
        textAlign: isCenter ? 'center' : 'left',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isCenter ? 'center' : 'flex-start',
      }}
    >
      {/* Code index tag */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 12px',
          borderRadius: '99px',
          background: 'rgba(0, 242, 254, 0.08)',
          border: '1px solid rgba(0, 242, 254, 0.2)',
          color: 'var(--accent-cyan)',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          marginBottom: '12px',
        }}
      >
        <span>// {number}</span>
        <span style={{ opacity: 0.5 }}>•</span>
        <span style={{ textTransform: 'uppercase' }}>{label || 'SECTION'}</span>
      </div>

      {/* Main Title */}
      <h2
        style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.03em',
          marginBottom: '10px',
        }}
      >
        {title}
      </h2>

      {/* Subtitle / Description */}
      {subtitle && (
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '1.05rem',
            maxWidth: '640px',
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      )}

      {/* Glowing Neon Line Accent */}
      <div
        style={{
          marginTop: '16px',
          width: '60px',
          height: '3px',
          borderRadius: '2px',
          background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
          boxShadow: '0 0 12px var(--accent-cyan)',
        }}
      />
    </div>
  );
}
