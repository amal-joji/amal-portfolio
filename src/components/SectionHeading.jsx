import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ number, title, subtitle }) {
  return (
    <motion.div
      className="mb-14 md:mb-20"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Section Identifier & Micro Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-mono font-bold tracking-[0.25em] text-accent uppercase">
          SECTION {number}
        </span>
        <div className="w-12 h-[1px] bg-accent/40" />
      </div>

      {/* Large Editorial Headline */}
      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-[1.05] text-text-primary max-w-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-sm md:text-base text-text-secondary max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
