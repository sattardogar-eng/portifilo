import React, { useState, useMemo } from 'react';
import { ArrowRight, Check, Download } from 'lucide-react';
import { EstimationConfig, EstimationResult } from '../types';

interface EstimatorSectionProps {
  onTransferToConsultation: (data: {
    typology: string;
    area: string;
    estimatedCost: string;
    timeline: string;
  }) => void;
}

export const EstimatorSection: React.FC<EstimatorSectionProps> = ({
  onTransferToConsultation,
}) => {
  const [config, setConfig] = useState<EstimationConfig>({
    typology: 'residential_villa',
    areaM2: 420,
    unit: 'm2',
    standard: 'zero_passive',
    topography: 'coastal_rock',
    interiorFinish: 'signature',
  });

  const [currency, setCurrency] = useState<'EUR' | 'CHF' | 'USD'>('EUR');
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Currency multipliers (baseline EUR)
  const currencyRate = {
    EUR: { rate: 1.0, symbol: '€' },
    CHF: { rate: 0.95, symbol: 'CHF ' },
    USD: { rate: 1.08, symbol: '$' },
  };

  const results: EstimationResult = useMemo(() => {
    let baseRateM2 = 3400;
    if (config.typology === 'adaptive_reuse') baseRateM2 = 2950;
    if (config.typology === 'cultural_pavilion') baseRateM2 = 3200;

    let standardMultiplier = 1.0;
    if (config.standard === 'swiss_minergie') standardMultiplier = 1.08;
    if (config.standard === 'zero_passive') standardMultiplier = 1.15;

    let topoMultiplier = 1.0;
    if (config.topography === 'coastal_rock') topoMultiplier = 1.09;
    if (config.topography === 'alpine_slope') topoMultiplier = 1.16;

    let interiorMultiplier = 0.28;
    if (config.interiorFinish === 'monolithic_bespoke') interiorMultiplier = 0.38;
    if (config.interiorFinish === 'heritage_museum') interiorMultiplier = 0.52;

    const effectiveArea = config.areaM2;
    const coreShellCost = effectiveArea * baseRateM2 * standardMultiplier * topoMultiplier;
    const interiorCost = coreShellCost * interiorMultiplier;
    const architecturalFee = (coreShellCost + interiorCost) * 0.135;
    const contingency = (coreShellCost + interiorCost) * 0.06;

    const total = coreShellCost + interiorCost + architecturalFee + contingency;

    let months = 14;
    if (effectiveArea > 350) months += 3;
    if (effectiveArea > 600) months += 4;
    if (config.topography === 'alpine_slope') months += 2;
    if (config.typology === 'adaptive_reuse') months += 2;

    const curr = currencyRate[currency].rate;

    return {
      baseConstructionCost: Math.round(coreShellCost * curr),
      joineryInteriorCost: Math.round(interiorCost * curr),
      architecturalFee: Math.round(architecturalFee * curr),
      contingencyPermits: Math.round(contingency * curr),
      totalEstimatedInvestment: Math.round(total * curr),
      estimatedTimelineMonths: months,
      currency,
    };
  }, [config, currency]);

  const formatMoney = (val: number) => {
    const sym = currencyRate[currency].symbol;
    return `${sym}${val.toLocaleString('en-US')}`;
  };

  const handleCopySummary = () => {
    const summaryText = `Kalon Atelier Feasibility Estimate:
Typology: ${config.typology}
Area: ${config.areaM2} m² (${Math.round(config.areaM2 * 10.764)} sq ft)
Performance Standard: ${config.standard}
Topography: ${config.topography}
Interior Grade: ${config.interiorFinish}
Estimated Total Investment: ${formatMoney(results.totalEstimatedInvestment)}
Delivery Timeline: ${results.estimatedTimelineMonths} Months`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleApplyToConsultation = () => {
    const typologyLabels = {
      residential_villa: 'Custom Residential Villa',
      adaptive_reuse: 'Historic / Industrial Adaptive Conversion',
      cultural_pavilion: 'Cultural Pavilion / Atelier Space',
    };

    onTransferToConsultation({
      typology: typologyLabels[config.typology],
      area: `${config.areaM2} m² (${Math.round(config.areaM2 * 10.764)} sq ft)`,
      estimatedCost: formatMoney(results.totalEstimatedInvestment),
      timeline: `${results.estimatedTimelineMonths} Months`,
    });
  };

  return (
    <section id="feasibility" className="py-24 border-t border-neutral-800 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Financial Transparency & Feasibility
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white">
              Project Scope & Investment Calculator
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 leading-relaxed">
            Real architectural commissions require upfront financial clarity. Calibrate your
            site variables, programmatic area, and performance goals below to receive an
            indicative capital expenditure model.
          </p>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Controls (7 cols) */}
          <div className="lg:col-span-7 bg-[#121212] border border-neutral-800 p-6 sm:p-8 space-y-8">
            {/* 1. Typology */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
                1. Project Typology
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'residential_villa', label: 'Residential Villa', sub: 'Ground-up custom build' },
                  { id: 'adaptive_reuse', label: 'Adaptive Conversion', sub: 'Heritage & loft restore' },
                  { id: 'cultural_pavilion', label: 'Cultural / Atelier', sub: 'Civic or gallery space' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setConfig({ ...config, typology: item.id as any })}
                    className={`p-3.5 text-left border transition-all cursor-pointer ${
                      config.typology === item.id
                        ? 'bg-white text-black border-white font-semibold'
                        : 'bg-[#181818] hover:bg-[#202020] text-neutral-300 border-neutral-700'
                    }`}
                  >
                    <div className="text-xs">{item.label}</div>
                    <div
                      className={`text-[11px] mt-0.5 ${
                        config.typology === item.id ? 'text-neutral-700' : 'text-neutral-500'
                      }`}
                    >
                      {item.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Program Area with Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  2. Gross Internal Area (GIA)
                </label>
                <div className="flex items-center gap-1 p-0.5 bg-[#1C1C1C] text-[11px] font-mono border border-neutral-700">
                  <button
                    onClick={() => setConfig({ ...config, unit: 'm2' })}
                    className={`px-2 py-0.5 cursor-pointer ${
                      config.unit === 'm2' ? 'bg-white text-black font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    m²
                  </button>
                  <button
                    onClick={() => setConfig({ ...config, unit: 'sqft' })}
                    className={`px-2 py-0.5 cursor-pointer ${
                      config.unit === 'sqft' ? 'bg-white text-black font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    sq ft
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-3xl text-white tabular-nums">
                    {config.unit === 'm2'
                      ? `${config.areaM2} m²`
                      : `${Math.round(config.areaM2 * 10.764)} sq ft`}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {config.unit === 'm2'
                      ? `≈ ${Math.round(config.areaM2 * 10.764)} sq ft`
                      : `≈ ${config.areaM2} m²`}
                  </span>
                </div>

                <input
                  type="range"
                  min="120"
                  max="1000"
                  step="10"
                  value={config.areaM2}
                  onChange={(e) => setConfig({ ...config, areaM2: Number(e.target.value) })}
                  className="w-full accent-white bg-neutral-800 cursor-ew-resize h-1.5"
                  aria-label="Area in square meters"
                />

                <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                  <span>120 m² (Compact Atelier)</span>
                  <span>450 m² (Medium Villa)</span>
                  <span>1,000 m² (Estate Campus)</span>
                </div>
              </div>
            </div>

            {/* 3. Performance & Energy Standard */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
                3. Building Envelope & Performance Standard
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  {
                    id: 'high_performance',
                    title: 'Standard High-Perf',
                    desc: 'Triple glazing, airtightness n50 < 0.6',
                  },
                  {
                    id: 'swiss_minergie',
                    title: 'Swiss Minergie-P',
                    desc: 'Controlled ventilation, sub-zero draft',
                  },
                  {
                    id: 'zero_passive',
                    title: 'Passive House Plus',
                    desc: 'Net-positive solar & geothermal mass',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setConfig({ ...config, standard: item.id as any })}
                    className={`p-3 text-left border transition-all cursor-pointer ${
                      config.standard === item.id
                        ? 'bg-white text-black border-white font-semibold'
                        : 'bg-[#181818] hover:bg-[#202020] text-neutral-300 border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-medium">{item.title}</div>
                    <div
                      className={`text-[10px] mt-0.5 leading-snug ${
                        config.standard === item.id ? 'text-neutral-700' : 'text-neutral-500'
                      }`}
                    >
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Topography & Site Complexity */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
                4. Site Topography & Foundation Complexity
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'flat_infill', label: 'Flat / Urban Infill', desc: 'Standard pad or raft' },
                  { id: 'coastal_rock', label: 'Coastal Bedrock', desc: 'Skerry anchor & marine tie' },
                  { id: 'alpine_slope', label: 'Alpine Incline', desc: 'Stepped mountain grade' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setConfig({ ...config, topography: item.id as any })}
                    className={`p-3 text-left border transition-all cursor-pointer ${
                      config.topography === item.id
                        ? 'bg-white text-black border-white font-semibold'
                        : 'bg-[#181818] hover:bg-[#202020] text-neutral-300 border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-medium">{item.label}</div>
                    <div
                      className={`text-[10px] mt-0.5 ${
                        config.topography === item.id ? 'text-neutral-700' : 'text-neutral-500'
                      }`}
                    >
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Interior Craft Tier */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
                5. Interior Joinery & Monolithic Craft Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'signature', label: 'Signature Essential', desc: 'Nordic oak & clean plaster' },
                  { id: 'monolithic_bespoke', label: 'Monolithic Stone', desc: 'Quarry slabs & bronze trim' },
                  { id: 'heritage_museum', label: 'Museum Craft Grade', desc: 'Continuous Dinesen & brass' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setConfig({ ...config, interiorFinish: item.id as any })}
                    className={`p-3 text-left border transition-all cursor-pointer ${
                      config.interiorFinish === item.id
                        ? 'bg-white text-black border-white font-semibold'
                        : 'bg-[#181818] hover:bg-[#202020] text-neutral-300 border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-medium">{item.label}</div>
                    <div
                      className={`text-[10px] mt-0.5 ${
                        config.interiorFinish === item.id ? 'text-neutral-700' : 'text-neutral-500'
                      }`}
                    >
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Live Calculation Output (5 cols) */}
          <div className="lg:col-span-5 bg-[#121212] border border-neutral-700 p-6 sm:p-8 space-y-6 lg:sticky lg:top-28">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
                  Indicative Financial Model
                </span>
                <span className="text-sm font-semibold text-white">Capital Expenditure Projection</span>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center gap-1 p-0.5 bg-[#1C1C1C] text-[11px] font-mono border border-neutral-700">
                {(['EUR', 'CHF', 'USD'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-0.5 cursor-pointer ${
                      currency === c ? 'bg-white text-black font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Highlight */}
            <div className="py-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                Estimated Turnkey Project Investment
              </span>
              <div className="font-display text-3xl sm:text-4xl text-white tabular-nums">
                {formatMoney(results.totalEstimatedInvestment)}
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                Estimated Cost per m²: {formatMoney(Math.round(results.totalEstimatedInvestment / config.areaM2))}/m²
              </div>
            </div>

            {/* Detailed Component Breakdown */}
            <div className="space-y-3 pt-4 border-t border-neutral-800 text-xs">
              <div className="flex justify-between items-center text-neutral-300">
                <span>1. Core Structure, Glazing & Enclosure</span>
                <span className="font-mono text-white tabular-nums">
                  {formatMoney(results.baseConstructionCost)}
                </span>
              </div>

              <div className="flex justify-between items-center text-neutral-300">
                <span>2. Bespoke Interior Millwork & Finishes</span>
                <span className="font-mono text-white tabular-nums">
                  {formatMoney(results.joineryInteriorCost)}
                </span>
              </div>

              <div className="flex justify-between items-center text-neutral-300">
                <span>3. Atelier Architectural & Engineering Fees (13.5%)</span>
                <span className="font-mono text-white tabular-nums">
                  {formatMoney(results.architecturalFee)}
                </span>
              </div>

              <div className="flex justify-between items-center text-neutral-300">
                <span>4. Permitting, Testing & Regulatory Contingency</span>
                <span className="font-mono text-white tabular-nums">
                  {formatMoney(results.contingencyPermits)}
                </span>
              </div>
            </div>

            {/* Estimated Horizon Banner */}
            <div className="p-4 bg-[#181818] border border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                  Delivery Horizon
                </span>
                <span className="text-sm font-semibold text-white">
                  ≈ {results.estimatedTimelineMonths} Months from Feasibility
                </span>
              </div>
              <div className="text-right text-[11px] text-neutral-400">
                Permits & testing included
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleApplyToConsultation}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors cursor-pointer shadow-sm"
              >
                <span>Attach to Consultation Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleCopySummary}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium text-white border border-neutral-700 hover:border-white transition-colors cursor-pointer"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Summary Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 opacity-70" />
                    <span>Copy Feasibility Docket Summary</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-neutral-500 leading-normal pt-2 border-t border-neutral-800">
              *Note: Projections reflect prevailing Swiss SIA 112 and Nordic contractor
              rates as of Q1 2026. Final investment amounts are confirmed during
              schematic design following local geotechnical borings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
