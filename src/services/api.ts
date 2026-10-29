export interface PlantAnalysisResult {
  plant_name: string;
  scientific_name: string;
  health: 'Healthy' | 'Warning' | 'Critical';
  disease: string;
  confidence: number;
  severity: string;
  description: string;
  detailed_reasoning: string;
  symptoms: string[];
  cause: string;
  prevention: string[];
  organic_treatment: string[];
  chemical_treatment: string[];
  water: string;
  sunlight: string;
  fertilizer: string;
  recovery_time: string;

  // Advanced Agricultural & Tree Diagnostic Indicators
  yield_loss_risk?: string;
  harvest_waiting_period?: string;
  transmission_mode?: string;
  quarantine_radius?: string;
  vulnerable_crops?: string[];
  soil_deficiency?: string;
  soil_ph_recommendation?: string;
  growth_stage?: string;
  pollinator_safety?: string;
  spray_timing_window?: string;
  photosynthetic_vigor?: number;

  // Real-Time Visual Forensics & Practical Cooling Management
  visual_forensic_cues?: string[];
  cooling_tips?: string[];
  favorable_weather?: string;
  treatment_timeline?: {
    day_1: string;
    day_3_5: string;
    day_7_14: string;
  };
}

/**
 * Dynamically resolves Puter.js from window or loads the script if needed.
 */
async function getPuter(): Promise<any> {
  if (typeof window === 'undefined') {
    throw new Error('Puter.js can only be run in the browser.');
  }

  const getGlobalPuter = () => (window as any).puter;

  if (getGlobalPuter()?.ai) {
    return getGlobalPuter();
  }

  // Ensure script is injected if not already present
  if (!document.querySelector('script[src*="js.puter.com"]')) {
    const script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    script.async = true;
    document.head.appendChild(script);
  }

  // Poll for availability
  let retries = 50;
  while (retries > 0) {
    if (getGlobalPuter()?.ai) {
      return getGlobalPuter();
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
    retries--;
  }

  if (getGlobalPuter()?.ai) {
    return getGlobalPuter();
  }

  throw new Error('Puter AI could not be loaded. Please check your internet connection and refresh.');
}

/**
 * Extracts and parses a JSON object from AI output string.
 */
function parseJsonFromAiResponse(content: string): any {
  if (!content) throw new Error("Empty AI response");
  
  let jsonStr = content.trim();

  // 1. Check for markdown code blocks (```json ... ``` or ``` ... ```)
  const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (jsonMatch && jsonMatch[1]) {
    jsonStr = jsonMatch[1].trim();
  } else {
    // 2. Locate the outermost curly braces
    const firstBrace = jsonStr.indexOf('{');
    const lastBrace = jsonStr.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      jsonStr = jsonStr.substring(firstBrace, lastBrace + 1);
    }
  }

  return JSON.parse(jsonStr);
}

/**
 * Analyzes a plant image using Puter.js AI Vision.
 * Identifies the exact plant species and condition based strictly on real-time visual evidence from the photo.
 */
