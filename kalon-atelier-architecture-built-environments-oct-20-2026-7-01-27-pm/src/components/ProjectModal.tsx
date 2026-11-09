import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sun, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectForEstimator: (typology: string) => void;
  onOpenConsultation: () => void;
}

type TimeOfDay = 'morning' | 'noon' | 'golden' | 'dusk';

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectForEstimator,
  onOpenConsultation,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [simulatedTime, setSimulatedTime] = useState<TimeOfDay>('golden');

  useEffect(() => {
    setActiveImageIndex(0);
    setSimulatedTime('golden');
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (project && project.galleryImages.length > 1) {
        if (e.key === 'ArrowLeft') {
          setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : project.galleryImages.length - 1));
        }
        if (e.key === 'ArrowRight') {
          setActiveImageIndex((prev) => (prev < project.galleryImages.length - 1 ? prev + 1 : 0));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const currentImage = project.galleryImages[activeImageIndex] || project.coverImage;

  // Sun simulation overlay filters for monochrome architectural study
  const daylightAtmospheres = {
    morning: {
      label: '07:30 Morning Rake',
      description: 'Low-angle eastward solar penetration delivering warm cool-toned raking shadows.',
      overlayClass: 'bg-amber-100/10 mix-blend-screen',
      brightness: 'contrast-[1.05] brightness-[1.02]',
    },
    noon: {
      label: '12:00 High Solstice',
      description: 'Vertical zenith illumination moderated by deep exterior cantilevered soffits.',
      overlayClass: 'bg-sky-100/10 mix-blend-overlay',
      brightness: 'contrast-[1.08] brightness-[1.06]',
    },
    golden: {
      label: '17:45 Golden Hour',
      description: 'Long horizontal amber rays illuminating natural timber and stone textures.',
      overlayClass: 'bg-amber-500/15 mix-blend-color-burn',
      brightness: 'contrast-[1.02] saturate-[1.1]',
    },
    dusk: {
      label: '21:30 Nordic Twilight',
      description: 'Soft indigo atmospheric light balanced with calibrated interior 2700K illumination.',
      overlayClass: 'bg-indigo-950/25 mix-blend-multiply',
      brightness: 'brightness-[0.92] contrast-[1.1]',
    },
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev < project.galleryImages.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : project.galleryImages.length - 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-[#111111] border border-neutral-800 shadow-2xl my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#161616]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Monograph Archive
            </span>
            <span className="text-xs text-neutral-600">/</span>
            <span className="text-xs font-medium text-white">{project.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="max-h-[82vh] overflow-y-auto">
          {/* Main Visual Showcase with Gallery & Daylight Simulator */}
          <div className="relative bg-black aspect-[16/10] sm:aspect-[16/9] overflow-hidden group">
            <img
              src={currentImage}
              alt={`${project.title} - view ${activeImageIndex + 1}`}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-all duration-500 ${daylightAtmospheres[simulatedTime].brightness}`}
            />

            {/* Simulated Daylight Overlay */}
            <div
              className={`absolute inset-0 pointer-events-none transition-all duration-700 ${daylightAtmospheres[simulatedTime].overlayClass}`}
            />

            {/* Gallery Navigation Controls */}
            {project.galleryImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-black text-white border border-neutral-700 backdrop-blur-sm transition-colors cursor-pointer"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-black text-white border border-neutral-700 backdrop-blur-sm transition-colors cursor-pointer"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-sm border border-neutral-700 text-[11px] font-mono text-neutral-300">
                  Plate {activeImageIndex + 1} of {project.galleryImages.length}
                </div>
              </>
            )}

            {/* Interactive Daylight Simulator Switcher */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-black/90 backdrop-blur-md p-2.5 border border-neutral-700 text-white max-w-md">
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-300">
                  <Sun className="w-3.5 h-3.5 text-[#E6C687]" />
                  <span>Solar Path Simulation</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1 text-[11px]">
                {(['morning', 'noon', 'golden', 'dusk'] as TimeOfDay[]).map((time) => (
                  <button
                    key={time}
                    onClick={() => setSimulatedTime(time)}
                    className={`px-2 py-1 transition-colors cursor-pointer text-center capitalize ${
                      simulatedTime === time
                        ? 'bg-white text-black font-semibold'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-neutral-400 mt-1.5 leading-tight hidden sm:block">
                {daylightAtmospheres[simulatedTime].description}
              </p>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {project.galleryImages.length > 1 && (
            <div className="flex items-center gap-2 p-3 bg-[#141414] border-b border-neutral-800 overflow-x-auto">
              {project.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 shrink-0 overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-white' : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Case Study Core Body */}
          <div className="p-6 sm:p-10 space-y-10">
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                <span>{project.specs.location}</span>
                <span aria-hidden="true">·</span>
                <span>Completed {project.specs.year}</span>
                <span aria-hidden="true">·</span>
                <span>{project.specs.areaM2} m² Gross Area</span>
              </div>
              <h2 id="modal-title" className="font-display text-3xl sm:text-4xl text-white mb-2">
                {project.title}
              </h2>
              <p className="text-lg text-neutral-400 font-light italic">
                {project.subtitle}
              </p>
            </div>

            {/* Narrative Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-neutral-300 leading-relaxed">
              <div>
                <h3 className="font-display text-lg text-white mb-2">
                  Architectural Intent & Spatial Order
                </h3>
                <p className="mb-4">{project.overview}</p>
                <p>{project.architecturalConcept}</p>
              </div>

              <div>
                <h3 className="font-display text-lg text-white mb-2">
                  Materiality & Environmental Strategy
                </h3>
                <p className="mb-4">{project.materialityNotes}</p>
                <div className="p-4 bg-[#181818] border border-neutral-800 space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Solar & Orientation Diagnostic
                  </div>
                  <p className="text-xs text-neutral-300 leading-normal">
                    {project.solarOrientation}
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Specifications Matrix */}
            <div className="pt-6 border-t border-neutral-800">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                Technical Specifications & Performance Metrics
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3.5 bg-[#181818] border border-neutral-800">
                  <span className="text-neutral-400 block mb-1">Structural System</span>
                  <span className="font-medium text-white">{project.specs.structuralSystem}</span>
                </div>
                <div className="p-3.5 bg-[#181818] border border-neutral-800">
                  <span className="text-neutral-400 block mb-1">Carbon Benchmark</span>
                  <span className="font-medium text-white tabular-nums">{project.specs.carbonScore}</span>
                </div>
                <div className="p-3.5 bg-[#181818] border border-neutral-800">
                  <span className="text-neutral-400 block mb-1">Energy Standard</span>
                  <span className="font-medium text-white">{project.specs.energyRating}</span>
                </div>
                <div className="p-3.5 bg-[#181818] border border-neutral-800">
                  <span className="text-neutral-400 block mb-1">Peer Recognition</span>
                  <span className="font-medium text-white">{project.specs.awards || 'Documented in Kalon Monograph'}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-400">
                Interested in commissioning a project with similar site conditions or spatial volume?
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    onClose();
                    onSelectForEstimator(project.specs.typology);
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white border border-neutral-600 hover:border-white transition-colors cursor-pointer text-center"
                >
                  Estimate This Typology
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenConsultation();
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  <span>Request Atelier Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
