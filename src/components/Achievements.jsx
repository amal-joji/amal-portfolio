import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookmarkCheck, Trophy, ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { achievements } from '../data/achievements';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Achievements() {
  const handleSmoothNav = (e, href) => {
    if (!href || !href.startsWith('#')) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    e.preventDefault();
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: targetTop,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section id="achievements" className="py-24 md:py-32 section-padding relative">
      <div className="max-w-container mx-auto">
        <SectionHeading
          number="05"
          title="BUILT WITH CURIOSITY. RECOGNIZED THROUGH EXECUTION."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {achievements.map((item) => {
            const isLinked = Boolean(item.href);

            const cardInner = (
              <>
                {/* Decorative top-right number behind content */}
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-5 z-0 text-5xl md:text-6xl font-black leading-none text-text-primary/[0.05] select-none pointer-events-none group-hover:text-accent/[0.12] transition-colors duration-300"
                >
                  {item.number}
                </span>

                {/* Top & Main Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex flex-wrap items-center gap-2.5 pr-16 mb-5 min-h-[24px]">
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-accent">
                      HONOR {item.number}
                    </span>

                    {item.featured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase bg-accent/15 text-accent-light border border-accent/30 rounded-full">
                        <Trophy size={10} />
                        National
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-lg font-bold tracking-tight leading-snug pr-12 mb-3 transition-all duration-300 ${
                      isLinked
                        ? 'text-text-primary group-hover:text-accent group-focus-visible:text-accent group-hover:[text-shadow:0_0_18px_var(--accent-glow)]'
                        : 'text-text-primary group-hover:text-accent-light'
                    }`}
                  >
                    <span>{item.title}</span>
                    {isLinked && (
                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                        className="inline-block ml-1.5 -mt-0.5 text-accent opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                      />
                    )}
                  </h3>

                  {item.description && (
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Standardized Bottom Metadata Row */}
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-muted relative z-10">
                  <span className="inline-flex items-center gap-2">
                    <BookmarkCheck size={14} className="text-accent flex-shrink-0" />
                    <span>{item.category}</span>
                  </span>

                  {isLinked ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-accent opacity-80 group-hover:opacity-100 transition-opacity">
                      View Experience
                      <ArrowUpRight size={13} />
                    </span>
                  ) : (
                    <Award
                      size={14}
                      className="text-text-muted group-hover:text-accent transition-colors flex-shrink-0"
                    />
                  )}
                </div>
              </>
            );

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="h-full"
              >
                {isLinked ? (
                  <a
                    href={item.href}
                    onClick={(e) => handleSmoothNav(e, item.href)}
                    aria-label={`${item.title} — Jump to JPMorgan Chase Code for Good experience`}
                    className="h-full bg-dark-800 border border-border rounded-card p-6 md:p-8 flex flex-col justify-between transition-all duration-300 group hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent relative overflow-hidden cursor-pointer"
                  >
                    {cardInner}
                  </a>
                ) : (
                  <div className="h-full bg-dark-800 border border-border rounded-card p-6 md:p-8 flex flex-col justify-between transition-all duration-300 group hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-0.5 relative overflow-hidden">
                    {cardInner}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
