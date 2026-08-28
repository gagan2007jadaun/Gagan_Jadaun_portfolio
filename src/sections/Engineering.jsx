import React, { useState, useEffect } from 'react';
import SectionLabel from '../components/SectionLabel';
import PageTransition from '../components/PageTransition';
import { Activity, Server, Cpu, Layers, Database, Shield, Zap, Terminal, RefreshCw } from 'lucide-react';

const architectures = [
  {
    id: 'event-stream',
    name: 'Distributed Event Bus',
    badge: 'High Throughput',
    description: 'Event-driven streaming pipeline utilizing Go workers, Kafka broker partition allocation, and Redis zero-copy caching.',
    nodes: [
      { id: 'client', name: 'Web Client / IoT', type: 'source', status: 'active' },
      { id: 'gateway', name: 'API Gateway (Envoy)', type: 'gateway', status: 'active' },
      { id: 'broker', name: 'Kafka Cluster (Raft)', type: 'core', status: 'active' },
      { id: 'worker', name: 'Go Workers (x16)', type: 'worker', status: 'active' },
      { id: 'db', name: 'ScyllaDB / Redis', type: 'storage', status: 'active' },
    ],
    stats: { latency: '4.2ms', memory: '1.2 GB', cpu: '28%', throughput: '320,000 req/s' },
  },
  {
    id: 'rag-agent',
    name: 'Neural RAG Pipeline',
    badge: 'AI Architecture',
    description: 'Asynchronous document parsing, dense vector embedding generation, and hybrid cross-encoder re-ranking.',
    nodes: [
      { id: 'user', name: 'User Prompt', type: 'source', status: 'active' },
      { id: 'embedder', name: 'SentenceTransformer', type: 'gateway', status: 'active' },
      { id: 'vector', name: 'Qdrant Vector DB', type: 'storage', status: 'active' },
      { id: 'rerank', name: 'Cross-Encoder Reranker', type: 'worker', status: 'active' },
      { id: 'llm', name: 'Claude 3.5 / Llama 3', type: 'core', status: 'active' },
    ],
    stats: { latency: '120ms', memory: '4.8 GB', cpu: '64%', throughput: '4,500 tokens/s' },
  },
  {
    id: 'edge-mesh',
    name: 'Global Edge Mesh',
    badge: 'Low Latency',
    description: 'Multi-region Cloudflare Workers edge deployment with distributed state sync and edge page caching.',
    nodes: [
      { id: 'edge-dns', name: 'Anycast DNS', type: 'source', status: 'active' },
      { id: 'worker-edge', name: 'Cloudflare Edge Worker', type: 'gateway', status: 'active' },
      { id: 'kv', name: 'Workers KV Cache', type: 'storage', status: 'active' },
      { id: 'origin', name: 'Origin Server (AWS)', type: 'core', status: 'active' },
      { id: 'analytics', name: 'ClickHouse Analytics', type: 'worker', status: 'active' },
    ],
    stats: { latency: '12ms', memory: '512 MB', cpu: '14%', throughput: '850,000 req/s' },
  },
];

export default function Engineering() {
  const [selectedArch, setSelectedArch] = useState(architectures[0]);
  const [logs, setLogs] = useState([]);
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);

  // Dynamic log stream emulator
  useEffect(() => {
    const logMessages = [
      `[INFO] Packet received from ${selectedArch.nodes[0].name}`,
      `[DEBUG] Route matched -> ${selectedArch.nodes[1].name} (TLS 1.3 verified)`,
      `[TRACE] Queue depth: 0 items | Processing batch ID #${Math.floor(Math.random() * 89999 + 10000)}`,
      `[METRIC] ${selectedArch.nodes[2].name} ack | RTT = ${(Math.random() * 5 + 2).toFixed(2)}ms`,
      `[INFO] Distributed transaction committed to ${selectedArch.nodes[4].name}`,
    ];

    const interval = setInterval(() => {
      const timestamp = new Date().toISOString().substring(11, 23);
      const randomMsg = logMessages[Math.floor(Math.random() * logMessages.length)];
      setLogs((prev) => [`[${timestamp}] ${randomMsg}`, ...prev.slice(0, 6)]);
      setActiveNodeIndex((prev) => (prev + 1) % selectedArch.nodes.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [selectedArch]);

  return (
    <section
      id="engineering"
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
          title="System Architecture & Real-Time Topology"
          subtitle="Explore interactive structural diagrams for production systems I've engineered, complete with live node telemetry."
        />
      </PageTransition>

      {/* Architecture Selector Tabs */}
      <PageTransition delay={100}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          {architectures.map((arch) => {
            const isSelected = selectedArch.id === arch.id;
            return (
              <button
                key={arch.id}
                onClick={() => setSelectedArch(arch)}
                style={{
                  background: isSelected ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '14px 20px',
                  color: isSelected ? 'var(--accent-cyan)' : '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.25s ease',
                  textAlign: 'left',
                }}
              >
                <Layers size={18} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{arch.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {arch.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </PageTransition>

      {/* Interactive Topology Display Card */}
      <PageTransition delay={200}>
        <div
          className="glass-card"
          style={{
            padding: '36px',
            background: 'var(--bg-secondary)',
            marginBottom: '32px',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: '28px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '20px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
                {selectedArch.name} Topology
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
                {selectedArch.description}
              </p>
            </div>

            {/* Stats Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                }}
              >
                <span style={{ color: 'var(--text-dim)' }}>Latency: </span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  {selectedArch.stats.latency}
                </span>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                }}
              >
                <span style={{ color: 'var(--text-dim)' }}>Throughput: </span>
                <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>
                  {selectedArch.stats.throughput}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Topology Graph Flow Nodes */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              padding: '32px 16px',
              background: 'rgba(9, 12, 21, 0.6)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              marginBottom: '32px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div className="cyber-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

            {selectedArch.nodes.map((node, index) => {
              const isActive = activeNodeIndex === index;

              return (
                <React.Fragment key={node.id}>
                  <div
                    style={{
                      zIndex: 2,
                      background: isActive ? 'rgba(0, 242, 254, 0.15)' : 'rgba(15, 21, 36, 0.9)',
                      border: isActive
                        ? '2px solid var(--accent-cyan)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '16px 20px',
                      textAlign: 'center',
                      minWidth: '160px',
                      boxShadow: isActive ? '0 0 25px rgba(0, 242, 254, 0.3)' : 'none',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? 'var(--accent-cyan)' : 'var(--accent-emerald)',
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        boxShadow: isActive ? '0 0 10px var(--accent-cyan)' : 'none',
                      }}
                    />

                    <div
                      style={{
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-dim)',
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                      }}
                    >
                      {node.type}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>
                      {node.name}
                    </div>
                  </div>

                  {/* Connecting Arrow */}
                  {index < selectedArch.nodes.length - 1 && (
                    <div
                      style={{
                        zIndex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isActive ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.2)',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      <Zap size={20} className={isActive ? 'animate-float' : ''} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Real-time Streaming Logs Terminal */}
          <div
            style={{
              background: '#04060a',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '20px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '8px',
                color: 'var(--text-dim)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={14} color="var(--accent-cyan)" />
                <span>LIVE TELEMETRY STREAM</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                <RefreshCw size={12} className="animate-float" />
                <span>POLLING REGION: us-east-1</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {logs.map((log, i) => (
                <div
                  key={i}
                  style={{
                    color: i === 0 ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    opacity: 1 - i * 0.14,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    </section>
  );
}
