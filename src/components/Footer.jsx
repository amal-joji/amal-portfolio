import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { profile } from '../data/profile';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border bg-dark-900 relative">
      <div className="max-w-container mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Brand Branding */}
          <div>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); scrollToTop(); }}
              className="text-xl font-bold tracking-[0.25em] text-text-primary hover:text-accent transition-colors block mb-1"
            >
              AMAL JOJI
            </a>
            <p className="text-xs font-mono tracking-widest uppercase text-text-muted">
              {profile.headline}
            </p>
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-3">
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-chip bg-dark-800 border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>

            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-chip bg-dark-800 border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>

            <a
              href={`mailto:${profile.contact.email}`}
              className="w-10 h-10 rounded-chip bg-dark-800 border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-chip bg-dark-800 border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all ml-2"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-text-muted">
          <p>
            &copy; {new Date().getFullYear()} Amal Joji. All rights reserved.
          </p>
          <p>
            SRM Institute of Science and Technology &bull; B.Tech CSE '27
          </p>
        </div>
      </div>
    </footer>
  );
}
