import { MaterialItem } from '../types';

export const MATERIALS: MaterialItem[] = [
  {
    id: 'larvikite-granite',
    name: 'Flamed Larvikite Granite',
    origin: 'Vestfold Quarries, Norway',
    category: 'Lithic & Masonry',
    description: 'A feldspar-rich magmatic plutonic stone with distinctive crystalline depth. Processed with oxygen-flame torches to create a velvet, non-slip monolithic texture suitable for weather-beaten coastal facades and ground plinths.',
    tactileQuality: 'Fine-grain crystalline relief with deep charcoal mineral depth and cool thermal inertia.',
    thermalPerformance: 'Exceptional volumetric heat capacity (2.2 MJ/m³K) ideal for passive solar thermal storage.',
    carbonIndex: '42 kg CO₂e/tonne (Quarried and water-cut locally with hydro-electric grid power).',
    associatedProjects: ['Villa Kysten', 'Lofoten Artist Monolith'],
    swatchTone: '#1A1A1A'
  },
  {
    id: 'charred-larch',
    name: 'Shou Sugi Ban Alpine Larch',
    origin: 'Valais Forest Reserves, Switzerland',
    category: 'Timber & Biomaterials',
    description: 'High-altitude European larch surface-carbonized by controlled open pyrolytic firing. The natural carbonized shell protects the underlying timber from insects, mold, and UV breakdown without petrochemical biocides, weathering to a silvery graphite over fifty years.',
    tactileQuality: 'Alligator-skin textured carbon crust with deep light absorption and natural resin scent.',
    thermalPerformance: 'Thermal conductivity λ = 0.11 W/(m·K), providing superior exterior insulation continuity.',
    carbonIndex: '-780 kg CO₂e/m³ net sequestered atmospheric carbon across 60-year harvest cycles.',
    associatedProjects: ['Engadin Alpine Atelier'],
    swatchTone: '#0A0A0A'
  },
  {
    id: 'rammed-earth',
    name: 'Hydraulic Compacted Basalt Loam',
    origin: 'On-site excavation, Southern Iceland',
    category: 'Mineral & Geotechnical',
    description: 'Engineered sub-soil mixture of volcanic loam, crushed basalt gravel, and natural pozzolanic binder compacted in 150mm pneumatic lifts inside steel formwork. Offers 100% recyclability at lifecycle conclusion with zero embodied chemical footprint.',
    tactileQuality: 'Horizontal geological striations showing natural stratigraphic layering, subtle ash-gray undertones.',
    thermalPerformance: 'Phase-shift thermal lag of 11.4 hours, dampening diurnal temperature swings in harsh climates.',
    carbonIndex: '18 kg CO₂e/m³ (Direct on-site material extraction, zero transport haulage emissions).',
    associatedProjects: ['Skaftafell Earth Pavilion'],
    swatchTone: '#3A3A3A'
  },
  {
    id: 'patinated-bronze',
    name: 'Cold-Patinated Architectural Bronze',
    origin: 'Historic Foundry, Zurich, Switzerland',
    category: 'Metallurgy & Hardware',
    description: 'Non-ferrous copper-zinc architectural alloy chemically pre-aged with natural sulfur solutions and hand-buffed with microcrystalline wax. Forms an evolving self-healing patina when touched by human hands over generations.',
    tactileQuality: 'Silky metallic hand with subtle graphite undertones shifting under raking light.',
    thermalPerformance: 'High dimensional stability under extreme freeze-thaw cycles without embrittlement.',
    carbonIndex: '100% infinitely recyclable without mechanical degradation; fabricated from 85% post-consumer scrap.',
    associatedProjects: ['Spinnerei Sanctuary Loft'],
    swatchTone: '#262626'
  },
  {
    id: 'lime-plaster',
    name: 'Hygroscopic Slaked Lime Plaster',
    origin: 'Gotland, Sweden',
    category: 'Finish Plasters & Mineral Coatings',
    description: 'A traditional non-hydraulic calcium hydroxide matrix slaked for twenty-four months and blended with crushed Nordic marble powder. Breathes with the surrounding atmosphere, naturally absorbing ambient carbon dioxide as it cures into solid limestone over its lifetime.',
    tactileQuality: 'Velvety stark white stippled texture that diffuses raking light softly across curved surfaces.',
    thermalPerformance: 'Vapor-permeable (μ = 6) preventing interior condensation and eliminating fungal growth naturally.',
    carbonIndex: 'Net carbon neutral during recarbonation; zero volatile organic compounds (VOCs).',
    associatedProjects: ['Lofoten Artist Monolith', 'Villa Kysten'],
    swatchTone: '#F5F5F5'
  }
];
