import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Code2, BrainCircuit, AlertCircle, Loader2 } from 'lucide-react';
import { profile } from '../data/profile';
import { useResumeModal } from '../context/ResumeContext';

export default function ResumeModal() {
  const { isOpen, closeResumeModal } = useResumeModal();
  const [downloadingId, setDownloadingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setErrorMsg('');
      setDownloadingId(null);
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeResumeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, closeResumeModal]);

  const handleDownload = async (resumeOption) => {
    setErrorMsg('');
    setDownloadingId(resumeOption.id);

    try {
      const response = await fetch(resumeOption.path, { method: 'GET' });
      const contentType = response.headers.get('content-type') || '';

      if (!response.ok || contentType.includes('text/html')) {
        setErrorMsg(
          `${resumeOption.title} is currently unavailable (${resumeOption.path}). Please check back shortly or contact me directly.`
        );
        setDownloadingId(null);
        return;
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = resumeOption.downloadName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      setErrorMsg(
        `Unable to download ${resumeOption.title} right now. Please try again later.`
      );
    } finally {
      setDownloadingId(null);
    }
  };

  const options = [
    { ...profile.resumes.sde, icon: Code2, accent: 'text-accent' },
    { ...profile.resumes.aiml, icon: BrainCircuit, accent: 'text-cyan' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            onClick={closeResumeModal}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            className="relative z-10 w-full max-w-3xl bg-dark-800 border border-border-light rounded-panel p-6 sm:p-8 md:p-10 shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <p className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-accent mb-2">
                  CURATED PROFILES
                </p>
                <h2
                  id="resume-modal-title"
                  className="text-2xl sm:text-3xl font-black tracking-tight text-text-primary mb-2"
                >
                  CHOOSE YOUR RESUME
                </h2>
                <p className="text-sm sm:text-base text-text-secondary">
                  Select the version that best matches the opportunity you&apos;re exploring.
                </p>
              </div>

              <button
                type="button"
                onClick={closeResumeModal}
                aria-label="Close resume selector"
                className="p-2 rounded-chip bg-dark-900 border border-border text-text-secondary hover:text-text-primary hover:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Error Banner if file missing */}
            {errorMsg && (
              <div className="mb-6 p-4 rounded-inner bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs sm:text-sm text-rose-400">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Two Balanced Selectable Resume Cards */}
            <div className="grid sm:grid-cols-2 gap-5">
              {options.map((opt) => {
                const Icon = opt.icon;
                const isDownloading = downloadingId === opt.id;
                return (
                  <div
                    key={opt.id}
                    className="bg-dark-900/70 border border-border rounded-card p-6 flex flex-col justify-between transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div
                          className={`w-10 h-10 rounded-chip bg-dark-800 border border-border flex items-center justify-center ${opt.accent}`}
                        >
                          <Icon size={20} />
                        </div>
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-text-muted">
                          PDF
                        </span>
                      </div>

                      <p className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-accent-light mb-2">
                        {opt.option}
                      </p>

                      <h3 className="text-xl font-bold text-text-primary mb-3">
                        {opt.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                        {opt.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={isDownloading}
                      onClick={() => handleDownload(opt)}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-accent text-white text-[11px] font-bold tracking-[0.18em] uppercase rounded-chip hover:bg-accent-dark disabled:opacity-60 transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>PREPARING...</span>
                        </>
                      ) : (
                        <>
                          <Download size={14} />
                          <span>{opt.buttonLabel}</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
