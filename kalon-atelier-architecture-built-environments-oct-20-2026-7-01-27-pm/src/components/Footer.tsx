import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  const [monographEmail, setMonographEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!monographEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(monographEmail)) {
      setError('Please provide a valid email format.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-neutral-300 border-t border-neutral-800 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-800">
          {/* Brand & Manifesto (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="font-display text-2xl text-white tracking-tight block hover:text-neutral-300 transition-colors"
            >
              Kalon Atelier
            </a>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Contemporary architecture, spatial interiors, and environmental engineering
              anchored in Copenhagen and Zurich. Dedicated to tectonic permanence and
              material integrity.
            </p>
            <div className="text-[11px] font-mono text-neutral-500">
              Bredgade 42, Copenhagen · Neugasse 29, Zurich
            </div>
          </div>

          {/* Directory Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Studio Directory
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#works" className="text-neutral-400 hover:text-white transition-colors">
                  Selected Works & Monographs
                </a>
              </li>
              <li>
                <a href="#methodology" className="text-neutral-400 hover:text-white transition-colors">
                  Methodology & Disciplines
                </a>
              </li>
              <li>
                <a href="#materials" className="text-neutral-400 hover:text-white transition-colors">
                  Tactile Material Archive
                </a>
              </li>
              <li>
                <a href="#feasibility" className="text-neutral-400 hover:text-white transition-colors">
                  Feasibility & Investment Model
                </a>
              </li>
              <li>
                <a href="#inquiry" className="text-neutral-400 hover:text-white transition-colors">
                  Commission Inquiries
                </a>
              </li>
              <li>
                <a href="#studio" className="text-neutral-400 hover:text-white transition-colors">
                  Practice Governance & FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Monograph Gazettes / Publications (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Printed Monograph & Research Gazette
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We publish a biannual architectural gazette featuring technical construction
              details, embodied carbon lifecycle benchmarks, and unreleased project photography.
            </p>

            {subscribed ? (
              <div className="p-3 bg-white/10 border border-white/20 text-xs text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>You have been registered for our biannual printed edition.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={monographEmail}
                    onChange={(e) => {
                      setMonographEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="architect@practice.com"
                    className="flex-1 bg-[#141414] border border-neutral-700 px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-white transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-black hover:bg-neutral-200 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </div>
                {error && (
                  <p className="text-[11px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} Kalon Atelier ApS & AG. All architectural drawings and photographs copyrighted.
          </div>

          <div className="flex items-center gap-6">
            <span>SIA Member No. 89201</span>
            <span aria-hidden="true">·</span>
            <span>DANSKE ARK Registry</span>
            <span aria-hidden="true">·</span>
            <button onClick={scrollToTop} className="hover:text-white transition-colors cursor-pointer">
              Return to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
