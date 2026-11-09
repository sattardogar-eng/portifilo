import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { MATERIALS } from '../data/materialsData';
import { PROJECTS } from '../data/projectsData';
import { Project } from '../types';

interface MaterialsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const MaterialsSection: React.FC<MaterialsSectionProps> = ({ onSelectProject }) => {
  const [selectedMaterialId, setSelectedMaterialId] = useState(MATERIALS[0].id);

  const activeMaterial = MATERIALS.find((m) => m.id === selectedMaterialId) || MATERIALS[0];

  const handleOpenProjectByName = (projectName: string) => {
    const found = PROJECTS.find((p) => p.title.toLowerCase().includes(projectName.toLowerCase()));
    if (found) {
      onSelectProject(found);
    }
  };

  return (
    <section id="materials" className="py-24 border-t border-neutral-800 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Physical Provenance
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white">
              Material Archive & Tactile Honesty
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 leading-relaxed">
            We avoid synthetic composites in favor of raw, elemental substances that
            age with dignity, regulate interior humidity naturally, and endure for generations.
          </p>
        </div>

        {/* Interactive Material Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {MATERIALS.map((mat) => {
            const isSelected = mat.id === selectedMaterialId;
            return (
              <button
                key={mat.id}
                onClick={() => setSelectedMaterialId(mat.id)}
                className={`p-4 text-left border transition-all cursor-pointer flex flex-col justify-between h-32 ${
                  isSelected
                    ? 'bg-[#181818] border-white shadow-md'
                    : 'bg-[#111111] border-neutral-800 hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-5 h-5 rounded-full border border-neutral-600 shadow-inner"
                    style={{ backgroundColor: mat.swatchTone }}
                  />
                  <span className="text-[10px] font-mono text-neutral-400">
                    {mat.category.split('&')[0]}
                  </span>
                </div>

                <div>
                  <h4 className="font-display text-sm text-white leading-tight">
                    {mat.name}
                  </h4>
                  <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                    {mat.origin.split(',')[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Material Monograph Card */}
        <div className="bg-[#121212] border border-neutral-800 p-6 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left col: Swatch representation & Origin */}
            <div className="lg:col-span-4 space-y-6">
              <div className="relative aspect-square max-w-[280px] bg-[#181818] border border-neutral-700 p-6 flex flex-col justify-between shadow-inner">
                <div
                  className="w-full h-full border border-neutral-600 shadow-sm"
                  style={{ backgroundColor: activeMaterial.swatchTone }}
                />
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Physical Archive No.</span>
                  <span>KAL-MAT-0{MATERIALS.indexOf(activeMaterial) + 1}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                  Geological Origin
                </span>
                <p className="text-sm font-medium text-white">{activeMaterial.origin}</p>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                  Embodied in Monograph
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeMaterial.associatedProjects.map((pName) => (
                    <button
                      key={pName}
                      onClick={() => handleOpenProjectByName(pName)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1C1C1C] border border-neutral-700 hover:border-white text-xs font-medium text-white transition-colors cursor-pointer"
                    >
                      <span>{pName}</span>
                      <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right col: Architectural Characteristics */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                  {activeMaterial.category}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-white">
                  {activeMaterial.name}
                </h3>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {activeMaterial.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800">
                <div className="p-4 bg-[#181818] border border-neutral-800">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                    Tactile Quality
                  </span>
                  <p className="text-xs text-neutral-200 leading-normal">
                    {activeMaterial.tactileQuality}
                  </p>
                </div>

                <div className="p-4 bg-[#181818] border border-neutral-800">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                    Thermal Performance
                  </span>
                  <p className="text-xs text-neutral-200 leading-normal">
                    {activeMaterial.thermalPerformance}
                  </p>
                </div>

                <div className="p-4 bg-[#181818] border border-neutral-800">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                    Lifecycle Carbon
                  </span>
                  <p className="text-xs text-neutral-200 leading-normal tabular-nums">
                    {activeMaterial.carbonIndex}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
