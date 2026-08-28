import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowRight, Terminal, Sparkles, Download, Layers, ShieldCheck, Cpu, Code } from 'lucide-react';

const roles = [
  "Full-Stack Architect & Web Systems Engineer",
  "AI & Distributed Systems Specialist",
  "Creative Technologist & UI/UX Innovator"
];

export default function Hero() {
  const mountRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  // Auto-typing text effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  // Three.js 3D Node Mesh & Particles
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geodesic Wireframe Sphere
    const geometry = new THREE.IcosahedronGeometry(7, 2);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const sphereMesh = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(sphereMesh);

    // Vertex points glowing
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.25,
      transparent: true,
      opacity: 0.8,
    });
    const pointsMesh = new THREE.Points(geometry, pointsMaterial);
    scene.add(pointsMesh);

    // Surrounding ambient floating particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 40;
      particlePositions[i + 1] = (Math.random() - 0.5) * 40;
      particlePositions[i + 2] = (Math.random() - 0.5) * 40;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x9333ea,
      size: 0.15,
      transparent: true,
      opacity: 0.5,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse tilt interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      sphereMesh.rotation.x += 0.003;
      sphereMesh.rotation.y += 0.005;
      pointsMesh.rotation.x += 0.003;
      pointsMesh.rotation.y += 0.005;

      particleSystem.rotation.y -= 0.001;

      // Inertial mouse response
      sphereMesh.rotation.x += (mouseY * 0.2 - sphereMesh.rotation.x) * 0.05;
      sphereMesh.rotation.y += (mouseX * 0.2 - sphereMesh.rotation.y) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px 24px',
        overflow: 'hidden',
      }}
      className="cyber-grid-bg radial-overlay"
    >
      <div className="scanline" />

      {/* 3D Background Mesh Container */}
      <div
        ref={mountRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          opacity: 0.85,
          zIndex: 1,
        }}
      />

      {/* Hero Foreground Content */}
      <div
        style={{
          maxWidth: '1240px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Hero Text & CTAs */}
          <div>
            {/* Status Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 16px',
                borderRadius: '99px',
                background: 'rgba(0, 242, 254, 0.08)',
                border: '1px solid rgba(0, 242, 254, 0.25)',
                color: 'var(--accent-cyan)',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                marginBottom: '24px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Sparkles size={14} />
              <span>GAGAN — CREATIVE SOFTWARE ENGINEER</span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '20px',
              }}
            >
              I <span className="gradient-text-cyan">BUILD</span>. I <span className="gradient-text-purple">EXPERIMENT</span>. I <span style={{ color: 'var(--accent-pink)' }}>ITERATE</span>.
            </h1>

            {/* Typing Subtitle */}
            <div
              style={{
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1.2rem',
                color: 'var(--accent-blue)',
                fontFamily: 'var(--font-mono)',
                marginBottom: '28px',
              }}
            >
              <Terminal size={20} color="var(--accent-cyan)" />
              <span>{displayText}</span>
              <span
                style={{
                  width: '8px',
                  height: '20px',
                  backgroundColor: 'var(--accent-cyan)',
                  display: 'inline-block',
                  animation: 'pulse-dot 1s infinite',
                }}
              />
            </div>

            {/* Bio text */}
            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                marginBottom: '36px',
                maxWidth: '640px',
              }}
            >
              A Computer Science engineer exploring AI, software and interactive experiences.
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '48px',
              }}
            >
              <a href="#work" className="btn-primary">
                <span>View Flagship Projects</span>
                <ArrowRight size={18} />
              </a>

              <button
                onClick={() => setShowResumeModal(true)}
                className="btn-secondary"
                style={{ borderColor: 'rgba(0, 242, 254, 0.3)' }}
              >
                <Download size={18} color="var(--accent-cyan)" />
                <span>Resume / CV</span>
              </button>
            </div>

            {/* Key Metrics Stats Counter */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-heading)' }}>
                  Fresher
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Experience Level
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Profile Picture Card */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              className="glass-card"
              style={{
                position: 'relative',
                padding: '16px',
                background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08) 0%, rgba(121, 40, 202, 0.08) 100%)',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                borderRadius: '24px',
                boxShadow: '0 0 40px rgba(0, 242, 254, 0.15)',
                maxWidth: '360px',
                width: '100%',
              }}
            >
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  aspectRatio: '3/4',
                }}
              >
                <img
                  src="/images/gagan-profile.png"
                  alt="Gagan Jadaun"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 65%, rgba(9, 12, 21, 0.9) 100%)',
                  }}
                />
              </div>

              {/* Caption Tag */}
              <div
                style={{
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '4px 8px',
                }}
              >
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>Gagan Jadaun</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                    CSE - AI &amp; ML Engineer
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    color: 'var(--accent-emerald)',
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(52, 211, 153, 0.1)',
                    padding: '4px 10px',
                    borderRadius: '99px',
                    border: '1px solid rgba(52, 211, 153, 0.3)',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)' }} />
                  <span>Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      {showResumeModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setShowResumeModal(false)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '540px',
              width: '100%',
              padding: '32px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--accent-cyan)',
              boxShadow: '0 0 40px rgba(0, 242, 254, 0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Code color="var(--accent-cyan)" />
                <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Gagan Resume Specs</h3>
              </div>
              <button
                onClick={() => setShowResumeModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.95rem' }}>
              Download official engineering profile summary, key architecture accomplishments, skills matrix, and professional trajectory.
            </p>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--accent-cyan)',
              }}
            >
              <div>$ file --info gagan_resume_2026.pdf</div>
              <div style={{ color: 'var(--text-muted)', marginTop: '6px' }}>
                Format: Software Systems Architect / Full-Stack Engineer CV
              </div>
              <div style={{ color: 'var(--text-muted)' }}>Status: Verified &amp; Updated Q3 2026</div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="#contact"
                onClick={() => {
                  setShowResumeModal(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <span>Request Direct Interview</span>
              </a>
              <button
                onClick={() => {
                  alert('Resume download initiated! (Gagan_Software_Engineer_CV.pdf)');
                  setShowResumeModal(false);
                }}
                className="btn-secondary"
                style={{ padding: '12px' }}
                title="Download PDF"
              >
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
