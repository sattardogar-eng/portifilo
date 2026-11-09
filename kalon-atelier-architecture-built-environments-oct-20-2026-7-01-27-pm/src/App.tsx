import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioSection } from './components/PortfolioSection';
import { ProjectModal } from './components/ProjectModal';
import { ServicesSection } from './components/ServicesSection';
import { MaterialsSection } from './components/MaterialsSection';
import { EstimatorSection } from './components/EstimatorSection';
import { ConsultationSection } from './components/ConsultationSection';
import { StudioFaq } from './components/StudioFaq';
import { Footer } from './components/Footer';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [consultationPrefill, setConsultationPrefill] = useState<{
    typology?: string;
    area?: string;
    estimatedCost?: string;
    timeline?: string;
  } | undefined>(undefined);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenConsultation = () => {
    scrollToSection('inquiry');
  };

  const handleExploreWorks = () => {
    scrollToSection('works');
  };

  const handleOpenEstimator = () => {
    scrollToSection('feasibility');
  };

  const handleSelectForEstimator = (typology: string) => {
    scrollToSection('feasibility');
  };

  const handleTransferToConsultation = (data: {
    typology: string;
    area: string;
    estimatedCost: string;
    timeline: string;
  }) => {
    setConsultationPrefill(data);
    scrollToSection('inquiry');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] selection:bg-white selection:text-black">
      {/* Strict 3-zone Top Bar Contract Navigation */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      <main>
        {/* Hero Section */}
        <Hero
          onExploreWorks={handleExploreWorks}
          onOpenEstimator={handleOpenEstimator}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Selected Architectural Works & Archive */}
        <PortfolioSection onSelectProject={(p) => setSelectedProject(p)} />

        {/* Practice Disciplines & Methodology */}
        <ServicesSection onOpenConsultation={handleOpenConsultation} />

        {/* Tactile Material Archive & Provenance */}
        <MaterialsSection onSelectProject={(p) => setSelectedProject(p)} />

        {/* Interactive Scope & Capital Feasibility Calculator */}
        <EstimatorSection
          onTransferToConsultation={handleTransferToConsultation}
        />

        {/* Studio Governance & Inquiries FAQ */}
        <StudioFaq />

        {/* Commission & Inquiry Booking Form */}
        <ConsultationSection
          prefilledData={consultationPrefill}
          onClearPrefill={() => setConsultationPrefill(undefined)}
        />
      </main>

      {/* Full Monograph Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectForEstimator={handleSelectForEstimator}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Quiet Studio Footer */}
      <Footer onOpenConsultation={handleOpenConsultation} />
    </div>
  );
}
