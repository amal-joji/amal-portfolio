import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { profile } from '../data/profile';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
    website: '', // honeypot field
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const nextErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const question = formData.question.trim();

    if (!name) {
      nextErrors.name = 'Please enter your name.';
    }
    if (!email) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!question) {
      nextErrors.question = 'Please enter your question or message.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (status === 'error') {
      setStatus('idle');
      setServerError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;
    if (!validate()) return;

    setStatus('loading');
    setServerError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus('error');
        setServerError(data?.error || '');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', question: '', website: '' });
    } catch {
      setStatus('error');
      setServerError('');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-36 section-padding relative">
      <div className="max-w-container mx-auto">
        <SectionHeading
          number="08"
          title="GOT SOME QUESTIONS FOR ME?"
          subtitle="Have an opportunity, an interesting idea, or simply want to discuss technology? Drop me a message. I'd love to hear from you."
        />

        {/* Interactive Question Submission Form Container */}
        <motion.div
          className="bg-dark-800 border border-border rounded-panel p-6 sm:p-8 md:p-12 shadow-xl mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          {status === 'success' ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-text-primary">
                THANK YOU! YOUR MESSAGE HAS BEEN SENT SUCCESSFULLY.
              </h3>
              <p className="text-sm text-text-secondary max-w-md mx-auto">
                I&apos;ve received your enquiry and will get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-dark-900 border border-border text-xs font-mono font-bold tracking-widest uppercase text-text-primary rounded-chip hover:border-accent hover:text-accent transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Honeypot anti-spam field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Field 01: Your Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-text-muted mb-2.5"
                  >
                    Your Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3.5 bg-dark-900 border rounded-inner text-sm text-text-primary placeholder:text-text-muted/70 focus:outline-none focus:border-accent transition-colors ${
                      errors.name ? 'border-rose-500/70' : 'border-border'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>
                  )}
                </div>

                {/* Field 02: Your Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-text-muted mb-2.5"
                  >
                    Your Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={`w-full px-4 py-3.5 bg-dark-900 border rounded-inner text-sm text-text-primary placeholder:text-text-muted/70 focus:outline-none focus:border-accent transition-colors ${
                      errors.email ? 'border-rose-500/70' : 'border-border'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Field 03: Your Question */}
              <div>
                <label
                  htmlFor="contact-question"
                  className="block text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-text-muted mb-2.5"
                >
                  Your Question <span className="text-accent">*</span>
                </label>
                <textarea
                  id="contact-question"
                  name="question"
                  required
                  rows={5}
                  value={formData.question}
                  onChange={handleChange}
                  placeholder="What would you like to ask me?"
                  className={`w-full px-4 py-3.5 bg-dark-900 border rounded-inner text-sm text-text-primary placeholder:text-text-muted/70 focus:outline-none focus:border-accent transition-colors resize-y ${
                    errors.question ? 'border-rose-500/70' : 'border-border'
                  }`}
                />
                {errors.question && (
                  <p className="mt-1.5 text-xs text-rose-400">{errors.question}</p>
                )}
              </div>

              {/* Error State */}
              {status === 'error' && (
                <div className="p-4 rounded-inner bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs sm:text-sm text-rose-400">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">
                      Something went wrong. Please try again or contact me directly via email.
                    </p>
                    {serverError && (
                      <p className="mt-1 text-xs opacity-80">{serverError}</p>
                    )}
                    <a
                      href={`mailto:${profile.contact.email}`}
                      className="mt-2 inline-block font-mono text-xs underline text-accent-light hover:text-accent"
                    >
                      {profile.contact.email}
                    </a>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white text-xs font-bold tracking-[0.2em] uppercase rounded-chip hover:bg-accent-dark disabled:opacity-60 transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Direct Social & Email Links Below the Form */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Email */}
          <a
            href={`mailto:${profile.contact.email}`}
            className="group p-5 bg-dark-800 border border-border rounded-panel flex items-center justify-between hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded-chip bg-dark-900 border border-border flex items-center justify-center text-accent flex-shrink-0">
                <Mail size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-0.5">
                  EMAIL
                </p>
                <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors truncate">
                  {profile.contact.email}
                </p>
              </div>
            </div>
            <ArrowUpRight size={17} className="text-text-muted group-hover:text-accent transition-colors flex-shrink-0" />
          </a>

          {/* GitHub */}
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 bg-dark-800 border border-border rounded-panel flex items-center justify-between hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded-chip bg-dark-900 border border-border flex items-center justify-center text-text-primary group-hover:text-accent transition-colors flex-shrink-0">
                <Github size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-0.5">
                  GITHUB
                </p>
                <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors truncate">
                  github.com/amal-joji
                </p>
              </div>
            </div>
            <ArrowUpRight size={17} className="text-text-muted group-hover:text-accent transition-colors flex-shrink-0" />
          </a>

          {/* LinkedIn */}
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 bg-dark-800 border border-border rounded-panel flex items-center justify-between hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded-chip bg-dark-900 border border-border flex items-center justify-center text-text-primary group-hover:text-accent transition-colors flex-shrink-0">
                <Linkedin size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-0.5">
                  LINKEDIN
                </p>
                <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors truncate">
                  in.linkedin.com/in/amaljoji
                </p>
              </div>
            </div>
            <ArrowUpRight size={17} className="text-text-muted group-hover:text-accent transition-colors flex-shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}