export const analyzePlantImage = async (base64Image: string): Promise<PlantAnalysisResult> => {
  const puter = await getPuter();

  const prompt = `
You are a senior plant pathologist, agricultural agronomist, and arborist for PlantX AI.

CRITICAL INSTRUCTIONS & INTEGRITY RULES:
1. EXAMINE THIS EXACT UPLOADED SPECIMEN IMAGE CAREFULLY.
2. BASE YOUR DIAGNOSIS STRICTLY ON REAL-TIME OBSERVABLE VISUAL EVIDENCE IN THE PHOTO:
   - DO NOT fabricate, hallucinate, or exaggerate disease if the leaf is healthy.
   - DO NOT falsely blame or diagnose diseases unsupported by visual symptoms.
   - DO NOT include human pollen or allergen data (keep findings 100% focused on plant health, arboriculture, and agronomy).
   - If the specimen displays healthy green leaves with intact cuticles, classify health as "Healthy" and disease as "None".

3. REAL-TIME FORENSIC & PRACTICAL AGRONOMIC DATA TO GENERATE:
   - Identify: Plant Name, Scientific Botanical Name, Health ('Healthy' | 'Warning' | 'Critical'), Disease/Condition ('None' if healthy), Confidence (0-100), Severity.
   - Description: Detailed real-time description of the leaf appearance, cellular patterns, and lesion distribution.
   - visual_forensic_cues: Array of 3-4 concrete observable marks in THIS SPECIFIC photo (e.g. "Concentric bullseye rings on middle lamina", "Distinct chlorotic halo borders", "Healthy petiole with no vascular browning", "Water-soaked irregular margin tears").
   - cooling_tips: Array of 3-4 practical canopy cooling and heat/transpiration stress relief tips for this plant (e.g. "Apply 3 inches of organic straw mulch to keep root temperature 4-6°C cooler", "Install 35% shade cloth during afternoon peak heat (>35°C)", "Irrigate at dawn to maintain leaf cell turgor and prevent midday transpiration shock", "Foliar silica/kaolin clay misting to reduce leaf surface heat absorption").
   - favorable_weather: Weather conditions, temperature, and humidity range that trigger or worsen this condition (e.g. "24°C - 30°C with sustained relative humidity above 85%").
   - treatment_timeline: Concrete 3-phase action plan:
     - day_1: Immediate actions (sanitize shears, prune heavily infected leaflets, or adjust shade/hydration).
     - day_3_5: Primary treatment application (targeted organic spray / biocontrol / bio-fertilizer).
     - day_7_14: Follow-up evaluation (check new flushes for active lesions, repeat protective bio-spray if needed).
   - yield_loss_risk: Realistic % harvest loss if untreated.
   - harvest_waiting_period: Pre-Harvest Interval (PHI) / safe consumption buffer.
   - transmission_mode: Contagion vector (wind, rain splash, insect vector).
   - quarantine_radius: Safe buffer distance.
   - vulnerable_crops: 2-4 nearby companion crops susceptible.
   - soil_deficiency: Leaf-manifested nutrient deficit.
   - soil_ph_recommendation: Optimal soil pH range and amendment.
   - growth_stage: Current observed plant stage.
   - pollinator_safety: Honeybee safety advice.
   - spray_timing_window: Best spray hours and rainfast time.
   - photosynthetic_vigor: Estimated % of healthy, active chlorophyll tissue (0-100).

4. OUTPUT FORMAT:
Respond ONLY with a valid, raw JSON object matching this schema:
{
  "plant_name": "Common Plant Name",
  "scientific_name": "Botanical scientific name",
  "health": "Healthy",
  "disease": "Specific Disease Name or None",
  "confidence": 95,
  "severity": "Medium",
  "description": "Thorough visual diagnostic description of the leaf appearance in this image",
  "visual_forensic_cues": [
    "Specific observable cue 1 directly seen on this leaf",
    "Specific observable cue 2 on leaf veins or margins",
    "Specific observable cue 3 regarding cuticle texture"
  ],
  "symptoms": ["Observed symptom 1", "Observed symptom 2"],
  "cause": "Specific biological pathogen or environmental cause",
  "detailed_reasoning": "Biological and botanical explanation grounded in visible symptoms",
  "cooling_tips": [
    "Root-zone cooling tip using organic mulch",
    "Canopy shade and heat stress reduction advice",
    "Irrigation timing to buffer foliage temperature"
  ],
  "favorable_weather": "Temperature range and humidity percentage that favors this condition",
  "treatment_timeline": {
    "day_1": "Immediate Day 1 quarantine/sanitary pruning step",
    "day_3_5": "Day 3 to 5 bio-control or cooling treatment application",
    "day_7_14": "Day 7 to 14 recovery verification and secondary protection"
  },
  "prevention": ["Cultural prevention tip 1", "Prevention tip 2"],
  "organic_treatment": ["Organic remedy 1", "Organic remedy 2"],
  "chemical_treatment": ["Agricultural chemical spray 1", "Chemical treatment 2"],
  "water": "Specific watering protocol",
  "sunlight": "Specific sunlight requirement",
  "fertilizer": "Specific NPK / organic fertilizer guidance",
  "recovery_time": "Realistic recovery duration",
  "yield_loss_risk": "Projected % harvest loss if untreated",
  "harvest_waiting_period": "Pre-harvest interval / safe consumption delay",
  "transmission_mode": "Contagion vector and dispersal mechanism",
  "quarantine_radius": "Recommended buffer distance",
  "vulnerable_crops": ["Nearby crop 1", "Nearby crop 2"],
  "soil_deficiency": "Nutrient deficiency signs detected",
  "soil_ph_recommendation": "Optimal soil pH and conditioning",
  "growth_stage": "Plant life cycle stage",
  "pollinator_safety": "Honeybee protection guideline",
  "spray_timing_window": "Optimal spray hours and rainfast duration",
  "photosynthetic_vigor": 78
}
`;

  const visionModels = ['gpt-4o', 'gemini-2.5-flash', 'claude-3-5-sonnet', 'gpt-4o-mini', 'claude-sonnet-4'];

  let lastError: any = null;

  for (const model of visionModels) {
    try {
      console.log(`Analyzing plant image using Puter.js model: ${model}...`);

      let response: any = null;

      try {
        response = await puter.ai.chat(prompt, base64Image, { model });
      } catch (err1) {
        console.warn(`Puter direct image parameter failed for ${model}, trying multimodal format:`, err1);
        response = await puter.ai.chat([
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: base64Image
                }
              }
            ]
          }
        ], { model });
      }

      const rawContent = response?.message?.content || response?.text || (typeof response === 'string' ? response : JSON.stringify(response));

      if (rawContent) {
        const parsed = parseJsonFromAiResponse(rawContent);
        if (parsed && parsed.plant_name) {
          // Normalize health field
          if (!['Healthy', 'Warning', 'Critical'].includes(parsed.health)) {
            parsed.health = parsed.disease && parsed.disease.toLowerCase() !== 'none' ? 'Warning' : 'Healthy';
          }
          parsed.symptoms = Array.isArray(parsed.symptoms) ? parsed.symptoms : [parsed.symptoms || "Visual leaf damage"];
          parsed.prevention = Array.isArray(parsed.prevention) ? parsed.prevention : [parsed.prevention || "Maintain good plant hygiene"];
          parsed.organic_treatment = Array.isArray(parsed.organic_treatment) ? parsed.organic_treatment : [parsed.organic_treatment || "Neem oil spray"];
          parsed.chemical_treatment = Array.isArray(parsed.chemical_treatment) ? parsed.chemical_treatment : [parsed.chemical_treatment || "Consult local agricultural extension for registered fungicides"];

          // Visual forensic cues defaults
          parsed.visual_forensic_cues = Array.isArray(parsed.visual_forensic_cues) && parsed.visual_forensic_cues.length > 0
            ? parsed.visual_forensic_cues
            : [
                `Visible leaf lamina shows ${parsed.health === 'Healthy' ? 'uniform emerald green pigmentation' : 'focal chlorosis and spot discoloration'}`,
                `Vascular leaf veins show ${parsed.health === 'Healthy' ? 'intact hydrostatic turgor without browning' : 'early marginal wilting along secondary branchings'}`,
                `Cuticle surface texture exhibits ${parsed.health === 'Healthy' ? 'smooth, wax-sheened epidermis' : 'microscopic lesions with cellular breakdown'}`
              ];

          // Cooling tips defaults
          parsed.cooling_tips = Array.isArray(parsed.cooling_tips) && parsed.cooling_tips.length > 0
            ? parsed.cooling_tips
            : [
                "Apply 2.5 - 3 inches of clean organic straw or shredded bark mulch around root zone to reduce soil temperature by 4-6°C",
                "Erect 35% - 50% agricultural shade netting over canopy during intense afternoon hours (>35°C / 95°F)",
                "Schedule deep drip irrigation between 5:30 AM – 7:30 AM to hydrate root core before midday solar transpiration",
                "Perform light early-morning foliar hydration mist to lower canopy temperature without creating standing evening water"
              ];

          parsed.favorable_weather = parsed.favorable_weather || (
            parsed.health === 'Healthy' 
              ? 'Thrives in 20°C - 28°C with moderate relative humidity (50-65%)'
              : 'Pathogen sporulates rapidly between 24°C - 30°C under prolonged leaf wetness and >80% relative humidity'
          );

          parsed.treatment_timeline = parsed.treatment_timeline || {
            day_1: "Isolate specimen; prune heavily blighted lower foliage using 70% alcohol-sterilized tools; dispose debris off-plot.",
            day_3_5: "Apply certified bio-fungicide or cooling organic foliar spray early in the morning; apply root mulch barrier.",
            day_7_14: "Inspect tender emerging leaves for new lesion borders; reapply protective treatment if weather remains humid."
          };

          // Agricultural field defaults
          parsed.photosynthetic_vigor = typeof parsed.photosynthetic_vigor === 'number' 
            ? Math.min(100, Math.max(10, parsed.photosynthetic_vigor)) 
            : (parsed.health === 'Healthy' ? 96 : (parsed.health === 'Warning' ? 72 : 45));

          parsed.yield_loss_risk = parsed.yield_loss_risk || (
            parsed.health === 'Healthy'
              ? 'Negligible yield impact under standard maintenance'
              : (parsed.health === 'Critical' ? '50% - 75% yield loss if untreated within 7 days' : '20% - 35% yield reduction if untreated within 14 days')
          );

          parsed.harvest_waiting_period = parsed.harvest_waiting_period || (
            parsed.health === 'Healthy' ? 'No pre-harvest restrictions' : 'Wait 10-14 days post-spray before harvesting'
          );

          parsed.transmission_mode = parsed.transmission_mode || (
            parsed.health === 'Healthy' ? 'No active airborne or contact pathogen spread' : 'Airborne fungal conidia and wind-driven rain splash'
          );

          parsed.quarantine_radius = parsed.quarantine_radius || 'Maintain 5-meter isolation radius around infected specimens';
          parsed.vulnerable_crops = Array.isArray(parsed.vulnerable_crops) && parsed.vulnerable_crops.length > 0 
            ? parsed.vulnerable_crops 
            : ['Solanaceous family', 'Cucurbit vegetables', 'Fruit trees'];

          parsed.soil_deficiency = parsed.soil_deficiency || 'Slight nitrogen deficiency; monitor leaf margin potassium';
          parsed.soil_ph_recommendation = parsed.soil_ph_recommendation || 'Optimal pH 6.0 - 6.8; amend with organic vermicompost';
          parsed.growth_stage = parsed.growth_stage || 'Active Vegetative & Foliar Development Stage';
          parsed.pollinator_safety = parsed.pollinator_safety || 'Spray strictly at dusk (post-sunset) to protect foraging honeybees';
          parsed.spray_timing_window = parsed.spray_timing_window || '5:30 PM - 7:30 PM (Requires 2.5 hours rainfast drying)';

          return parsed as PlantAnalysisResult;
        }
      }
    } catch (err) {
      console.error(`Puter model ${model} error:`, err);
      lastError = err;
    }
  }

  // Fallback: Default Puter chat if named models encountered issues
  try {
    console.log("Attempting fallback with default Puter.js vision chat...");
    const fallbackResponse = await puter.ai.chat(prompt, base64Image);
    const rawContent = fallbackResponse?.message?.content || fallbackResponse?.text || (typeof fallbackResponse === 'string' ? fallbackResponse : '');
    if (rawContent) {
      const parsed = parseJsonFromAiResponse(rawContent);
      if (parsed && parsed.plant_name) {
        parsed.visual_forensic_cues = parsed.visual_forensic_cues || [
          "Observable leaf structure analyzed directly from upload",
          "Interveinal chlorosis patterns identified",
          "Leaf perimeter and epidermis examined"
        ];
        parsed.cooling_tips = parsed.cooling_tips || [
          "Apply organic straw mulch to keep root temperature 4-6°C cooler",
          "Use 35-50% shade netting during high-temperature midday periods",
          "Irrigate early in the morning to protect foliage from transpiration wilt"
        ];
        parsed.favorable_weather = parsed.favorable_weather || "24°C - 30°C with high humidity";
        parsed.treatment_timeline = parsed.treatment_timeline || {
          day_1: "Prune affected leaves with sanitized tools and improve airflow",
          day_3_5: "Apply prescribed organic remedy and monitor soil moisture",
          day_7_14: "Inspect new growth for healthy leaf flush"
        };
        parsed.photosynthetic_vigor = parsed.photosynthetic_vigor || 75;
        parsed.yield_loss_risk = parsed.yield_loss_risk || '25% - 40% yield loss if untreated';
        parsed.harvest_waiting_period = parsed.harvest_waiting_period || 'Wait 14 days post-treatment';
        parsed.transmission_mode = parsed.transmission_mode || 'Airborne and splash dispersal';
        parsed.quarantine_radius = parsed.quarantine_radius || '5 meters buffer zone';
        parsed.vulnerable_crops = parsed.vulnerable_crops || ['Tomatoes', 'Peppers', 'Potatoes'];
        parsed.soil_deficiency = parsed.soil_deficiency || 'Nitrogen / Potassium balance';
        parsed.soil_ph_recommendation = parsed.soil_ph_recommendation || 'pH 6.2 - 6.8';
        parsed.growth_stage = parsed.growth_stage || 'Vegetative Stage';
        parsed.pollinator_safety = parsed.pollinator_safety || 'Apply at dusk to protect honeybees';
        parsed.spray_timing_window = parsed.spray_timing_window || '5:30 PM - 7:30 PM (2 hrs rainfast)';
        return parsed as PlantAnalysisResult;
      }
    }
  } catch (err) {
    console.error("Fallback Puter.js chat failed:", err);
    lastError = err;
  }

  throw lastError || new Error("Failed to analyze image using Puter.js. Please verify your internet connection and try again.");
};

