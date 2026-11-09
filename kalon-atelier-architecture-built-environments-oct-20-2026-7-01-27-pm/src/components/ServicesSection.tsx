import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  shortSummary: string;
  deliverables: string[];
  certifications: string;
  typicalTimeline: string;
  phases: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: 'architecture-passive',
    number: '01',
    title: 'Ground-Up Architecture & Passive House Engineering',
    category: 'New Construction',
    shortSummary:
      'Turnkey architectural design for bespoke private villas and institutions engineered to exceed European Passive House Institute standards with negative or near-zero operational energy draw.',
    deliverables: [
      'Site solar and thermal envelope modeling (PHPP & EnergyPlus)',
      'AIA / SIA 112 full design documentation and permitting packages',
      'High-performance quadruple/triple-glazed envelope integration',
      'Structural engineering coordination with mass timber and low-carbon masonry',
      'On-site architect supervision and construction administration',
    ],
    certifications: 'Passivhaus Classic / Plus, Swiss Minergie-P, DGNB Platinum',
    typicalTimeline: '14 to 22 months from concept to handover',
    phases: ['Concept Feasibility', 'Schematic Design', 'Planning Approval', 'Construction Administration'],
  },
  {
    id: 'adaptive-reuse',
    number: '02',
    title: 'Adaptive Reuse & Historic Fabric Restoration',
    category: 'Heritage Transformation',
    shortSummary:
      'Sensitive architectural transformation of protected industrial landmarks, stone barns, and historical tenements into contemporary sanctuaries while retaining structural patina and cultural memory.',
    deliverables: [
      'Historical preservation agency negotiation and compliance filings',
      'Laser-scanned point cloud survey and structural forensic analysis',
      'Vapor-permeable thermal retrofits preserving existing masonry facades',
      'Bespoke sculptural interior insertions (cantilevered metalwork & timber mezzanines)',
      'Carbon-avoidance lifecycle assessment (saving 60–80% vs new builds)',
    ],
    certifications: 'ICOMOS Heritage Conservation Standards, SIA 112/1',
    typicalTimeline: '12 to 18 months',
    phases: ['Heritage Diagnostics', 'Conservation Approvals', 'Structural Interventions', 'Interior Joinery'],
  },
  {
    id: 'bespoke-interiors',
    number: '03',
    title: 'Monolithic Interior Joinery & Custom Spatial Craft',
    category: 'Spatial Design & Objects',
    shortSummary:
      'Seamless interior environments where architecture and furniture become one continuous entity through custom stone carving, continuous timber planks, and bespoke patinated bronze fittings.',
    deliverables: [
      'Full millwork and joinery detailing at 1:1 and 1:5 scale',
      'Direct quarry selection of single-slab marble, granite, and basalt',
      'Full-span Dinesen timber flooring coordination and bespoke cabinetry',
      'Architectural lighting design calibrated to Circadian dimming',
      'Custom sanitary ware and monolithic stone bathtubs',
    ],
    certifications: 'FSC-Certified Nordic Forestry, Zero VOC Indoor Air Quality',
    typicalTimeline: '6 to 10 months (concurrent with architecture)',
    phases: ['Spatial Choreography', 'Material Sourcing', 'Joinery Prototyping', 'Artisanal Installation'],
  },
  {
    id: 'bioclimatic-landscape',
    number: '04',
    title: 'Bioclimatic Site Planning & Landscape Integration',
    category: 'Environmental Synthesis',
    shortSummary:
      'Fusing the built volume directly into bedrock, dunes, or alpine slopes through native biodiversity corridors, geothermal borefields, and rainwater retention reflecting pools.',
    deliverables: [
      'Microclimate wind-shelter and sun-path mapping',
      'Groundwater hydrology and native regenerative planting regimes',
      'Geothermal loop planning and closed-cycle greywater ecology',
      'Dry-stacked stone retaining walls and monolithic terrace paving',
    ],
    certifications: 'SITES Sustainable Landscapes, Swiss Eco-Bauen',
    typicalTimeline: '4 to 8 months',
    phases: ['Topographic Analysis', 'Ecological Masterplan', 'Earthworks Integration'],
  },
];

interface ServicesSectionProps {
  onOpenConsultation: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenConsultation }) => {
  const [expandedId, setExpandedId] = useState<string>('architecture-passive');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="methodology" className="py-24 border-t border-neutral-800 bg-[#0E0E0E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Practice Disciplines
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white">
              Methodology & Spatial Disciplines
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 leading-relaxed">
            Every commission operates under rigorous Swiss and Nordic engineering
            standards, merging artisanal craftsmanship with uncompromising energy performance.
          </p>
        </div>

        {/* Editorial Accordion List */}
        <div className="divide-y divide-neutral-800 border-y border-neutral-800">
          {SERVICES.map((service) => {
            const isExpanded = expandedId === service.id;
            return (
              <div key={service.id} className="py-6 transition-colors">
                {/* Header row */}
                <button
                  onClick={() => toggleExpand(service.id)}
                  className="w-full flex items-start sm:items-center justify-between text-left gap-4 cursor-pointer group"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start sm:items-center gap-6 sm:gap-10">
                    <span className="font-mono text-xs text-neutral-400 tabular-nums pt-1 sm:pt-0">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl text-white group-hover:text-neutral-300 transition-colors">
                        {service.title}
                      </h3>
                      <div className="text-xs text-neutral-400 font-mono mt-0.5 sm:hidden">
                        {service.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <span className="hidden sm:inline-block text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      {service.category}
                    </span>
                    <div
                      className={`p-1.5 border border-neutral-700 bg-neutral-900 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 bg-white text-black' : 'text-white'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Expandable details */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-neutral-800 grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm animate-in fade-in duration-200">
                    <div className="lg:col-span-5 space-y-4">
                      <p className="text-neutral-300 leading-relaxed">
                        {service.shortSummary}
                      </p>

                      <div className="p-4 bg-[#141414] border border-neutral-800 space-y-3">
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                            Benchmark Standards
                          </span>
                          <span className="text-xs font-medium text-white">
                            {service.certifications}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                            Typical Commission Horizon
                          </span>
                          <span className="text-xs font-medium text-white">
                            {service.typicalTimeline}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={onOpenConsultation}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-neutral-300 transition-colors pt-2 cursor-pointer"
                      >
                        <span>Discuss this discipline for your site</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="lg:col-span-7">
                      <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                        Integrated Studio Deliverables
                      </div>
                      <ul className="space-y-2.5">
                        {service.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                            <span className="w-1.5 h-1.5 bg-white shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap items-center gap-3">
                        <span className="text-[11px] font-mono text-neutral-400">Phased Governance:</span>
                        {service.phases.map((phase, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-[11px] text-neutral-300 font-medium"
                          >
                            {pIdx + 1}. {phase}
                            {pIdx < service.phases.length - 1 && <span className="text-neutral-600 ml-3">→</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
