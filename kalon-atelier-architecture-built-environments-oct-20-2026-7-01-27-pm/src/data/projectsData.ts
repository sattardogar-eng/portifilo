import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'villa-kysten',
    title: 'Villa Kysten',
    subtitle: 'Coastal Monolith on the North Sea Granite Skerries',
    category: 'Residential',
    coverImage: '/src/assets/images/hero_kalon_architecture_1792324689206.jpg',
    galleryImages: [
      '/src/assets/images/hero_kalon_architecture_1792324689206.jpg',
      '/src/assets/images/project_seaside_atelier_1792324689812.jpg',
      '/src/assets/images/project_loft_sanctuary_1792324689545.jpg'
    ],
    specs: {
      location: 'Bergen Archipelago, Norway',
      year: 2025,
      areaM2: 480,
      typology: 'Private Residence & Atelier',
      structuralSystem: 'Split-level basalt masonry plinth with glue-laminated timber superstructure',
      carbonScore: '184 kg CO₂e/m² (A+ lifecycle rating)',
      energyRating: 'Certified Passive House Plus (14 kWh/m²/a)',
      awards: 'Nordic Architectural Excellence Citation 2025'
    },
    overview: 'Anchored directly into an exposed granite outcropping on the western Norwegian seaboard, Villa Kysten responds to extreme maritime Atlantic conditions through dual structural layers: an impenetrable stone plinth and a timber volume with floor-to-ceiling triple glazing.',
    architecturalConcept: 'The spatial choreography unfolds from a protected, landward courtyard into soaring panoramic living zones suspended over the tidal shelf. Deep roof cantilevers provide natural passive solar shading during summer solstices while welcoming low winter sunlight deep into the polished concrete floors.',
    materialityNotes: 'Locally quarried Larvikite granite, untreated Douglas fir interior panelling, raw burnished brass hardware, and triple-laminated vacuum glass assemblies rated to withstand 180 km/h ocean gales.',
    solarOrientation: 'South-Southwest orientation optimizing thermal capture across the low Scandinavian solar arc.',
    featured: true
  },
  {
    id: 'skaftafell-pavilion',
    title: 'Skaftafell Earth Pavilion',
    subtitle: 'Civic Reflection Center & Arctic Botanical Gallery',
    category: 'Cultural & Civic',
    coverImage: '/src/assets/images/project_nordic_pavilion_1792324689218.jpg',
    galleryImages: [
      '/src/assets/images/project_nordic_pavilion_1792324689218.jpg',
      '/src/assets/images/hero_kalon_architecture_1792324689206.jpg',
      '/src/assets/images/project_seaside_atelier_1792324689812.jpg'
    ],
    specs: {
      location: 'Skaftafell Plain, Southern Iceland',
      year: 2024,
      areaM2: 720,
      typology: 'Public Exhibition Pavilion & Research Station',
      structuralSystem: 'Hydraulically compacted volcanic basalt earth walls with weathered steel framing',
      carbonScore: '98 kg CO₂e/m² (Sub-zero net carbon)',
      energyRating: 'Geothermal Hydronic Radiant Mass (Zero Grid Draw)',
      awards: 'European Sustainable Building Laureate 2024'
    },
    overview: 'Commissioned as an architectural sanctuary along the glacial wash plains of Skaftafell, this pavilion explores the boundary between geological sedimentation and human shelter, using 100% on-site volcanic soil and basalt gravel.',
    architecturalConcept: 'Rammed earth monolithic pylons form a sequential procession of quiet galleries surrounding an open reflecting pool. Overhead, calibrated steel louvers modulate natural daylight to prevent UV degradation of delicate botanical specimens while inviting shifting shadow geometries across the polished screed floor.',
    materialityNotes: 'Compressed volcanic loam, flamed basalt aggregate, blackened low-carbon structural steel, and reclaimed timber soffits from decommissioned Nordic slipways.',
    solarOrientation: 'True North-South axial alignment creating a sundial reflection along the central pool during equinoxes.',
    featured: true
  },
  {
    id: 'engadin-alpine-atelier',
    title: 'Engadin Alpine Atelier',
    subtitle: 'High-Altitude Residence in the Bernina Foothills',
    category: 'Coastal & Alpine',
    coverImage: '/src/assets/images/project_alpine_residence_1792324690313.jpg',
    galleryImages: [
      '/src/assets/images/project_alpine_residence_1792324690313.jpg',
      '/src/assets/images/project_loft_sanctuary_1792324689545.jpg',
      '/src/assets/images/hero_kalon_architecture_1792324689206.jpg'
    ],
    specs: {
      location: 'St. Moritz Valley, Graubünden, Switzerland',
      year: 2026,
      areaM2: 390,
      typology: 'Mountain Residence & Study',
      structuralSystem: 'Cross-laminated Swiss pine structure with charred larch rainscreen facade',
      carbonScore: '142 kg CO₂e/m² (Timber sequestration positive)',
      energyRating: 'Swiss Minergie-P-Eco Standard',
      awards: 'Swiss Timber Innovation Nominee'
    },
    overview: 'Built at 1,780 meters altitude on a 32-degree alpine incline, this residence reinterprets the traditional Engadin farmhouse through contemporary mass timber engineering and radical thermal insulation.',
    architecturalConcept: 'The house is stepped into the mountainside across three cascading plateaus. An upper cantilevered glass terrace extends past the canopy of golden larch trees, framing views of the valley while sheltering the lower entrance terrace from heavy alpine snowfall.',
    materialityNotes: 'Charred Yakisugi-treated alpine larch, local Andeer green granite masonry, solid Swiss stone pine joinery with natural scent retention, and quadruple-glazed thermal facade systems.',
    solarOrientation: 'Southeast alpine orientation capturing direct alpine sunlight for passive solar heating from 08:30 to 16:00.',
    featured: true
  },
  {
    id: 'spinnerei-loft',
    title: 'Spinnerei Sanctuary Loft',
    subtitle: 'Adaptive Historic Conversion of an 1894 Cotton Mill',
    category: 'Adaptive Reuse',
    coverImage: '/src/assets/images/project_loft_sanctuary_1792324689545.jpg',
    galleryImages: [
      '/src/assets/images/project_loft_sanctuary_1792324689545.jpg',
      '/src/assets/images/project_nordic_pavilion_1792324689218.jpg',
      '/src/assets/images/project_alpine_residence_1792324690313.jpg'
    ],
    specs: {
      location: 'Zurich West, Switzerland',
      year: 2025,
      areaM2: 310,
      typology: 'Historic Industrial Conversion & Private Gallery',
      structuralSystem: 'Original clay brick bearing masonry with suspended cold-rolled steel and bronze staircase',
      carbonScore: '64 kg CO₂e/m² (78% embodied carbon avoided via preservation)',
      energyRating: 'Heritage Class B Energy Performance Retrofit',
      awards: 'Zurich Urban Preservation Award 2025'
    },
    overview: 'A deep architectural intervention transforming a cavernous industrial relic into a warm, contemplative two-level residence. The design preserves the raw authenticity of century-old brickwork while inserting refined sculptural metalwork and wide-plank oak flooring.',
    architecturalConcept: 'The central intervention is a self-supporting helical staircase hand-beaten from patinated architectural bronze. This organic metal gesture bridges the expansive double-height ground salon with a private mezzanine library and master suite under exposed Douglas fir roof trusses.',
    materialityNotes: 'Original 19th-century clay clinker brickwork, cold-patinated architectural bronze, 300mm wide Danish oak floorboards, micro-perforated acoustic plaster ceilings.',
    solarOrientation: 'North-facing industrial sawtooth monitors delivering shadowless, diffused daylight ideal for the client’s contemporary art collection.',
    featured: true
  },
  {
    id: 'lofoten-monolith',
    title: 'Lofoten Artist Monolith',
    subtitle: 'Curvilinear Sculptor Studio on the Arctic Fjord Edge',
    category: 'Coastal & Alpine',
    coverImage: '/src/assets/images/project_seaside_atelier_1792324689812.jpg',
    galleryImages: [
      '/src/assets/images/project_seaside_atelier_1792324689812.jpg',
      '/src/assets/images/hero_kalon_architecture_1792324689206.jpg',
      '/src/assets/images/project_nordic_pavilion_1792324689218.jpg'
    ],
    specs: {
      location: 'Reine, Lofoten Islands, Norway',
      year: 2024,
      areaM2: 185,
      typology: 'Sculpture Studio & Residence',
      structuralSystem: 'Curved aerated autoclaved masonry with natural slaked lime plaster and basalt stone apron',
      carbonScore: '110 kg CO₂e/m²',
      energyRating: 'Stand-alone Microgrid (Tidal & Vertical Wind Generation)',
      awards: 'Architectural Review House of the Year Shortlist'
    },
    overview: 'Positioned on a narrow rocky promontory where the Atlantic swells meet sheer granite peaks, this compact retreat was shaped aerodynamically to minimize wind vortex pressure during Arctic winter storms.',
    architecturalConcept: 'A continuous sculpted envelope of breathable off-white lime plaster wraps the studio like a wind-sculpted snowdrift. An expansive curved glass facade faces the midnight sun, providing uninterrupted sightlines to the open sea and coastal mountain spires.',
    materialityNotes: 'Hydraulic lime plaster with crushed quartz aggregate, charcoal slate paving slabs, thermo-treated ash decking, and marine-grade stainless tension rods.',
    solarOrientation: 'East-Northeast orientation optimized to capture the surreal horizontal illumination of the arctic midnight sun.',
    featured: false
  }
];

export const CATEGORIES: Project['category'][] = [
  'All',
  'Residential',
  'Cultural & Civic',
  'Adaptive Reuse',
  'Coastal & Alpine'
];
