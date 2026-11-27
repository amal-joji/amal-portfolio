import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';
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
      label: 'GRADUATION',
      value: String(profile.education.graduationYear),
      featured: false,
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 section-padding relative bg-dark-900 transition-colors duration-300">
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
              <div
                tabIndex={0}
                className="credential-card group"
              >
                <div className="flex items-center gap-2.5 mb-2 text-accent">
                  <Compass size={18} />
                  <span className="text-xs font-mono font-bold tracking-wider uppercase">Focus</span>
                </div>
                <p className="interactive-prose text-xs leading-relaxed">
                  End-to-end technical system architecture, AI/ML pipelines, and resilient web services.
                </p>
              </div>

              <div
                tabIndex={0}
                className="credential-card group"
              >
                <div className="flex items-center gap-2.5 mb-2 text-cyan">
                  <Sparkles size={18} />
                  <span className="text-xs font-mono font-bold tracking-wider uppercase">Philosophy</span>
                </div>
                <p className="interactive-prose text-xs leading-relaxed">
                  Software isn&apos;t complete until it solves real friction with measurable reliability and elegant design.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Separate Academic Credential Cards */}
          <motion.div
            className="lg:col-span-5"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.15 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-accent">
                ACADEMIC CREDENTIALS
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
