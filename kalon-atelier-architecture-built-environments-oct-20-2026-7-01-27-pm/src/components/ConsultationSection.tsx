import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { InquiryFormData } from '../types';

interface ConsultationSectionProps {
  prefilledData?: {
    typology?: string;
    area?: string;
    estimatedCost?: string;
    timeline?: string;
  };
  onClearPrefill?: () => void;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({
  prefilledData,
  onClearPrefill,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    siteLocation: '',
    projectTypology: prefilledData?.typology || 'Custom Residential Villa',
    budgetRange: '€2.5M – €4.5M',
    timeline: prefilledData?.timeline || 'Q3 2026 – Q1 2027',
    projectBrief: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [docketNumber, setDocketNumber] = useState('');

  React.useEffect(() => {
    if (prefilledData?.typology) {
      setFormData((prev) => ({
        ...prev,
        projectTypology: prefilledData.typology || prev.projectTypology,
        timeline: prefilledData.timeline || prev.timeline,
      }));
    }
  }, [prefilledData]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof InquiryFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full legal name or practice name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'An email address is required for correspondence.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format (e.g., name@domain.ch).';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a telephone or mobile number with country code.';
    }

    if (!formData.siteLocation.trim()) {
      newErrors.siteLocation = 'Please specify the project parcel location or municipality.';
    }

    if (!formData.projectBrief.trim()) {
      newErrors.projectBrief = 'Please provide a brief description of the site or design objectives.';
    } else if (formData.projectBrief.trim().length < 25) {
      newErrors.projectBrief = 'Please write at least 25 characters outlining your programmatic goals.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const randomDocket = `KAL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setDocketNumber(randomDocket);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      siteLocation: '',
      projectTypology: 'Custom Residential Villa',
      budgetRange: '€2.5M – €4.5M',
      timeline: 'Q3 2026 – Q1 2027',
      projectBrief: '',
    });
    setErrors({});
    if (onClearPrefill) onClearPrefill();
  };

