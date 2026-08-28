import React, { useState, useEffect, useRef } from 'react';
import SectionLabel from '../components/SectionLabel';
import PageTransition from '../components/PageTransition';
import { Play, Pause, Volume2, Cpu, Sparkles, BarChart2, Radio, Terminal, Sliders, Zap } from 'lucide-react';

const labExperiments = [
  { id: 'synth', name: 'Audio Wave Synthesizer', icon: Radio, category: 'Web Audio & Canvas' },
  { id: 'particles', name: 'Particle Gravity Matrix', icon: Sparkles, category: 'WebGL & Physics' },
  { id: 'algo', name: 'Algorithm Benchmark', icon: BarChart2, category: 'Computer Science' },
  { id: 'llm', name: 'AI Stream Simulator', icon: Terminal, category: 'LLM & Tokens' },
];

export default function Lab() {
  const [activeExp, setActiveExp] = useState('synth');

  // Synth state
  const [waveType, setWaveType] = useState('sine');
  const [frequency, setFrequency] = useState(440);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const canvasRef = useRef(null);

  // Particle matrix state
  const particleCanvasRef = useRef(null);

  // Algo Benchmark state
  const [algoType, setAlgoType] = useState('quicksort');
  const [arraySize, setArraySize] = useState(30);
  const [isSorting, setIsSorting] = useState(false);
  const [sortArray, setSortArray] = useState([]);
  const [sortMetrics, setSortMetrics] = useState({ comparisons: 0, swaps: 0 });

  // LLM Stream Simulator State
  const [promptInput, setPromptInput] = useState('Explain how quantum entanglement enables quantum key distribution.');
  const [isStreamingToken, setIsStreamingToken] = useState(false);
  const [streamText, setStreamText] = useState('');
  const [tokenSpeed, setTokenSpeed] = useState(45);

  // Audio Synth Canvas Animation & Audio Web API
  useEffect(() => {
    if (activeExp !== 'synth') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let phase = 0;

    const renderWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#00f2fe';

      const amplitude = 40;
      const freqFactor = frequency / 100;

      for (let x = 0; x < canvas.width; x++) {
        let y = canvas.height / 2;
        if (waveType === 'sine') {
          y += Math.sin((x * freqFactor * 0.05) + phase) * amplitude;
        } else if (waveType === 'square') {
          y += Math.sin((x * freqFactor * 0.05) + phase) > 0 ? amplitude : -amplitude;
        } else if (waveType === 'sawtooth') {
          y += (((x * freqFactor * 0.05 + phase) % Math.PI) / Math.PI - 0.5) * amplitude * 2;
        }
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += 0.08;
      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [activeExp, waveType, frequency]);

  // Audio toggle
  const toggleAudio = () => {
    if (isPlayingAudio) {
      if (oscRef.current) oscRef.current.stop();
      setIsPlayingAudio(false);
    } else {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
        oscRef.current = audioCtxRef.current.createOscillator();
        const gainNode = audioCtxRef.current.createGain();

        oscRef.current.type = waveType;
        oscRef.current.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime);
        gainNode.gain.setValueAtTime(0.08, audioCtxRef.current.currentTime);

        oscRef.current.connect(gainNode);
        gainNode.connect(audioCtxRef.current.destination);

        oscRef.current.start();
        setIsPlayingAudio(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Particle Physics Sandbox
  useEffect(() => {
    if (activeExp !== 'particles') return;
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 3 + 1,
    }));

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Distance to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.x -= (dx / dist) * 2;
          p.y -= (dy / dist) * 2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#00f2fe' : '#9333ea';
        ctx.fill();

        // Connect lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 70) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${1 - d / 70})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      cancelAnimationFrame(animId);
      if (canvas) canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeExp]);

  // Sorting Algorithm Generator
  const generateRandomArray = () => {
    const arr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 90) + 10);
    setSortArray(arr);
    setSortMetrics({ comparisons: 0, swaps: 0 });
  };

  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  const runSortingSim = async () => {
    if (isSorting) return;
    setIsSorting(true);
    let arr = [...sortArray];
    let comps = 0;
    let swaps = 0;

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    // BubbleSort simulation for visual clarity
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        comps++;
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swaps++;
          setSortArray([...arr]);
          setSortMetrics({ comparisons: comps, swaps });
          await delay(30);
        }
      }
    }
    setIsSorting(false);
  };

  // LLM Stream Simulator
  const startStream = () => {
    if (isStreamingToken) return;
    setIsStreamingToken(true);
    setStreamText('');

    const fullResponse = `Quantum key distribution (QKD) leverages the fundamental principles of quantum mechanics—specifically quantum entanglement and the No-Cloning Theorem—to establish an unconditionally secure cryptographic key between two communicating parties (Alice and Bob). Any eavesdropping attempt (Eve) collapses the wave function, detecting security breach instantly with zero key leakage.`;

    let i = 0;
    const interval = setInterval(() => {
      if (i < fullResponse.length) {
        setStreamText((prev) => prev + fullResponse.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setIsStreamingToken(false);
      }
    }, 1000 / tokenSpeed);
  };

  return (
    <section
      id="lab"
      style={{
        padding: '100px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <PageTransition>
        <SectionLabel
          number="04"
          title="Interactive Creative Lab"
          subtitle="A live sandbox showcasing Web Audio synths, WebGL particle physics, algorithm visualizers, and LLM token stream generators."
        />
      </PageTransition>

      {/* Lab Tabs */}
      <PageTransition delay={100}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {labExperiments.map((exp) => {
            const IconComp = exp.icon;
            const isSelected = activeExp === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => {
                  if (isPlayingAudio && oscRef.current) {
                    oscRef.current.stop();
                    setIsPlayingAudio(false);
                  }
                  setActiveExp(exp.id);
                }}
                className="glass-card"
                style={{
                  padding: '20px',
                  background: isSelected ? 'rgba(0, 242, 254, 0.12)' : 'var(--bg-secondary)',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.25s ease',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  }}
                >
                  <IconComp size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{exp.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {exp.category}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </PageTransition>

      {/* Lab Experiment Canvas Container */}
      <PageTransition delay={200}>
        <div
          className="glass-card"
          style={{
            padding: '36px',
            background: 'var(--bg-secondary)',
            minHeight: '420px',
          }}
        >
          {/* EXPERIMENT 1: AUDIO SYNTH */}
          {activeExp === 'synth' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 800 }}>
                    Web Audio FFT Waveform Generator
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Adjust wave shape and oscillator frequency to see real-time canvas rendering.
                  </p>
                </div>

                <button onClick={toggleAudio} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  {isPlayingAudio ? <Pause size={16} /> : <Play size={16} />}
                  <span>{isPlayingAudio ? 'Stop Sound' : 'Play Sound'}</span>
                </button>
              </div>

              <canvas
                ref={canvasRef}
                width={700}
                height={180}
                style={{
                  width: '100%',
                  height: '180px',
                  background: '#04060a',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  marginBottom: '24px',
                }}
              />

              {/* Controls */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                    Waveform Type:
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['sine', 'square', 'sawtooth'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setWaveType(type)}
                        style={{
                          background: waveType === type ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
                          color: waveType === type ? '#000' : '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          cursor: 'pointer',
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                    Frequency: {frequency} Hz
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1200"
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* EXPERIMENT 2: PARTICLES */}
          {activeExp === 'particles' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 800 }}>
                  Interactive Particle Repulsion Matrix
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Move cursor over canvas to exert electrostatic force field on surrounding node network.
                </p>
              </div>

              <canvas
                ref={particleCanvasRef}
                width={800}
                height={260}
                style={{
                  width: '100%',
                  height: '260px',
                  background: '#04060a',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'crosshair',
                }}
              />
            </div>
          )}

          {/* EXPERIMENT 3: ALGORITHM BENCHMARK */}
          {activeExp === 'algo' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 800 }}>
                    Sorting Algorithm Step Visualizer
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Observe real-time memory swaps and computational comparisons.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={generateRandomArray} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                    Shuffle Array
                  </button>
                  <button onClick={runSortingSim} disabled={isSorting} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    <Play size={16} />
                    <span>{isSorting ? 'Sorting...' : 'Run Sort'}</span>
                  </button>
                </div>
              </div>

              {/* Bar visualization */}
              <div
                style={{
                  height: '180px',
                  background: '#04060a',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '4px',
                  marginBottom: '20px',
                }}
              >
                {sortArray.map((val, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      height: `${val}%`,
                      background: 'linear-gradient(180deg, var(--accent-cyan) 0%, var(--accent-purple) 100%)',
                      borderRadius: '2px 2px 0 0',
                      transition: 'height 0.1s ease',
                    }}
                  />
                ))}
              </div>

              {/* Metrics */}
              <div style={{ display: 'flex', gap: '24px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <div>Comparisons: <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{sortMetrics.comparisons}</span></div>
                <div>Swaps: <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>{sortMetrics.swaps}</span></div>
              </div>
            </div>
          )}

          {/* EXPERIMENT 4: LLM STREAM */}
          {activeExp === 'llm' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 800 }}>
                  LLM Token Streaming Emulator
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Simulates server-sent events (SSE) token streaming logic.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '10px 16px',
                    color: '#fff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                  }}
                />
                <button onClick={startStream} disabled={isStreamingToken} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                  <Zap size={16} />
                  <span>Generate</span>
                </button>
              </div>

              <div
                style={{
                  minHeight: '140px',
                  background: '#04060a',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '20px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  color: 'var(--accent-cyan)',
                  lineHeight: 1.7,
                }}
              >
                {streamText || <span style={{ color: 'var(--text-dim)' }}>Click 'Generate' to initiate token stream output...</span>}
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </section>
  );
}