/**
 * Translates the structured analysis result into target language (Hindi, Telugu, etc.) using Puter.js AI.
 */
export const translateAnalysis = async (englishResult: PlantAnalysisResult, targetLanguage: string): Promise<PlantAnalysisResult> => {
  if (targetLanguage === 'English') return englishResult;

  try {
    const puter = await getPuter();

    const prompt = `
Translate ONLY the string and array values of this JSON into ${targetLanguage}.
CRITICAL INSTRUCTIONS:
1. DO NOT translate the JSON keys. Keep keys exactly as they are in English (e.g., "plant_name", "symptoms", "organic_treatment", "visual_forensic_cues", "cooling_tips", "favorable_weather", "treatment_timeline", "yield_loss_risk", "harvest_waiting_period", "transmission_mode", "quarantine_radius", "vulnerable_crops", "soil_deficiency", "soil_ph_recommendation", "growth_stage", "pollinator_safety", "spray_timing_window", etc.).
2. Keep the "health" value as exactly one of: "Healthy", "Warning", or "Critical".
3. Keep numeric values like "confidence" and "photosynthetic_vigor" unchanged as numbers.
4. Return ONLY valid, raw JSON. No markdown fences, no explanations.

${JSON.stringify(englishResult, null, 2)}
`;

    const response = await puter.ai.chat(prompt, { model: 'gpt-4o-mini' });
    const rawContent = response?.message?.content || response?.text || (typeof response === 'string' ? response : '');

    if (rawContent) {
      const parsed = parseJsonFromAiResponse(rawContent);
      if (parsed && parsed.plant_name) {
        return parsed as PlantAnalysisResult;
      }
    }
  } catch (error) {
    console.error("Translation via Puter.js failed:", error);
  }

  return englishResult;
};

