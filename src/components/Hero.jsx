import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { profile } from '../data/profile';
import { useResumeModal } from '../context/ResumeContext';

const HEADLINE_LINES = [
  {
    id: 'line-1',
    text: 'I BUILD',
    gradientClass: null,
    range: [0, 0.14, 0.24, 1],
    opacity: [1, 1, 0.28, 0.28],
    scale: [1.015, 1.015, 1, 1],
  },
  {
    id: 'line-2',
    text: 'INTELLIGENT',
    gradientClass: 'bg-gradient-to-r from-[#a78bfa] via-[#7c3aed] to-[#c4b5fd]',
    range: [0, 0.14, 0.24, 0.36, 0.46, 1],
    opacity: [0.24, 0.24, 1, 1, 0.32, 0.32],
    gradientOpacity: [0, 0, 1, 1, 0.22, 0.22],
    scale: [1, 1, 1.015, 1.015, 1, 1],
  },
  {
    id: 'line-3',
    text: 'SYSTEMS',
    gradientClass: 'bg-gradient-to-r from-[#0284c7] via-[#06b6d4] to-[#22d3ee]',
    range: [0, 0.36, 0.46, 0.58, 0.68, 1],
    opacity: [0.24, 0.24, 1, 1, 0.32, 0.32],
    gradientOpacity: [0, 0, 1, 1, 0.22, 0.22],
    scale: [1, 1, 1.015, 1.015, 1, 1],
  },
  {
    id: 'line-4',
    text: 'THAT SOLVE REAL',
    gradientClass: null,
    range: [0, 0.58, 0.68, 0.78, 0.88, 1],
    opacity: [0.24, 0.24, 1, 1, 0.32, 0.32],
    scale: [1, 1, 1.015, 1.015, 1, 1],
  },
  {
    id: 'line-5',
    text: 'PROBLEMS.',
    gradientClass: null,
    range: [0, 0.78, 0.88, 1],
    opacity: [0.24, 0.24, 1, 1],
    scale: [1, 1, 1.02, 1.02],
  },
];

