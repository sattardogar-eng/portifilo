import React, { useState, useMemo } from 'react';
import { Search, X, ArrowUpRight, ArrowUpDown } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS, CATEGORIES } from '../data/projectsData';

interface PortfolioSectionProps {
  onSelectProject: (project: Project) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'area' | 'alpha'>('recent');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query) ||
        p.specs.location.toLowerCase().includes(query) ||
        p.specs.structuralSystem.toLowerCase().includes(query) ||
        p.materialityNotes.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'recent') return b.specs.year - a.specs.year;
      if (sortBy === 'area') return b.specs.areaM2 - a.specs.areaM2;
      if (sortBy === 'alpha') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleReset = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('recent');
  };

  return (
    <section id="works" className="py-24 border-t border-neutral-800 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Portfolio & Archives
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white">
              Selected Architectural Works
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 leading-relaxed">
            A curated register of completed private residences, cultural institutions,
            and heritage conversions executed with structural precision.
          </p>
        </div>

        {/* Filter, Search & Sort Control Bar */}
        <div className="bg-[#121212] border border-neutral-800 p-4 sm:p-5 mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Segmented Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-medium tracking-wide uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-black shadow-xs font-semibold'
                      : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input & Sort Dropdown */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by material, city..."
                  className="w-full bg-[#181818] border border-neutral-700 pl-9 pr-8 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-white transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-neutral-400 hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-[#181818] border border-neutral-700 px-3 py-2 pr-8 text-xs text-white focus:outline-hidden focus:border-white cursor-pointer"
                  aria-label="Sort projects"
                >
                  <option value="recent">Sort: Latest</option>
                  <option value="area">Sort: Footprint (m²)</option>
                  <option value="alpha">Sort: Name (A-Z)</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-[11px] font-mono text-neutral-400">
            <span>
              Showing {filteredProjects.length} of {PROJECTS.length} built monographs
            </span>
            {(selectedCategory !== 'All' || searchQuery) && (
              <button
                onClick={handleReset}
                className="text-white hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-16 text-center bg-[#121212] border border-neutral-800">
            <p className="font-display text-xl text-white mb-2">No monographs match your criteria</p>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-6">
              Try adjusting your search terms or clearing the active category filters to view our complete portfolio.
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <article
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`group cursor-pointer bg-[#111111] border border-neutral-800 flex flex-col justify-between transition-all duration-300 hover:border-neutral-500 hover:shadow-lg ${
                  idx === 0 ? 'lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Project Image */}
                <div
                  className={`relative overflow-hidden bg-[#181818] ${
                    idx === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border border-neutral-700">
                    {project.category}
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs font-semibold tracking-wide uppercase shadow-md">
                      <span>Inspect Monograph</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Unboxed Metadata (NO PILLS) */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2 font-mono">
                      <span>{project.specs.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{project.specs.areaM2} m²</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{project.specs.year}</span>
                    </div>

                    <h3 className="font-display text-2xl text-white group-hover:text-neutral-300 transition-colors mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 mb-4">
                      {project.overview}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="font-medium text-white">
                      {project.specs.energyRating}
                    </span>
                    <span className="group-hover:translate-x-0.5 transition-transform text-white">
                      View Case Study →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
