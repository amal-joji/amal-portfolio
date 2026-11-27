import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, ExternalLink, ShieldCheck } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { certifications } from '../data/certifications';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="py-24 md:py-32 section-padding bg-dark-800/40 relative"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border-light to-transparent" />

      <div className="max-w-container mx-auto">
        <SectionHeading
          number="06 — CERTIFICATIONS"
          title="KNOWLEDGE BUILT. SKILLS VALIDATED."
        />

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={cardVariants}
              className="bg-dark-800 border border-border rounded-card p-6 md:p-8 flex flex-col justify-between transition-all duration-300 group hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Subtle top-right corner accent glow */}
              <div
                aria-hidden="true"
                className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-chip bg-accent/10 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                    <BadgeCheck size={19} />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-cyan px-2.5 py-1 bg-dark-900 border border-border rounded-chip">
                    {cert.category}
                  </span>
                </div>

                <p className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-text-muted mb-2">
                  CERTIFICATE {cert.number}
                </p>

                <h3 className="text-xl font-bold text-text-primary tracking-tight mb-3 group-hover:text-accent-light transition-colors duration-200">
                  {cert.title}
                </h3>

                <p className="text-sm font-medium text-text-secondary">
                  {cert.issuer}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono relative z-10">
                <span className="inline-flex items-center gap-1.5 text-text-muted">
                  <ShieldCheck size={14} className="text-cyan" />
                  <span>NPTEL Verified</span>
                </span>

                {cert.verificationUrl ? (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent hover:text-accent-light transition-colors"
                  >
                    Verify <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="text-[10px] text-text-muted uppercase tracking-wider">
                    IIT Kharagpur
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