function KineticLine({ line, scrollYProgress, prefersReducedMotion }) {
  const opacity = useTransform(scrollYProgress, line.range, line.opacity);
  const scale = useTransform(scrollYProgress, line.range, line.scale);
  const gradientOpacity = useTransform(
    scrollYProgress,
    line.range,
    line.gradientOpacity || line.opacity
  );

  if (prefersReducedMotion) {
    return (
      <span className="block">
        {line.gradientClass ? (
          <span className={`${line.gradientClass} bg-clip-text text-transparent`}>
            {line.text}
          </span>
        ) : (
          <span className="text-text-primary">{line.text}</span>
        )}
      </span>
    );
  }

  return (
    <motion.span
      className="relative block origin-left will-change-transform"
      style={{ scale }}
    >
      {line.gradientClass ? (
        <span className="relative inline-block">
          {/* Muted base layer */}
          <motion.span
            className="block"
            style={{ opacity, color: 'var(--hero-muted)' }}
          >
            {line.text}
          </motion.span>
          {/* Smoothly interpolated text-clipped gradient overlay */}
          <motion.span
            aria-hidden="true"
            className={`absolute inset-0 block ${line.gradientClass} bg-clip-text text-transparent`}
            style={{ opacity: gradientOpacity }}
          >
            {line.text}
          </motion.span>
        </span>
      ) : (
        <motion.span className="block text-text-primary" style={{ opacity }}>
          {line.text}
        </motion.span>
      )}
    </motion.span>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { openResumeModal } = useResumeModal();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  const scrollBarScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={heroRef}
      aria-label="Hero"
      className={`relative w-full bg-dark-900 transition-colors duration-300 ${
        prefersReducedMotion ? 'min-h-screen' : 'min-h-[240vh] md:min-h-[290vh]'
      }`}
    >
      <div className="sticky top-0 min-h-screen w-full flex flex-col justify-center overflow-hidden pt-24 pb-8 md:pt-24 md:pb-10">
        {/* Theme-aware subtle purple and teal ambient lighting */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{ background: 'var(--hero-ambient)' }}
        />

        <div className="relative z-10 max-w-container mx-auto px-6 md:px-8 w-full">
          {/* Top availability & designation row */}
          <div className="flex flex-wrap items-center gap-4 mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-dark-800/80 border border-border rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[11px] font-mono tracking-wider uppercase text-text-secondary">
                Available for Opportunities
              </span>
            </div>

            <span className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-accent-light">
              {profile.heroSubline}
            </span>
          </div>

          {/* Two-Column Hero Grid: Headline Left, Profile Photograph Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-8 md:mb-10">
            {/* Left Column — 5-Line Kinetic Typography Headline + Intro + CTAs */}
            <div className="lg:col-span-8">
              <h1 className="text-left font-black uppercase leading-[0.93] tracking-[-0.04em] text-[2.35rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.25rem] mb-6 md:mb-8 select-none">
                <span className="sr-only">
                  Amal Joji — Software Engineer &amp; AI Engineer:{' '}
                </span>
                {HEADLINE_LINES.map((line) => (
                  <KineticLine
                    key={line.id}
                    line={line}
                    scrollYProgress={scrollYProgress}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </h1>

              {/* Supporting Introduction */}
              <p className="text-sm sm:text-base md:text-lg text-text-secondary max-w-xl leading-relaxed mb-7">
                {profile.heroDescription}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-accent text-white text-xs font-bold tracking-[0.2em] uppercase rounded-chip hover:bg-accent-dark transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
                >
                  Explore My Work
                </a>
                <button
                  type="button"
                  onClick={openResumeModal}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-dark-800 border border-border-light text-text-primary text-xs font-bold tracking-[0.2em] uppercase rounded-chip hover:border-accent hover:text-accent transition-all duration-300"
                >
                  <FileText size={14} />
                  Download Resume
                </button>
              </div>
            </div>

            {/* Right Column — Portrait Composition */}
            <motion.div
              className="lg:col-span-4 flex justify-start lg:justify-end"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative group w-full max-w-[230px] sm:max-w-[260px] md:max-w-[290px] lg:max-w-[340px]">
                {/* Ambient purple & cyan glow behind frame */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-media opacity-60 group-hover:opacity-90 blur-2xl transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 20%, rgba(108, 92, 231, 0.32), transparent 60%), radial-gradient(circle at 75% 85%, rgba(0, 206, 201, 0.24), transparent 60%)',
                  }}
                />

                {/* Softly rounded rectangular portrait frame */}
                <div className="relative rounded-media overflow-hidden border border-border-light bg-dark-800 p-1.5 shadow-2xl transition-colors duration-300 group-hover:border-accent/60">
                  <div className="relative rounded-inner overflow-hidden aspect-[3/4] bg-dark-700">
                    <img
                      src={profile.profileImage}
                      alt="Amal Joji — Software Engineer & AI Engineer"
                      className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    {/* Subtle bottom vignette in dark mode only for integration */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Area: Divider -> Full-Width Scroll Progress Bar -> Social Links Row */}
          <div className="pt-5 border-t border-border space-y-4">
            {/* Full-width Dynamic Scroll Progress Bar synchronized with Hero kinetic headline */}
            <div
              aria-hidden="true"
              className="w-full h-[3.5px] bg-border overflow-hidden rounded-full"
            >
              <motion.div
                className="w-full h-full bg-gradient-to-r from-[#8b5cf6] via-[#6c5ce7] to-[#22d3ee] rounded-full origin-left"
                style={{ scaleX: prefersReducedMotion ? 1 : scrollBarScale }}
              />
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-4">
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-muted hover:text-accent transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-muted hover:text-accent transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${profile.contact.email}`}
                className="p-2 text-text-muted hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
