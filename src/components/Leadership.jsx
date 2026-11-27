import React from 'react';
import { motion } from 'framer-motion';
import { UsersRound, Monitor, BookOpen, Cpu, Calendar } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { leadershipExperiences, communityMemberships } from '../data/leadership';

const iconMap = {
  users: UsersRound,
  monitor: Monitor,
  book: BookOpen,
  cpu: Cpu,
};

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

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 md:py-32 section-padding relative">
      <div className="max-w-container mx-auto">
        <SectionHeading
          number="07"
          title="LEADERSHIP, COMMUNITIES & CAMPUS INVOLVEMENT"
          subtitle="Beyond academics — experiences that shaped my leadership journey."
        />

        {/* Leadership & Campus Involvement Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {leadershipExperiences.map((item) => {
            const Icon = iconMap[item.icon] || UsersRound;

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="h-full bg-dark-800 border border-border rounded-card p-6 md:p-8 flex flex-col justify-between transition-all duration-300 group hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Decorative top-right number */}
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-5 z-0 text-5xl font-black leading-none text-text-primary/[0.04] select-none pointer-events-none group-hover:text-accent/[0.12] transition-colors"
                >
                  {item.number}
                </span>

                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Top Icon & Category */}
                  <div className="flex items-center justify-between gap-3 pr-12 mb-5">
                    <div className="w-10 h-10 rounded-chip bg-accent/10 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 transition-transform flex-shrink-0">
                      <Icon size={18} />
                    </div>
                  </div>

                  <p className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-accent-light mb-2">
                    {item.category}
                  </p>

                  <h3 className="text-xl font-bold text-text-primary tracking-tight mb-2 group-hover:text-accent-light transition-colors duration-200">
                    {item.title}
                  </h3>

                  {(item.institution || item.role) && (
                    <p className="text-xs font-mono text-text-muted mb-3">
                      {[item.role, item.institution].filter(Boolean).join(' • ')}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Prominent Duration Footer */}
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono relative z-10">
                  <span className="inline-flex items-center gap-2 font-semibold text-text-primary">
                    <Calendar size={13} className="text-accent" />
                    <span>{item.duration}</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Separate Subsection: Professional & Technical Communities */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="pt-10 border-t border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono font-bold tracking-[0.22em] uppercase text-cyan">
              PROFESSIONAL &amp; TECHNICAL COMMUNITIES
            </span>
            <div className="w-10 h-[1px] bg-cyan/40" />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {communityMemberships.map((comm) => {
              const Icon = iconMap[comm.icon] || Cpu;

              return (
                <div
                  key={comm.id}
                  className="bg-dark-800 border border-border rounded-card p-6 md:p-8 transition-all duration-300 group hover:border-cyan/50 hover:shadow-xl hover:shadow-cyan/10 hover:-translate-y-0.5 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4 md:gap-5">
                    <div className="w-11 h-11 rounded-chip bg-cyan/10 border border-cyan/25 flex items-center justify-center text-cyan flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Icon size={20} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-2">
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-cyan">
                          {comm.category}
                        </span>
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-dark-900 border border-border text-text-secondary">
                          {comm.role}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-text-primary tracking-tight mb-2 group-hover:text-cyan-light transition-colors">
                        {comm.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-2xl">
                        {comm.description}
                      </p>
                    </div>
                  </div>

                  {/* Prominent Duration */}
                  <div className="md:text-right flex-shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-border/60">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-chip bg-dark-900 border border-border text-xs font-mono font-semibold text-text-primary">
                      <Calendar size={13} className="text-cyan" />
                      <span>{comm.duration}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
