import React, { useState } from 'react';
import { ArrowDown, Building2 } from 'lucide-react';

interface HeroProps {
  onExploreWorks: () => void;
  onOpenEstimator: () => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreWorks,
  onOpenEstimator,
  onOpenConsultation,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Editorial Subtitle / Practice Kickers */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-widest text-neutral-400 mb-6 font-mono">
          <span>Kalon Atelier</span>
          <span aria-hidden="true">·</span>
          <span>Copenhagen & Zurich</span>
          <span aria-hidden="true">·</span>
          <span>Architectural Monograph & Built Environments</span>
        </div>

        {/* Main Typographic Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
          <div className="lg:col-span-8">
            <h1 className="font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem] leading-[1.08] tracking-tight text-white text-balance">
              Architecture rooted in permanence, material honesty, and ecological restraint.
            </h1>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end space-y-6">
            <p className="text-base text-neutral-300 leading-relaxed">
              We design and engineer bespoke residential villas, cultural spaces, and
              heritage restorations across Scandinavia and the Alpine valleys. Each project
              is an enduring response to topography, daylight, and climate resilience.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Inquire for 2026–2027
              </button>
              <button
                onClick={onOpenEstimator}
                className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white border border-neutral-700 hover:border-white bg-transparent hover:bg-white/5 transition-all cursor-pointer"
              >
                Feasibility Calculator
              </button>
            </div>
          </div>
        </div>

        {/* Dominant Hero Visual Asset with Scrim & Caption */}
        <div className="relative w-full aspect-[16/9] max-h-[640px] overflow-hidden bg-[#141414] border border-neutral-800 group">
          <img
            src="/src/assets/images/hero_kalon_architecture_1792324689206.jpg"
            alt="Villa Kysten coastal residence in Bergen Archipelago, Norway by Kalon Atelier"
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02] ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#141414] text-neutral-400 text-sm">
              <Building2 className="w-8 h-8 animate-pulse opacity-40 mr-3" />
              <span>Loading monograph photography...</span>
            </div>
          )}

          {/* Measured Editorial Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

          {/* Floating Monograph Caption Overlay */}
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                Recent Monograph 01
              </div>
              <h2 className="font-display text-2xl lg:text-3xl text-white">
                Villa Kysten · Bergen Archipelago
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-300">
                <span>Norway</span>
                <span aria-hidden="true">·</span>
                <span>Passive House Plus</span>
                <span aria-hidden="true">·</span>
                <span>Basalt Plinth & Glulam Timber</span>
              </div>
            </div>

            <button
              onClick={onExploreWorks}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 transition-colors w-fit cursor-pointer"
            >
              <span>Explore Selected Works</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quiet Proof & Quantitative Trust Strip */}
        <div className="mt-12 pt-8 border-t border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <div className="text-2xl lg:text-3xl font-display font-normal text-white tabular-nums">
              100%
            </div>
            <div className="text-xs text-neutral-400 mt-1 leading-snug">
              Passive House & Swiss Minergie-P compliance threshold on new commissions
            </div>
          </div>

          <div>
            <div className="text-2xl lg:text-3xl font-display font-normal text-white tabular-nums">
              &lt; 150 kg
            </div>
            <div className="text-xs text-neutral-400 mt-1 leading-snug">
              Average embodied carbon lifecycle target per square meter (CO₂e/m²)
            </div>
          </div>

          <div>
            <div className="text-2xl lg:text-3xl font-display font-normal text-white tabular-nums">
              12 yrs
            </div>
            <div className="text-xs text-neutral-400 mt-1 leading-snug">
              Cross-border practice delivering bespoke residences across 6 European jurisdictions
            </div>
          </div>

          <div>
            <div className="text-2xl lg:text-3xl font-display font-normal text-white tabular-nums">
              14
            </div>
            <div className="text-xs text-neutral-400 mt-1 leading-snug">
              International monograph citations and European sustainability recognitions
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
