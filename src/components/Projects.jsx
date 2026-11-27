import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';
import { profile } from '../data/profile';

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 section-padding">
      <div className="max-w-container mx-auto">
        <SectionHeading number="03" title="IDEAS INTO WORKING PRODUCTS." />

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <ProjectCard key={proj.id} {...proj} />
          ))}
        </div>

        {/* Explore More Projects CTA directly below the 4 featured cards */}
        <motion.div
          className="mt-16 md:mt-20 text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-accent mb-3">
            CURIOUS TO SEE WHAT ELSE I&apos;VE BUILT?
          </p>
          <p className="text-base md:text-lg text-text-secondary max-w-xl mb-7">
            Explore more of my experiments, projects and code on GitHub.
          </p>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-white text-xs font-bold tracking-[0.2em] uppercase rounded-chip hover:bg-accent-dark transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5"
          >
            <Github size={16} />
            <span>EXPLORE MORE ON GITHUB</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
