import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Cpu, Network, Layers, Terminal, Rocket, Bot } from 'lucide-react';
import SectionHeading from './SectionHeading';

const technicalInterests = [
  {
    title: 'Artificial Intelligence',
    description: 'Engineering systems capable of pattern discovery, perception, and intelligent reasoning in complex environments.',
    icon: Brain,
    tag: 'FOUNDATIONAL'
  },
  {
    title: 'Generative AI',
    description: 'Experimenting with modern LLMs, prompt systems, multimodal models, and semantic embeddings.',
    icon: Sparkles,
    tag: 'FRONTIER'
  },
  {
    title: 'Agentic AI Systems',
    description: 'Designing autonomous, tool-augmented agents that plan, execute, reflect, and complete multi-step goals.',
    icon: Bot,
    tag: 'EMERGING'
  },
  {
    title: 'Machine Learning',
    description: 'Deep diving into gradient boosting algorithms, supervised/unsupervised statistical modeling, and data pipelines.',
    icon: Cpu,
    tag: 'CORE'
  },
  {
    title: 'Software Architecture',
    description: 'Structuring clean, modular, and maintainable software systems with robust domain modeling and interfaces.',
    icon: Layers,
    tag: 'SYSTEMS'
  },
  {
    title: 'System Design',
    description: 'Designing scalable distributed architectures, handling concurrency, high throughput, and fault tolerance.',
    icon: Network,
    tag: 'INFRASTRUCTURE'
  },
  {
    title: 'Competitive Programming',
    description: 'Rigorous algorithmic problem solving, time-space complexity optimization, and data structure mastery.',
    icon: Terminal,
    tag: 'ALGORITHMS'
  },
  {
    title: 'Building Practical Products',
    description: 'Translating conceptual ideas into reliable, intuitive, end-to-end software tools that create genuine impact.',
    icon: Rocket,
    tag: 'EXECUTION'
  },
];

export default function BeyondCode() {
  return (
    <section id="beyond" className="py-24 md:py-32 section-padding bg-dark-800/40 relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border-light to-transparent" />

      <div className="max-w-container mx-auto">
        <SectionHeading number="07" title="ALWAYS LEARNING. ALWAYS BUILDING." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {technicalInterests.map((interest, i) => {
            const Icon = interest.icon;
            return (
              <motion.div
                key={i}
                className="bg-dark-800 border border-border rounded-card p-6 flex flex-col justify-between hover:border-accent/50 transition-all duration-300 group hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-0.5"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-chip bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                      <Icon size={16} />
                    </div>
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-text-muted px-2 py-0.5 bg-dark-900 border border-border rounded-chip">
                      {interest.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-text-primary tracking-tight mb-2 group-hover:text-accent-light transition-colors">
                    {interest.title}
                  </h3>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    {interest.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
