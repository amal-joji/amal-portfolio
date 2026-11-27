import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, GraduationCap, School } from 'lucide-react';
import { profile } from '../data/profile';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function About() {
  const credentialCards = [
    {
      label: 'CGPA',
      value: profile.education.cgpa,
      featured: true,
    },
    {
      label: 'EDUCATION',
      value: profile.education.institution,
      featured: false,
    },
    {
      label: 'LOCATION',
      value: profile.education.location,
      featured: false,
    },
    {
      label: 'DEGREE',
      value: profile.education.degree,
      featured: false,
    },
    {
      label: 'DURATION',
      value: profile.education.duration,
      featured: false,
    },
  ];

  const schoolMetrics = [
    {
      label: 'CLASS X',
      value: profile.schoolEducation.classX,
    },
    {
      label: 'CLASS XII',
      value: profile.schoolEducation.classXII,
    },
  ];

  return (
    <section
      id="about"
      className="py-24 md:py-32 section-padding relative bg-dark-900 transition-colors duration-300"
    >
      <div className="max-w-container mx-auto">
        {/* Interactive Section Heading */}
        <motion.div
          className="mb-14 md:mb-20"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-accent uppercase">
              SECTION 01
            </span>
            <div className="w-12 h-[1px] bg-accent/40" />
          </div>

          <h2
            tabIndex={0}
            className="interactive-heading inline-block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-[1.05] max-w-4xl cursor-default outline-none"
          >
            THE PERSON BEHIND THE CODE.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Independent Interactive Narrative */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p
              tabIndex={0}
              className="interactive-prose text-xl md:text-2xl font-medium leading-relaxed cursor-default outline-none"
            >
              I am a Computer Science undergraduate passionate about engineering intelligent systems and building software products that solve real-world problems.
            </p>

            <p
              tabIndex={0}
              className="interactive-prose text-base md:text-lg leading-relaxed cursor-default outline-none"
            >
              My interests span artificial intelligence, machine learning, full-stack development, data science and software architecture. I enjoy taking ideas from conception to implementation, experimenting with emerging technologies and developing practical, scalable solutions.
            </p>

            <div className="pt-6 grid sm:grid-cols-2 gap-4">
              <div tabIndex={0} className="credential-card group">
                <div className="flex items-center gap-2.5 mb-2 text-accent">
                  <Compass size={18} />
                  <span className="text-xs font-mono font-bold tracking-wider uppercase">
                    Focus
                  </span>
                </div>
                <p className="interactive-prose text-xs leading-relaxed">
                  End-to-end technical system architecture, AI/ML pipelines, and resilient web services.
                </p>
              </div>

              <div tabIndex={0} className="credential-card group">
                <div className="flex items-center gap-2.5 mb-2 text-cyan">
                  <Sparkles size={18} />
                  <span className="text-xs font-mono font-bold tracking-wider uppercase">
                    Philosophy
                  </span>
                </div>
                <p className="interactive-prose text-xs leading-relaxed">
                  Software isn&apos;t complete until it solves real friction with measurable reliability and elegant design.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Undergraduate Education + School Education Subsection */}
          <motion.div
            className="lg:col-span-5 space-y-8"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.15 }}
          >
            {/* Undergraduate Education (Prominent) */}
            <div>
              <div className="mb-4 flex items-center gap-2.5">
                <GraduationCap size={16} className="text-accent" />
                <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-accent">
                  UNDERGRADUATE EDUCATION
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {credentialCards.map((card) => (
                  <div
                    key={card.label}
                    tabIndex={0}
                    className={`credential-card group ${
                      card.featured ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <p className="text-[11px] font-mono font-semibold tracking-[0.2em] uppercase text-text-muted group-hover:text-text-secondary transition-colors duration-300 mb-2">
                      {card.label}
                    </p>
                    <p
                      className={`credential-value font-bold tracking-tight transition-all duration-300 ${
                        card.featured
                          ? 'text-3xl md:text-4xl font-black text-accent'
                          : 'text-base md:text-lg text-text-primary group-hover:text-text-primary'
                      }`}
                    >
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Subsection: School Education */}
            <div className="pt-6 border-t border-border/70">
              <div className="mb-4 flex items-center gap-2">
                <School size={14} className="text-text-muted" />
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-text-secondary">
                  SCHOOL EDUCATION
                </span>
              </div>

              <div className="bg-dark-800/60 border border-border rounded-card p-5 space-y-4 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-bold text-text-primary">
                      {profile.schoolEducation.school}
                    </p>
                    <span className="text-[10px] font-mono font-semibold tracking-wider uppercase px-2 py-0.5 rounded-chip bg-dark-900 border border-border text-text-muted">
                      {profile.schoolEducation.board} &bull; {profile.schoolEducation.completionYear}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-text-muted">
                    {profile.schoolEducation.location}
                  </p>
                </div>

                {/* Compact Rounded Metric Cards for Class X and Class XII */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {schoolMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      tabIndex={0}
                      className="bg-dark-900/70 border border-border rounded-inner p-3.5 transition-all duration-300 hover:border-accent/50 hover:shadow-md hover:shadow-accent/10 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent group/sm"
                    >
                      <p className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-text-muted mb-1">
                        {metric.label}
                      </p>
                      <p className="text-lg font-extrabold text-text-primary group-hover/sm:text-accent-light transition-colors">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
