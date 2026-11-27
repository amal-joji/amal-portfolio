import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ImageOff } from 'lucide-react';
import { codeForGoodExperience } from '../data/experiences';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState({});
  const [reducedMotion, setReducedMotion] = useState(false);

  const { organization, program, badge, heading, subtitle, stages } = codeForGoodExperience;
  const activeStage = stages[activeIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextIndex = Math.min(
            stages.length - 1,
            Math.max(0, Math.floor(self.progress * stages.length))
          );
          setActiveIndex((prev) => (prev !== nextIndex ? nextIndex : prev));
        },
      });
    }, sectionRef);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      ctx.revert();
    };
  }, [stages.length]);

  const handleStageSelect = (index) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
    if (scrollableDistance <= 0) {
      setActiveIndex(index);
      return;
    }
    const targetProgress = (index + 0.15) / stages.length;
    const targetY = sectionTop + scrollableDistance * targetProgress;
    window.scrollTo({
      top: targetY,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const transitionClass = reducedMotion
    ? 'transition-none'
    : 'transition-all duration-700 ease-out';

  const pillTransitionClass = reducedMotion
    ? 'transition-none'
    : 'transition-all duration-300 ease-out';

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-label="JPMorgan Chase Code for Good Experience"
      style={{ backgroundColor: 'var(--exp-bg)' }}
      className="relative w-full text-text-primary min-h-[380vh] md:min-h-[450vh] transition-colors duration-300"
    >
      {/* Top subtle divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border-light to-transparent" />

      {/* Sticky 100vh Viewport Container */}
      <div className="sticky top-0 min-h-screen w-full flex flex-col justify-center pt-20 pb-6 md:pt-20 md:pb-8 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1280px] w-full mx-auto">
          {/* JPMorgan Chase & Co. Branding Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 md:mb-8 pb-4 border-b border-border">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-accent uppercase">
                02
              </span>
              <span className="text-text-muted">/</span>
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-text-primary">
                {organization}
              </span>
              <span className="text-text-muted hidden sm:inline">&bull;</span>
              <span className="text-xs sm:text-sm font-mono font-semibold tracking-[0.18em] uppercase text-accent-light">
                {program}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/15 border border-accent/40 shadow-sm shadow-accent/20">
              <Award size={14} className="text-accent-light" />
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-accent-light">
                {badge}
              </span>
            </div>
          </div>

          {/* Main Two-Column Storytelling Layout (Vertical on Mobile, Two Columns on Desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* LEFT COLUMN — EXPERIENCE STORY */}
            <div className="lg:col-span-5 flex flex-col justify-between order-1">
              <div className="mb-5 md:mb-7">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-text-primary mb-2">
                  {heading}
                </h2>
                <p className="text-sm sm:text-base text-text-secondary">
                  {subtitle}
                </p>
              </div>

              {/* Desktop: All 5 numbered items */}
              <div className="hidden lg:flex flex-col gap-2 mb-7" role="tablist" aria-label="Code for Good stages">
                {stages.map((stage, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleStageSelect(idx)}
                      style={{
                        backgroundColor: isActive ? 'var(--exp-pill-bg)' : 'transparent',
                        color: isActive ? 'var(--exp-pill-text)' : 'var(--exp-inactive-text)',
                      }}
                      className={`w-full text-left px-5 py-3 rounded-full flex items-center gap-3.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${pillTransitionClass} ${
                        isActive
                          ? 'font-bold shadow-lg translate-x-1'
                          : 'hover:opacity-80 font-medium'
                      }`}
                    >
                      <span
                        className={`text-xs font-mono tracking-widest ${
                          isActive ? 'text-accent font-bold' : 'opacity-70'
                        }`}
                      >
                        {stage.number}
                      </span>
                      <span className="text-sm tracking-tight leading-snug">
                        &mdash; {stage.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile: Active Stage Pill + Compact Step Indicator */}
              <div className="lg:hidden mb-4 space-y-3">
                <div
                  style={{
                    backgroundColor: 'var(--exp-pill-bg)',
                    color: 'var(--exp-pill-text)',
                  }}
                  className="px-4 py-2.5 rounded-full font-bold flex items-center gap-3 shadow-md"
                >
                  <span className="text-xs font-mono font-bold text-accent">
                    {activeStage.number}
                  </span>
                  <span className="text-xs sm:text-sm tracking-tight truncate">
                    &mdash; {activeStage.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-1">
                  {stages.map((stage, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => handleStageSelect(idx)}
                        aria-label={`Stage ${stage.number}: ${stage.title}`}
                        className={`h-1.5 rounded-full ${pillTransitionClass} ${
                          isActive
                            ? 'flex-1 bg-accent'
                            : 'w-6 bg-border-light hover:bg-accent/50'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Active Stage Explanatory Description */}
              <div
                style={{ backgroundColor: 'var(--exp-box-bg)' }}
                className="min-h-[84px] p-4 sm:p-5 rounded-inner border border-border transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-accent-light">
                    STAGE {activeStage.number} &bull; {activeStage.bgWord}
                  </span>
                  <span className="text-[10px] font-mono text-text-muted">
                    {activeIndex + 1} / {stages.length}
                  </span>
                </div>
                <p
                  key={activeStage.id}
                  className="text-sm sm:text-base text-text-secondary leading-relaxed"
                >
                  {activeStage.description}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN — VISUAL STORYTELLING PANEL */}
            <div className="lg:col-span-7 order-2">
              <div
                className="relative w-full h-[290px] sm:h-[360px] lg:h-[460px] xl:h-[540px] rounded-panel overflow-hidden border border-white/10 shadow-2xl shadow-black/60 flex items-center justify-center"
                style={{
                  background:
                    'radial-gradient(circle at 50% 45%, rgba(108, 92, 231, 0.28) 0%, rgba(22, 14, 46, 0.92) 52%, #070812 100%)',
                }}
              >
                {/* Subtle Ambient Grid */}
                <div
                  className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Large Faded Background Word Behind Image */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                >
                  {stages.map((stage, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <span
                        key={stage.id}
                        className={`absolute font-black uppercase tracking-[0.06em] text-white/[0.06] whitespace-nowrap text-[14vw] sm:text-[11vw] lg:text-[7.5rem] xl:text-[8.5rem] leading-none ${transitionClass} ${
                          isActive
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-95'
                        }`}
                      >
                        {stage.bgWord}
                      </span>
                    );
                  })}
                </div>

                {/* Central Crossfading Photographs */}
                <div className="relative z-10 w-full h-full p-4 sm:p-7 lg:p-10 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {stages.map((stage, idx) => {
                      const isActive = idx === activeIndex;
                      const isFailed = failedImages[stage.id];

                      return (
                        <div
                          key={stage.id}
                          aria-hidden={!isActive}
                          className={`absolute inset-0 flex items-center justify-center ${transitionClass} ${
                            isActive
                              ? 'opacity-100 scale-100 z-10'
                              : 'opacity-0 scale-[0.97] z-0 pointer-events-none'
                          }`}
                        >
                          {isFailed ? (
                            <div className="w-full max-w-lg h-full max-h-[380px] rounded-media bg-dark-800/90 border border-white/10 flex flex-col items-center justify-center gap-3 p-6 text-center shadow-2xl">
                              <ImageOff size={32} className="text-accent-light opacity-70" />
                              <span className="text-xs font-mono tracking-widest uppercase text-accent-light">
                                STAGE {stage.number} &mdash; {stage.bgWord}
                              </span>
                              <p className="text-sm text-text-secondary max-w-xs">
                                {stage.title}
                              </p>
                            </div>
                          ) : (
                            <img
                              src={stage.image}
                              alt={`JPMorgan Chase Code for Good — ${stage.title}`}
                              onError={() => handleImageError(stage.id)}
                              className="max-w-full max-h-full w-auto h-auto object-contain rounded-media shadow-[0_20px_50px_rgba(0,0,0,0.65)] border border-white/10"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Subtle Bottom Stage Telemetry Strip */}
                <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-white/40 pointer-events-none">
                  <span>JPMC CODE FOR GOOD</span>
                  <span>
                    {activeStage.number} / 0{stages.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