  return (
    <section id="inquiry" className="py-24 border-t border-neutral-800 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Studio Context & Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                Commission Inquiries
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white">
                Initiate a Commission
              </h2>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed">
              We accept a limited number of residential and cultural commissions annually
              to ensure direct principal architect involvement at every phase.
            </p>

            {/* Attached Estimate Notice if present */}
            {prefilledData && (
              <div className="p-4 bg-[#141414] border border-neutral-700 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-400">
                  <span>Attached Feasibility Model</span>
                  <button
                    onClick={onClearPrefill}
                    className="text-[10px] text-neutral-400 hover:text-white underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                <div className="text-xs text-neutral-200 space-y-1">
                  <p>
                    <strong className="font-medium text-white">Typology:</strong> {prefilledData.typology}
                  </p>
                  <p>
                    <strong className="font-medium text-white">Footprint:</strong> {prefilledData.area}
                  </p>
                  <p>
                    <strong className="font-medium text-white">Estimated Range:</strong> {prefilledData.estimatedCost}
                  </p>
                </div>
              </div>
            )}

            {/* Direct Studio Contacts */}
            <div className="space-y-6 pt-4 border-t border-neutral-800 text-xs">
              <div>
                <span className="font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                  Copenhagen Studio
                </span>
                <p className="text-white font-medium">Bredgade 42, 1260 København K, Denmark</p>
                <p className="text-neutral-400 mt-0.5">cph@kalon-atelier.com · +45 33 12 80 40</p>
              </div>

              <div>
                <span className="font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                  Zurich Studio
                </span>
                <p className="text-white font-medium">Neugasse 29, 8005 Zürich, Switzerland</p>
                <p className="text-neutral-400 mt-0.5">zrh@kalon-atelier.com · +41 44 211 90 20</p>
              </div>

              <div className="p-4 bg-[#141414] border border-neutral-800 text-[11px] text-neutral-400 space-y-1 leading-normal">
                <p className="font-medium text-white">Client Privacy & Confidentiality:</p>
                <p>
                  All architectural concepts, site coordinates, and financial disclosures
                  are held under strict non-disclosure agreements prior to formal engagement.
                </p>
              </div>
            </div>
          </div>

          {/* Form / Confirmation Panel (7 cols) */}
          <div className="lg:col-span-7 bg-[#121212] border border-neutral-800 p-6 sm:p-10">
            {isSubmitted ? (
              <div className="space-y-6 py-6 animate-in fade-in duration-300">
                <div className="w-12 h-12 bg-white text-black flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-black" />
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                    Inquiry Docket Confirmed
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-white">
                    Receipt Generated: {docketNumber}
                  </h3>
                </div>

                <div className="p-5 bg-[#181818] border border-neutral-700 space-y-3 text-xs">
                  <div className="flex justify-between border-b border-neutral-700 pb-2">
                    <span className="text-neutral-400">Principal Reviewer:</span>
                    <span className="font-medium text-white">Henrik Lindqvist, Lead Partner</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-700 pb-2">
                    <span className="text-neutral-400">Target Parcel:</span>
                    <span className="font-medium text-white">{formData.siteLocation}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-700 pb-2">
                    <span className="text-neutral-400">Selected Typology:</span>
                    <span className="font-medium text-white">{formData.projectTypology}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Initial Response Timeframe:</span>
                    <span className="font-medium text-white">Within 48 business hours</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  A verification confirmation has been dispatched to <strong>{formData.email}</strong>.
                  Our senior partner will review local zoning constraints and schedule a preliminary
                  discovery conference.
                </p>

                <button
                  onClick={handleResetForm}
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Submit Another Project Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1.5">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Dr. Marianne Weber"
                      className={`w-full bg-[#181818] border px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden transition-colors ${
                        errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-neutral-700 focus:border-white'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@organization.com"
                      className={`w-full bg-[#181818] border px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden transition-colors ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-neutral-700 focus:border-white'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1.5">
                      Telephone / Mobile *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+41 79 123 4567"
                      className={`w-full bg-[#181818] border px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden transition-colors ${
                        errors.phone ? 'border-red-500 focus:border-red-500' : 'border-neutral-700 focus:border-white'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Site Location */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1.5">
                      Site Parcel / Municipality *
                    </label>
                    <input
                      type="text"
                      value={formData.siteLocation}
                      onChange={(e) => setFormData({ ...formData, siteLocation: e.target.value })}
                      placeholder="e.g. Ascona, Ticino or Oslo Fjord"
                      className={`w-full bg-[#181818] border px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden transition-colors ${
                        errors.siteLocation ? 'border-red-500 focus:border-red-500' : 'border-neutral-700 focus:border-white'
                      }`}
                    />
                    {errors.siteLocation && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.siteLocation}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Project Typology */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1.5">
                      Typology
                    </label>
                    <select
                      value={formData.projectTypology}
                      onChange={(e) => setFormData({ ...formData, projectTypology: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-700 px-3 py-2.5 text-xs text-white focus:outline-hidden focus:border-white cursor-pointer"
                    >
                      <option value="Custom Residential Villa">Custom Residential Villa</option>
                      <option value="Historic / Industrial Adaptive Conversion">
                        Adaptive Conversion / Loft
                      </option>
                      <option value="Cultural Pavilion / Atelier Space">Cultural / Atelier Space</option>
                      <option value="Coastal or Alpine Retreat">Coastal or Alpine Retreat</option>
                    </select>
                  </div>

                  {/* Target Budget */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1.5">
                      Anticipated Budget
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-700 px-3 py-2.5 text-xs text-white focus:outline-hidden focus:border-white cursor-pointer"
                    >
                      <option value="€1.5M – €2.5M">€1.5M – €2.5M</option>
                      <option value="€2.5M – €4.5M">€2.5M – €4.5M</option>
                      <option value="€4.5M – €8.0M">€4.5M – €8.0M</option>
                      <option value="€8.0M+">€8.0M+ (Campus / Heritage)</option>
                    </select>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1.5">
                      Target Start
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-700 px-3 py-2.5 text-xs text-white focus:outline-hidden focus:border-white cursor-pointer"
                    >
                      <option value="Q3 2026 – Q4 2026">Q3 2026 – Q4 2026</option>
                      <option value="Q1 2027 – Q2 2027">Q1 2027 – Q2 2027</option>
                      <option value="Late 2027+">Late 2027+ / Early Feasibility</option>
                    </select>
                  </div>
                </div>

                {/* Project Brief */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1.5">
                    Programmatic Brief & Site Conditions *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.projectBrief}
                    onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                    placeholder="Provide details regarding the parcel characteristics, existing topography, programmatic aspirations, and any relevant environmental or historical considerations."
                    className={`w-full bg-[#181818] border p-3.5 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden transition-colors ${
                      errors.projectBrief ? 'border-red-500 focus:border-red-500' : 'border-neutral-700 focus:border-white'
                    }`}
                  />
                  {errors.projectBrief && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.projectBrief}</span>
                    </p>
                  )}
                  <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                    <span>Minimum 25 characters</span>
                    <span>{formData.projectBrief.length} chars</span>
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Registering Brief with Atelier Partners...</span>
                  ) : (
                    <>
                      <span>Transmit Project Brief & Schedule Review</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
