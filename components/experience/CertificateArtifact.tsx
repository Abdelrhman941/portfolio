'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function CertificateArtifact() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pdfUrl = '/assets/DEPI_Certificate.pdf';

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  return (
    <>
      <div className="relative w-full group">
        {/* Artifact Container */}
        <div className="relative w-full aspect-[1.414/1] md:aspect-video bg-zinc-100 border border-zinc-200/60 shadow-sm overflow-hidden rounded-md transition-all duration-300 group-hover:shadow-md">
          {/* PDF Preview (using native embed) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <object
              data={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              type="application/pdf"
              className="w-full h-full"
            >
              {/* Fallback if object doesn't load/render properly in some browsers */}
              <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-50 text-zinc-400 font-mono text-sm p-6 text-center">
                <span>PDF Preview</span>
                <span className="text-[10px] mt-2 opacity-60">Hover or click to view document</span>
              </div>
            </object>
          </div>

          {/* Interaction Overlay */}
          <button
            onClick={() => setIsFullscreen(true)}
            aria-label="View Certificate Modal"
            className="absolute inset-0 w-full h-full bg-white/0 group-hover:bg-zinc-900/5 transition-colors duration-300 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 cursor-pointer"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-zinc-900 text-white px-5 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                View Certificate
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Fallback / secondary actions below the artifact */}
        <div className="mt-4 flex flex-wrap gap-4 justify-between items-center px-1">
          <button
            onClick={() => setIsFullscreen(true)}
            className="text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 rounded-sm"
          >
            View Certificate <span className="text-zinc-400">↗</span>
          </button>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-zinc-400 hover:text-zinc-900 transition-colors underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 rounded-sm"
          >
            Open PDF in new tab ↗
          </a>
        </div>
      </div>

      {/* Fullscreen Modal Viewer */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 lg:p-12 bg-zinc-950/80 backdrop-blur-sm"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-full max-h-[90vh] bg-zinc-50 rounded-lg shadow-2xl overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-white border-b border-zinc-200 shrink-0">
                <h3 id="modal-title" className="font-medium text-zinc-900 text-sm md:text-base">
                  DEPI Certificate
                </h3>
                <div className="flex items-center gap-4 md:gap-6">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 rounded-sm"
                  >
                    Open original <span className="text-zinc-400">↗</span>
                  </a>
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="text-zinc-400 hover:text-zinc-900 transition-colors p-1 md:p-2 -mr-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
                    aria-label="Close modal"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body - PDF Viewer */}
              <div className="w-full h-full grow relative bg-zinc-100">
                <iframe
                  src={`${pdfUrl}#view=FitH`}
                  className="w-full h-full border-none"
                  title="DEPI Certificate PDF Document Viewer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
