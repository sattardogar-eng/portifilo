export type ProjectCategory = 'All' | 'Residential' | 'Cultural & Civic' | 'Adaptive Reuse' | 'Coastal & Alpine';

export interface ProjectSpec {
  location: string;
  year: number;
  areaM2: number;
  typology: string;
  structuralSystem: string;
  carbonScore: string;
  energyRating: string;
  awards?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  coverImage: string;
  galleryImages: string[];
  specs: ProjectSpec;
  overview: string;
  architecturalConcept: string;
  materialityNotes: string;
  solarOrientation: string;
  featured: boolean;
}

export interface MaterialItem {
  id: string;
  name: string;
  origin: string;
  category: string;
  description: string;
  tactileQuality: string;
  thermalPerformance: string;
  carbonIndex: string;
  associatedProjects: string[];
  swatchTone: string;
}

export interface EstimationConfig {
  typology: 'residential_villa' | 'adaptive_reuse' | 'cultural_pavilion';
  areaM2: number;
  unit: 'm2' | 'sqft';
  standard: 'high_performance' | 'swiss_minergie' | 'zero_passive';
  topography: 'flat_infill' | 'coastal_rock' | 'alpine_slope';
  interiorFinish: 'signature' | 'monolithic_bespoke' | 'heritage_museum';
}

export interface EstimationResult {
  baseConstructionCost: number;
  joineryInteriorCost: number;
  architecturalFee: number;
  contingencyPermits: number;
  totalEstimatedInvestment: number;
  estimatedTimelineMonths: number;
  currency: 'EUR' | 'CHF' | 'USD';
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  siteLocation: string;
  projectTypology: string;
  budgetRange: string;
  timeline: string;
  projectBrief: string;
}
