import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add custom cursor active class to body on desktop
    if (window.innerWidth > 1024) {
      document.body.classList.add('custom-cursor-active');
      setIsVisible(true);
    }

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if mouse is hovering an interactive element
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, .glass-card, [role="button"]');
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Smooth easing follower dot
  useEffect(() => {
    if (!isVisible) return;
    let animId;
    const follow = () => {
      setFollowerPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }));
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animId);
  }, [pos, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner precise dot */}
      <div
        style={{
          position: 'fixed',
          top: pos.y,
          left: pos.x,
          width: '8px',
          height: '8px',
          backgroundColor: isHovered ? 'var(--accent-cyan)' : '#ffffff',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 99999,
          boxShadow: isHovered ? '0 0 12px var(--accent-cyan)' : '0 0 8px rgba(255, 255, 255, 0.8)',
          transition: 'transform 0.1s ease, background-color 0.2s ease',
        }}
      />

      {/* Outer fluid aura ring */}
      <div
        style={{
          position: 'fixed',
          top: followerPos.y,
          left: followerPos.x,
          width: isHovered ? '48px' : isClicked ? '24px' : '36px',
          height: isHovered ? '48px' : isClicked ? '24px' : '36px',
          border: isHovered ? '2px solid var(--accent-cyan)' : '1px solid rgba(0, 242, 254, 0.4)',
          backgroundColor: isHovered ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 99998,
          transition: 'width 0.25s ease, height 0.25s ease, border 0.25s ease, background-color 0.25s ease',
        }}
      />
    </>
  );
}