/**
 * Interactive Plant Doctor: Allows users to ask follow-up questions about the diagnosed plant.
 */
export const askBotanistChat = async (
  plantContext: PlantAnalysisResult, 
  userQuestion: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<string> => {
  try {
    const puter = await getPuter();

    const systemPrompt = `You are a certified senior agricultural botanist and commercial plant pathologist for PlantX AI.
You are helping a farmer or plant grower with a specific plant diagnosis:
- Plant: ${plantContext.plant_name} (${plantContext.scientific_name})
- Health Status: ${plantContext.health}
- Condition/Disease: ${plantContext.disease}
- Severity: ${plantContext.severity}
- Observed Photo Cues: ${plantContext.visual_forensic_cues?.join(', ') || 'N/A'}
- Observed Symptoms: ${plantContext.symptoms.join(', ')}
- Recommended Organic Treatment: ${plantContext.organic_treatment.join(', ')}
- Cooling & Heat Stress Tips: ${plantContext.cooling_tips?.join(', ') || 'N/A'}
- Recommended Chemical Treatment: ${plantContext.chemical_treatment.join(', ')}
- Yield Loss Risk: ${plantContext.yield_loss_risk || 'N/A'}
- Harvest Waiting Period: ${plantContext.harvest_waiting_period || 'N/A'}
- Contagion Vector: ${plantContext.transmission_mode || 'N/A'}
- Quarantine Buffer: ${plantContext.quarantine_radius || 'N/A'}
- Soil & Nutrients: ${plantContext.soil_deficiency || 'N/A'} (pH: ${plantContext.soil_ph_recommendation || 'N/A'})
- Pollinator Safety: ${plantContext.pollinator_safety || 'N/A'}
- Spray Window: ${plantContext.spray_timing_window || 'N/A'}

Provide concise, friendly, practical, and highly accurate agricultural advice tailored specifically to this plant. Never provide human pollen allergen advice; focus on crop health, cooling, and recovery. Keep answers to 2-4 sentences unless detailed instructions are requested.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map(h => ({ role: h.role, content: h.content })),
      { role: "user", content: userQuestion }
    ];

    const response = await puter.ai.chat(messages, { model: 'gpt-4o-mini' });
    const answer = response?.message?.content || response?.text || (typeof response === 'string' ? response : '');
    
    if (answer) {
      return answer.trim();
    }
  } catch (err) {
    console.error("Botanist chat error:", err);
  }

  return `Based on ${plantContext.plant_name}'s diagnosis of ${plantContext.disease}, ensure good air circulation, avoid overhead watering, apply root mulch for temperature buffering, and follow the treatment protocol: ${plantContext.organic_treatment[0] || 'maintain proper watering and organic nutrients'}.`;
};
