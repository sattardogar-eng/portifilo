import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  domain: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How does Kalon Atelier manage commissions outside of Denmark and Switzerland?',
    answer:
      'We operate as lead executive architect across the European Union, the UK, and North America. In non-domestic jurisdictions, we pair our core design and technical engineering team with vetted local architects-of-record (Contact Architects) who oversee daily municipal filings and site inspections under our direct contractual supervision.',
    domain: 'International Practice',
  },
  {
    question: 'What contractual fee structure governs your architectural services?',
    answer:
      'Our fees adhere strictly to standard Swiss SIA 102 and Nordic FRI / DANSKE ARK fee calculations based on verified construction volume (typically between 12.5% and 14.5% of net building envelope and interior execution costs). For initial site diagnostics, master planning, and feasibility modeling, we offer fixed-fee preliminary study agreements.',
    domain: 'Fee Governance',
  },
  {
    question: 'Is true Passive House or Minergie-P performance achievable on challenging sites?',
    answer:
      'Yes. In fact, extreme climates (such as arctic fjords or alpine elevations above 1,500m) showcase the greatest thermodynamic return on passive investment. By calibrating solar azimuth, designing thermal-bridge-free junctions, and utilizing high-mass minerals (such as rammed earth and flamed granite), we regularly reduce operational heating demand by 85–90% compared to baseline building codes.',
    domain: 'Engineering & Energy',
  },
  {
    question: 'How do you preserve historic character while complying with modern energy codes in adaptive reuse?',
    answer:
      'We utilize internal hygroscopic insulation envelopes (such as mineral calcium silicate and breathable lime plaster) rather than external wraps that would conceal historic masonry. This preserves original exterior brickwork and stone patinas untouched while preventing moisture accumulation behind wall layers.',
    domain: 'Heritage & Conservation',
  },
  {
    question: 'What is the standard horizon from initial commission to occupancy?',
    answer:
      'A bespoke ground-up residential villa typically requires 6 to 9 months for schematic design, environmental simulations, and municipal permitting, followed by 12 to 16 months of physical construction. Adaptive conversions typically proceed on a 12 to 15-month schedule.',
    domain: 'Timeline & Delivery',
  },
];

export const StudioFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="studio" className="py-24 border-t border-neutral-800 bg-[#0E0E0E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Header */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Studio Inquiries
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-white">
              Frequently Addressed Considerations
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Clear insight into our regulatory standards, cross-border logistics,
              and environmental engineering protocols.
            </p>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-7 divide-y divide-neutral-800 border-y border-neutral-800">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-start justify-between text-left gap-4 cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                        {faq.domain}
                      </span>
                      <h3 className="font-display text-lg sm:text-xl text-white group-hover:text-neutral-300 transition-colors">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`p-1.5 border border-neutral-700 bg-neutral-900 shrink-0 mt-1 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-white text-black' : 'text-white'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed pr-6 animate-in fade-in duration-200">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
