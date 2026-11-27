import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Sun, Moon } from 'lucide-react';
import { profile } from '../data/profile';
import { useTheme } from '../context/ThemeContext';
import { useResumeModal } from '../context/ResumeContext';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { openResumeModal } = useResumeModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/90 backdrop-blur-md border-b border-border shadow-lg shadow-black/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-container mx-auto flex items-center justify-between px-6 md:px-8">
        {/* Personal Typographic Brand */}
        <a
          href="#"
          className="text-lg md:text-xl font-bold tracking-[0.25em] text-text-primary hover:text-accent transition-colors"
        >
          AMAL JOJI
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-xs font-mono tracking-widest uppercase text-text-secondary hover:text-text-primary focus-visible:text-accent transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-4 w-[1px] bg-border" />

          {/* Socials, Theme Toggle & Resume CTA */}
          <div className="flex items-center gap-3.5">
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary focus-visible:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>

            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary focus-visible:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
              className="p-2 rounded-chip border border-border bg-dark-800 text-text-secondary hover:text-accent hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-300"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              type="button"
              onClick={openResumeModal}
              className="px-3.5 py-1.5 text-[11px] font-mono font-bold tracking-wider uppercase text-accent border border-accent/40 rounded-chip hover:bg-accent hover:text-white transition-all duration-200"
            >
              Resume
            </button>
          </div>
        </nav>

        {/* Mobile Actions: Theme Toggle + Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            className="p-2 rounded-md border border-border bg-dark-800 text-text-secondary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-text-secondary hover:text-text-primary focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden bg-dark-900 border-b border-border px-6 py-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col gap-4 mb-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block text-sm font-mono tracking-widest uppercase text-text-secondary hover:text-accent transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary"
                >
                  <Github size={20} />
                </a>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary"
                >
                  <Linkedin size={20} />
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openResumeModal();
                }}
                className="px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase bg-accent text-white rounded-chip"
              >
                Download Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
