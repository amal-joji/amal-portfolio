import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { skills } from '../data/skills';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('ALL');
  const categories = Object.entries(skills);
  const allCategories = ['ALL', ...Object.keys(skills)];

  const filteredCategories = activeTab === 'ALL' 
    ? categories 
    : categories.filter(([cat]) => cat === activeTab);

  return (
    <section id="skills" className="py-24 md:py-32 section-padding bg-dark-800/40 relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border-light to-transparent" />

      <div className="max-w-container mx-auto">
        <SectionHeading number="04" title="TOOLS OF THE TRADE." />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-border">
          {allCategories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 text-xs font-mono font-medium tracking-wider uppercase rounded-chip transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-accent text-white shadow-lg shadow-accent/20'
                  : 'text-text-muted hover:text-text-primary hover:bg-dark-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Structured Grid */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          {filteredCategories.map(([category, list]) => (
            <motion.div
              key={category}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-dark-800 border border-border rounded-card p-6 flex flex-col justify-between hover:border-accent/50 transition-all duration-300 group hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-border">
                  <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-accent group-hover:text-accent-light transition-colors">
                    {category}
                  </h3>
                  <span className="text-[10px] font-mono text-text-muted px-2 py-0.5 bg-dark-900 rounded-chip border border-border">
                    {list.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {list.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-mono text-text-secondary bg-dark-900/80 border border-border rounded-chip hover:border-accent/40 hover:text-text-primary hover:bg-dark-700 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
