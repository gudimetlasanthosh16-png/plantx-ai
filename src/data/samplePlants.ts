import type { PlantAnalysisResult } from '../services/api';

export interface SamplePlant {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  status: 'Healthy' | 'Warning' | 'Critical';
  diseaseName: string;
  imageUrl: string;
  presetData: PlantAnalysisResult;
}

export const SAMPLE_PLANTS: SamplePlant[] = [
  {
    id: 'tomato-early-blight',
    name: 'Tomato (Solanum lycopersicum)',
    subtitle: 'Solanaceae Family • Vegetable Crop',
    category: 'Vegetables',
    status: 'Warning',
    diseaseName: 'Early Blight (Alternaria solani)',
    imageUrl: '/images/tomato_plant.jpg',
    presetData: {
      plant_name: 'Tomato Plant',
      scientific_name: 'Solanum lycopersicum',
      health: 'Warning',
      disease: 'Early Blight (Alternaria solani)',
      confidence: 96,
      severity: 'Medium',
      description: 'Concentric dark brown rings with target-like patterns surrounded by chlorotic yellow halos on lower foliage, indicating early fungal sporulation grounded in visible leaf evidence.',
      visual_forensic_cues: [
        'Concentric "bullseye" rings measuring 4-8mm across lower leaf lamina',
        'Distinct 1.5mm chlorotic yellow halo framing each necrotic lesion',
        'Early margin necrosis on secondary lateral veins',
        'Intact main central midrib with zero vascular browning'
      ],
      symptoms: [
        'Concentric brown circular spots on older leaves',
        'Yellow chlorotic halos framing the lesions',
        'Gradual premature leaf drop and lower stem lesions',
        'Stunted fruiting capacity if left untreated'
      ],
      cause: 'Alternaria solani fungal spores spread by warm humid weather, splashing rain droplets, and dense foliage.',
      detailed_reasoning: 'Alternaria solani survives in infected crop debris. During prolonged wet periods with temperatures between 24-29°C, conidia germinate rapidly within 2 hours. Spores penetrate stomata and leaf epidermis directly, producing alternaric acid which causes cellular necrosis.',
      cooling_tips: [
        'Apply 3 inches of clean organic straw mulch to keep root zone soil 5°C cooler and prevent splashback',
        'Deploy 30% - 40% agricultural shade cloth when ambient temperature exceeds 32°C (90°F) to stop transpiration scorch',
        'Irrigate deeply at root base between 5:30 AM – 7:00 AM; never irrigate foliage during hot midday hours',
        'Ensure 24-inch inter-plant spacing to maximize cooling breeze flow through bottom canopy'
      ],
      favorable_weather: '24°C - 29°C (75°F - 84°F) with prolonged leaf wetness and >80% relative humidity',
      treatment_timeline: {
        day_1: 'Sterilize pruners with 70% alcohol; prune off lower 10 inches of infected leaves; burn or bag debris.',
        day_3_5: 'Apply Copper Octanoate or cold-pressed Neem Oil (5ml/L) at 6:00 PM dusk; refresh base straw mulch.',
        day_7_14: 'Inspect upper growth flush for ring lesions; repeat bio-spray if relative humidity stays above 75%.'
      },
      prevention: [
        'Apply 2-3 inches of clean organic straw mulch around plant base to stop soil splashback',
        'Maintain drip irrigation or soaker hoses; avoid overhead sprinkler watering',
        'Prune lower foliage 12 inches off the ground to improve ambient airflow',
        'Rotate Solanaceous crops on a 3-year minimum cycle'
      ],
      organic_treatment: [
        'Spray Cold-Pressed Neem Oil (5ml/L water + mild eco-soap) every 7 days',
        'Apply biological fungicide containing Bacillus amyloliquefaciens or Trichoderma viride',
        'Copper Octanoate (Copper Soap) spray during early symptom onset'
      ],
      chemical_treatment: [
        'Chlorothalonil 75% WP (2g/L water) as protective barrier spray',
        'Mancozeb 75% WP (2.5g/L) rotated with Difenoconazole 25% EC (0.5ml/L)',
        'Azoxystrobin 23% SC for translaminar systemic action'
      ],
      water: '1.5 inches per week. Irrigate exclusively at root zone in early mornings.',
      sunlight: 'Full direct sunlight (minimum 7-8 hours daily).',
      fertilizer: 'Balanced 5-10-10 or potassium-boosted organic tomato feed. Avoid excess nitrogen.',
      recovery_time: '10 to 14 days with infected leaf removal and fungicide application.',
      yield_loss_risk: '35% – 50% harvest yield loss within 10 days if uncontained',
      harvest_waiting_period: 'Wait 7 days after Copper/Chlorothalonil spray before harvest (Pre-Harvest Interval: 7 days)',
      transmission_mode: 'Airborne conidiospores propelled by wind currents and splashing irrigation/rain water',
      quarantine_radius: 'Maintain minimum 4 - 6 meters buffer from clean Solanaceae beds',
      vulnerable_crops: ['Potatoes', 'Eggplants (Brinjals)', 'Bell Peppers', 'Chili Peppers'],
      soil_deficiency: 'Nitrogen deficiency with early potassium chlorosis along lower foliage edges',
      soil_ph_recommendation: 'Optimal soil pH 6.0 – 6.8; amend with vermicompost & calcium nitrate to prevent blossom end rot',
      growth_stage: 'Mid-Vegetative to Early Flowering Stage',
      pollinator_safety: 'Bee-safe when applied during sundown/dusk; avoid daytime spraying during active bee foraging',
      spray_timing_window: '5:30 PM – 7:30 PM (Requires minimum 3 hours dry time before precipitation)',
      photosynthetic_vigor: 68
    }
  },
  {
    id: 'mango-anthracnose',
    name: 'Mango Tree (Mangifera indica)',
    subtitle: 'Anacardiaceae Family • Fruit Orchard',
    category: 'Fruit Trees',
    status: 'Critical',
    diseaseName: 'Anthracnose (Colletotrichum gloeosporioides)',
    imageUrl: '/images/mango_tree.jpg',
    presetData: {
      plant_name: 'Mango Tree',
      scientific_name: 'Mangifera indica',
      health: 'Critical',
      disease: 'Anthracnose (Colletotrichum gloeosporioides)',
      confidence: 94,
      severity: 'High',
      description: 'Irregular dark brown to black necrotic lesions with shot-hole tears on emerging flush leaves and panicles, characteristic of Colletotrichum pathogen observable directly in specimen photo.',
      visual_forensic_cues: [
        'Dark angular black necrotic patches coalescing along leaf margins',
        'Shot-hole perforation tears where dead tissue has detached',
        'Tender apical flush curling and petiole blighting',
        'Distinct boundary between necrotic black spots and olive-green active leaf blade'
      ],
      symptoms: [
        'Dark angular black lesions coalescing along leaf margins',
        'Blight and wither of tender vegetative flushes and blossom panicles',
        'Leaf crinkling and leaf blade perforation (shot-hole appearance)',
        'Tear-drop stains on immature fruit'
      ],
      cause: 'Colletotrichum gloeosporioides fungal infection accelerated by unseasonal rains, dew, and high humidity (>90%).',
      detailed_reasoning: 'The fungus overwinters in previous season twig cankers. Rain splashes disperse conidia to fresh tender flushes. Appressoria penetrate leaf cuticles directly, followed by biotrophic hyphal colonization and rapid necrotrophic tissue lysis.',
      cooling_tips: [
        'Paint tree trunk with white agricultural lime wash (whitewash) up to 1 meter to reflect solar radiation and lower cambium heat',
        'Top-dress root basin with 4-5 inches of dry leaf/bagasse mulch to buffer ground soil temperatures during heatwaves',
        'Perform light canopy water misting in early morning hours to clean airborne spores and cool ambient microclimate',
        'Prune cross-branches to create internal chimney airflow channels that cool tree center'
      ],
      favorable_weather: '26°C - 32°C (79°F - 90°F) accompanied by morning fog, dew, and sustained humidity >88%',
      treatment_timeline: {
        day_1: 'Perform sanitary pruning of all blighted panicles and blackened twigs; remove fallen mummified debris from basin.',
        day_3_5: 'Foliar spray of Bordeaux mixture (1%) or Copper Oxychloride (3g/L) strictly at 6:30 PM sundown.',
        day_7_14: 'Monitor emerging flower buds; apply systemic fungicide (Tebuconazole 0.5g/L) if wet drizzle persists.'
      },
      prevention: [
        'Post-harvest sanitary canopy pruning to optimize sunlight penetration and wind circulation',
        'Collect and burn all fallen twigs, desiccated leaves, and mummified fruits',
        'Apply Bordeaux mixture (1%) immediately prior to flowering and post-monsoon'
      ],
      organic_treatment: [
        'Foliar spray of Panchagavya (30ml/L) + Pseudomonas fluorescens (5g/L) bio-inoculant',
        'Wettable Sulphur 80% WDG (2.5g/L) applied during non-flowering dormant stage',
        'Neem seed kernel extract (NSKE 5%) spray'
      ],
      chemical_treatment: [
        'Copper Oxychloride 50% WP (3g/L) as broad-spectrum prophylactic spray',
        'Carbendazim 50% WP (1g/L) or Tebuconazole + Trifloxystrobin (0.5g/L)',
        'Prochloraz 45% EC (1ml/L) during blossom bud burst'
      ],
      water: 'Deep ring-basin irrigation every 10-15 days during fruit set. Cease watering during flower induction.',
      sunlight: 'Unobstructed full sun (8+ hours daily).',
      fertilizer: 'Apply 1000g N, 500g P2O5, and 1000g K2O per mature bearing tree annually along with 50kg farmyard manure.',
      recovery_time: '3 to 4 weeks for new flush foliage emergence after systematic pruning and fungicide cycle.',
      yield_loss_risk: '60% – 85% blossom and immature fruit set loss in current season if untreated',
      harvest_waiting_period: 'Pre-Harvest Interval (PHI): 14 days post systemic fungicide spray',
      transmission_mode: 'Rain-splash dispersal of Colletotrichum spores from twig cankers & mummified panicles',
      quarantine_radius: 'Establish 10 - 15 meter protective barrier zone around adjacent orchard blocks',
      vulnerable_crops: ['Papaya', 'Avocado', 'Citrus Orchards', 'Cashew Trees'],
      soil_deficiency: 'Zinc and Boron micronutrient deficiency; low soil organic carbon in root basin',
      soil_ph_recommendation: 'Optimal soil pH 5.5 – 7.5; top-dress with 50kg farmyard manure and 1kg agricultural gypsum',
      growth_stage: 'Blossom Panicle Emergence & Vegetative Flush Stage',
      pollinator_safety: 'Critical Honeybee Hazard: Mango pollinators (Apis cerana) active 8 AM - 4 PM. Spray strictly at dusk.',
      spray_timing_window: '6:00 PM – 8:00 PM (Requires 4 hours rainfast drying on glossy foliage)',
      photosynthetic_vigor: 52
    }
  },
  {
    id: 'lemon-citrus-canker',
    name: 'Citrus / Lemon (Citrus limon)',
    subtitle: 'Rutaceae Family • Citrus Fruit',
    category: 'Citrus',
    status: 'Warning',
    diseaseName: 'Citrus Canker (Xanthomonas citri)',
    imageUrl: '/images/lemon_tree.jpg',
    presetData: {
      plant_name: 'Lemon Tree',
      scientific_name: 'Citrus limon',
      health: 'Warning',
      disease: 'Citrus Canker (Xanthomonas axonopodis pv. citri)',
      confidence: 97,
      severity: 'Medium',
      description: 'Raised, corky, crater-like lesions with characteristic oily water-soaked margins and bright yellow halos on both leaf surfaces observed in real-time specimen scan.',
      visual_forensic_cues: [
        'Erupted, corky brown pustules with rough crater centers',
        'Clear translucent oily margin surrounding pustules on leaf underside',
        'Distinctive luminous yellow halo framing each lesion',
        'Absence of systemic vascular stem wilt'
      ],
      symptoms: [
        'Raised corky brownish pustules with oily translucent margins',
        'Distinctive bright yellow halo encircling each lesion',
        'Premature defoliation and twig dieback in severe outbreaks',
        'Lesions visible symmetrically on both upper and lower leaf surfaces'
      ],
      cause: 'Xanthomonas axonopodis bacterium propelled by wind-driven rain, leafminer wound entry, and contaminated pruning tools.',
      detailed_reasoning: 'Bacterial cells enter through natural stomata or micro-wounds created by Asian citrus leafminers. Once inside the spongy mesophyll, bacterial virulence proteins induce hyperplastic cell division, resulting in raised, erumpent corky pustules.',
      cooling_tips: [
        'Mulch basin with 3-4 inches of wood chips to insulate roots from scorching ground heat',
        'Install perimeter windbreak hedges (Casuarina or neem) to block abrasive hot dry winds and storm-driven rain',
        'Schedule drip irrigation in early morning to avoid thermal shock to roots from cold water during hot afternoons',
        'Apply kaolin particle film spray (30g/L) during high heat waves to reflect excess infrared radiation and reduce canopy stress'
      ],
      favorable_weather: '28°C - 35°C (82°F - 95°F) combined with strong wind currents and tropical storm moisture',
      treatment_timeline: {
        day_1: 'Prune infected twigs 2 inches below visible cankers using sanitized bypass shears; bag and discard clippings.',
        day_3_5: 'Spray Copper Hydroxide (1.5g/L) mixed with Streptocycline (1g/10L) at late twilight.',
        day_7_14: 'Monitor new vegetative flush for Asian leafminer larvae trails; spray neem oil if trails appear.'
      },
      prevention: [
        'Erect windbreak hedges (Casuarina or bamboo) around the orchard to reduce wind-driven rain spread',
        'Strictly sterilize secateurs and pruning shears with 70% isopropyl alcohol between trees',
        'Control citrus leafminer larvae using targeted neem or spinosad sprays before flush expansion'
      ],
      organic_treatment: [
        'Copper Hydroxide 53.8% DF (1.5g/L water) spray schedule',
        'Bio-formulation of Bacillus subtilis strain QST 713 foliar application',
        'Neem cake soil enrichment (2kg per tree) to enhance systemic plant resistance'
      ],
      chemical_treatment: [
        'Streptocycline (Streptomycin sulphate 90% + Tetracycline 10%) at 100 ppm (1g/10L) combined with Copper Oxychloride (2.5g/L)',
        'Copper Sulphate + Hydrated Lime (Bordeaux mixture 0.8%)'
      ],
      water: 'Moderate watering. Keep upper 2 inches of soil slightly dry between watering to reduce soil pathogen load.',
      sunlight: 'Full sun (6-8 hours daily).',
      fertilizer: 'Citrus-specific micro-nutrient mix containing Chelated Zinc, Iron, and Magnesium alongside 8-3-9 NPK.',
      recovery_time: '2 to 3 weeks to halt lesion advancement; pruned shoots regenerate within 40 days.',
      yield_loss_risk: '25% – 40% marketable fruit downgrade and premature fruit drop',
      harvest_waiting_period: 'Safe harvest window: 5 days for copper hydroxide spray',
      transmission_mode: 'Wind-driven rainstorms and mechanical transmission via citrus leafminers & pruning tools',
      quarantine_radius: 'Buffer perimeter of 8 - 12 meters; isolate infected tree row with windbreaks',
      vulnerable_crops: ['Limes', 'Grapefruit', 'Sweet Oranges', 'Mandarin Tangerines'],
      soil_deficiency: 'Magnesium deficiency (interveinal chlorosis) and iron chlorosis in high pH soils',
      soil_ph_recommendation: 'Optimal soil pH 6.0 – 7.0; apply chelated iron foliar spray and sulfur if pH exceeds 7.5',
      growth_stage: 'Active Flush & Early Fruit Setting Stage',
      pollinator_safety: 'Bactericides (copper/streptocycline) have low direct bee toxicity; spray at late twilight',
      spray_timing_window: '5:00 PM – 7:00 PM (2.5 hours rainfast drying required)',
      photosynthetic_vigor: 74
    }
  },
  {
    id: 'monstera-healthy',
    name: 'Monstera Deliciosa',
    subtitle: 'Araceae Family • Indoor & Tropical Foliage',
    category: 'Houseplants',
    status: 'Healthy',
    diseaseName: 'None (Optimal Botanical Vigor)',
    imageUrl: '/images/monstera_plant.jpg',
    presetData: {
      plant_name: 'Monstera Deliciosa',
      scientific_name: 'Monstera deliciosa',
      health: 'Healthy',
      disease: 'None',
      confidence: 99,
      severity: 'None',
      description: 'Exceptional foliage vitality observed in real-time scan. Broad glossy green fenestrated leaves with intact cellular turgor, vibrant cuticle sheen, and zero pathogen or pest infestation.',
      visual_forensic_cues: [
        'Deep vibrant emerald green coloration across all leaf lobes',
        'Clean, distinct leaf fenestrations (natural splits) with zero necrotic fraying',
        'Firm, upright petiole structure and turgid leaves with zero wilting',
        'Zero necrotic margins or chlorotic spotting on both leaf surfaces'
      ],
      symptoms: [
        'Deep vibrant emerald green coloration',
        'Clean, distinct leaf fenestrations (natural splits)',
        'Firm, upright petiole structure and turgid leaves',
        'Zero necrotic margins or chlorotic spotting'
      ],
      cause: 'Optimal equilibrium of bright ambient indirect light, balanced humidity (60%+), and disciplined watering regimen.',
      detailed_reasoning: 'Chloroplast density and palisade mesophyll cell alignment are optimal. Absence of fungal hyphae or bacterial exudates. Vascular bundle xylem and phloem transport are performing at peak physiological efficiency.',
      cooling_tips: [
        'Keep plant away from dry air conditioning vents and heat radiators to avoid thermal leaf tip desiccation',
        'Group with other tropical plants on a pebble humidity tray to create a localized cooling microclimate',
        'Mist foliage in the morning with room-temperature rainwater (avoid ice-cold water shock to roots)',
        'Keep ambient room temperature between 20°C - 26°C (68°F - 78°F) with good ambient air circulation'
      ],
      favorable_weather: '20°C - 28°C (68°F - 82°F) with 60% - 75% relative humidity and bright filtered indirect daylight',
      treatment_timeline: {
        day_1: 'Maintain standard routine; wipe leaf dust with a damp microfiber cloth to maximize photosynthetic efficiency.',
        day_3_5: 'Check soil moisture 2 inches down; water thoroughly if substrate is dry.',
        day_7_14: 'Apply mild liquid kelp or balanced 20-20-20 feed at quarter-strength during active vegetative growth.'
      },
      prevention: [
        'Regularly wipe broad leaves with a damp microfiber cloth to remove dust and maximize photosynthesis',
        'Maintain potting mix in an aerated aroid blend (orchid bark, perlite, peat, and charcoal)',
        'Ensure the planter features active drainage holes to prevent root asphyxiation'
      ],
      organic_treatment: [
        'Apply liquid seaweed kelp extract (2ml/L) monthly for vigorous root and aerial node strength',
        'Top-dress with worm castings (vermicompost) every season',
        'Occasional neem leaf polish to deter spider mites and thrips'
      ],
      chemical_treatment: [
        'No fungicides or pesticides required. Maintain prophylactic balanced water-soluble 20-20-20 micro-spray at half strength during spring/summer growth.'
      ],
      water: 'Water thoroughly once the top 2-3 inches of substrate feel dry. Avoid waterlogged saucers.',
      sunlight: 'Bright, dappled indirect sunlight. Avoid scorching direct mid-day UV rays.',
      fertilizer: 'Balanced 20-20-20 liquid houseplant fertilizer once every 3-4 weeks during active vegetative season.',
      recovery_time: 'Currently in prime botanical health. Sustained maintenance guarantees continued vigorous growth.',
      yield_loss_risk: '0% – Optimal botanical vigor, zero economic foliage defect',
      harvest_waiting_period: 'Zero restriction; safe organic ornamental handling at all times',
      transmission_mode: 'Non-contagious; sterile and resilient vascular tissue',
      quarantine_radius: 'No quarantine required; safe companion plant for indoor and greenhouse collections',
      vulnerable_crops: ['No adjacent species at risk'],
      soil_deficiency: 'No acute nutrient deficiencies detected; balanced nitrogen and potassium ratio',
      soil_ph_recommendation: 'Optimal soil pH 5.5 – 6.5; maintain well-aerated chunky aroid substrate',
      growth_stage: 'Prime Mature Vegetative Stage with active fenestration',
      pollinator_safety: 'Non-toxic indoor organic maintenance; 100% pollinator and pet friendly',
      spray_timing_window: 'Morning misting (7:00 AM – 9:00 AM) to maintain 65%+ relative canopy humidity',
      photosynthetic_vigor: 98
    }
  }
];
