import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cursorState, setCursorState] = useState('default'); // default | interactive | project | text

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateEnabled = () => {
      const isAllowed = finePointerQuery.matches && !reducedMotionQuery.matches;
      setEnabled(isAllowed);
      if (isAllowed) {
        document.documentElement.classList.add('custom-cursor-active');
      } else {
        document.documentElement.classList.remove('custom-cursor-active');
      }
    };

    updateEnabled();
    finePointerQuery.addEventListener('change', updateEnabled);
    reducedMotionQuery.addEventListener('change', updateEnabled);

    return () => {
      finePointerQuery.removeEventListener('change', updateEnabled);
      reducedMotionQuery.removeEventListener('change', updateEnabled);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let rafId = null;
    let isFirstMove = true;

    const resolveCursorState = (target) => {
      if (!(target instanceof Element)) return 'default';

      if (
        target.closest(
          'a, button, [role="button"], [role="tab"], input[type="submit"], select'
        )
      ) {
        return 'interactive';
      }

      if (target.closest('[data-cursor="project"]')) {
        return 'project';
      }

      if (
        target.closest(
          'p, h1, h2, h3, h4, h5, h6, input[type="text"], input[type="email"], textarea'
        )
      ) {
        return 'text';
      }

      return 'default';
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (isFirstMove) {
        ring.x = mouse.x;
        ring.y = mouse.y;
        isFirstMove = false;
      }

      setVisible(true);
      const nextState = resolveCursorState(e.target);
      setCursorState((prev) => (prev !== nextState ? nextState : prev));
    };

    const handleMouseLeave = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        setVisible(false);
      }
    };

    const handleWindowBlur = () => {
      setVisible(false);
    };

    const animate = () => {
      // Smooth interpolation for the outer ring without excessive lag
      ring.x += (mouse.x - ring.x) * 0.2;
      ring.y += (mouse.y - ring.y) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('blur', handleWindowBlur);
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('blur', handleWindowBlur);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Smoothly interpolated outer purple/cyan ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring custom-cursor-ring--${cursorState}`}
      />

      {/* Responsive cyan center dot */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot custom-cursor-dot--${cursorState}`}
      />
    </div>
  );
}
