import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowUpRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import {
  OceanFishingVisual,
  ParkingAnalyticsVisual,
  NewsNLPVisual,
  ABTestingAnalyticsVisual,
} from './ProjectVisuals';

export default function ProjectCard({
  number,
  title,
  description,
  problem,
  tech,
  highlights,
  metrics,
  visual,
  github,
  demo,
}) {
  const [expanded, setExpanded] = useState(false);

  const renderVisual = () => {
    switch (visual) {
      case 'ocean':
        return <OceanFishingVisual />;
      case 'dashboard':
        return <ParkingAnalyticsVisual />;
      case 'editorial':
        return <NewsNLPVisual />;
      case 'analytics':
        return <ABTestingAnalyticsVisual />;
      default:
        return <OceanFishingVisual />;
    }
  };

  const visibleHighlights = expanded ? highlights : highlights.slice(0, 3);

  return (
    <motion.div
      data-cursor="project"
      className="bg-dark-800 border border-border rounded-panel overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/15 hover:-translate-y-1 group"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      <div>
        {/* Bespoke Technical Graphic Header */}
        <div className="h-52 w-full overflow-hidden relative">
          {renderVisual()}
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8">
          {/* Project Number & Key Metric Badge */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase">
              PROJECT {number}
            </span>
            {metrics && metrics['R²'] && (
              <span className="text-[11px] font-mono px-2.5 py-0.5 bg-accent/10 text-accent-light border border-accent/20 rounded-chip">
                R² = {metrics['R²']} &bull; RMSE = {metrics.RMSE}
              </span>
            )}
            {metrics && metrics.Retention && (
              <span className="text-[11px] font-mono px-2.5 py-0.5 bg-accent/10 text-accent-light border border-accent/20 rounded-chip">
                {metrics.Retention} Retention
              </span>
            )}
            {metrics && metrics.Records && !metrics.Retention && (
              <span className="text-[11px] font-mono px-2.5 py-0.5 bg-accent/10 text-accent-light border border-accent/20 rounded-chip">
                {metrics.Records} Records
              </span>
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight mb-3 group-hover:text-accent-light transition-colors duration-300">
            {title}
          </h3>

          <p className="text-sm text-text-secondary leading-relaxed mb-5">
            {description}
          </p>

          {/* Expandable Problem & Implementation Highlights */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mb-5 p-4 bg-dark-900/60 border border-border rounded-inner">
                  <p className="text-xs text-text-muted leading-relaxed">
                    <span className="font-semibold text-text-secondary uppercase tracking-wider text-[10px] block mb-1">
                      Problem Addressed:
                    </span>
                    {problem}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Key Implementation Highlights */}
          <div className="space-y-2 mb-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-2">
              Key Highlights
            </p>
            {visibleHighlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 size={13} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="text-xs text-text-secondary leading-normal">{h}</span>
              </div>
            ))}
          </div>

          {/* Toggle Details Button */}
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold tracking-wider uppercase text-accent hover:text-accent-light transition-colors mb-5 focus:outline-none"
          >
            {expanded ? (
              <>
                Show Less <ChevronUp size={13} />
              </>
            ) : (
              <>
                View Details ({highlights.length} Highlights) <ChevronDown size={13} />
              </>
            )}
          </button>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
            {tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[11px] font-mono text-text-secondary bg-dark-900 border border-border rounded-chip hover:border-accent/40 hover:text-text-primary transition-colors cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / GitHub Icon Button at Bottom-Right */}
      <div className="px-6 md:px-8 py-4 flex items-center justify-between border-t border-border/60">
        <div>
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-accent hover:text-accent-light transition-colors"
            >
              Live Demo <ArrowUpRight size={14} />
            </a>
          )}
        </div>

        {github ? (
          <div className="relative group/gh">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
              title="View on GitHub"
              className="w-9 h-9 rounded-chip flex items-center justify-center text-text-muted hover:text-white hover:bg-accent/90 hover:scale-110 hover:shadow-[0_0_18px_var(--accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:text-white focus-visible:bg-accent/90 transition-all duration-300"
            >
              <Github size={18} />
            </a>
            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap px-2.5 py-1 text-[10px] font-mono font-medium tracking-wider bg-dark-900 text-text-primary border border-border rounded-chip shadow-lg opacity-0 translate-y-1 group-hover/gh:opacity-100 group-hover/gh:translate-y-0 transition-all duration-200"
            >
              View on GitHub
            </span>
          </div>
        ) : (
          <button
            type="button"
            disabled
            aria-label="Repository not yet configured"
            title="Repository link not yet configured"
            className="w-9 h-9 rounded-chip flex items-center justify-center text-text-muted/40 cursor-not-allowed"
          >
            <Github size={18} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
