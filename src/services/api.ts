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
 * Identifies the exact plant species and condition, producing unique, tree-specific care data.
 */
export const analyzePlantImage = async (base64Image: string): Promise<PlantAnalysisResult> => {
  const puter = await getPuter();

  const prompt = `
You are a world-class agricultural botanist, plant pathologist, and arboriculture specialist.

INSTRUCTIONS:
1. Examine this EXACT uploaded plant/tree leaf image very carefully.
2. Accurately identify:
   - The EXACT Plant/Tree species name (e.g. Mango Tree, Apple Tree, Neem Tree, Coconut Palm, Banana Plant, Tomato Plant, Citrus/Lemon Tree, Guava Tree, Rose Plant, Rice Crop, Cotton, etc.).
   - The Scientific Name (e.g. Mangifera indica, Solanum lycopersicum, Citrus limon, etc.).
   - Health status: MUST be one of 'Healthy', 'Warning', or 'Critical'.
   - Precise Disease/Condition (e.g. "Anthracnose", "Powdery Mildew", "Bacterial Canker", "Citrus Greening", "Leaf Curl Virus", "Black Spot", "Early Blight", "Rust", "Nutrient Deficiency", or "None" if healthy).
   - Confidence Percentage (number 0-100).
   - Severity ('None', 'Low', 'Medium', 'High', 'Critical').
3. CRITICAL CUSTOMIZATION REQUIREMENT:
   - ALL recommendations, treatments, prevention, watering, sunlight, fertilizer, and reasoning MUST BE 100% SPECIFIC TO THIS IDENTIFIED TREE/PLANT SPECIES AND THIS SPECIFIC DISEASE.
   - DO NOT provide generic, templated, or repeated advice.
   - For organic_treatment: Give 2-4 actionable organic remedies formulated specifically for this tree species (e.g., neem oil dilution for mangoes, copper soap for tomatoes, wood ash/compost tea for citrus).
   - For chemical_treatment: Give 2-3 specific agricultural fungicide/insecticide chemical active ingredients and dosages suited for this crop (e.g., Chlorothalonil, Mancozeb, Difenoconazole, Imidacloprid, Copper Oxychloride). If healthy, recommend general protective micronutrient sprays.
   - For water: Specific watering requirements for this plant species (deep watering, drip frequency, soil moisture level).
   - For sunlight: Specific daily sun requirement for this plant species (e.g., "Full sun 6-8 hours", "Partial shade").
   - For fertilizer: Specific N-P-K and micronutrient needs for this tree/plant (e.g. Potassium-rich 10-10-20, compost, zinc foliar spray).
   - For recovery_time: Realistic healing timeline for this specific species.
   - For detailed_reasoning: Provide a comprehensive biological, environmental, and pathological explanation of how and why this condition manifests on this particular plant.

4. OUTPUT FORMAT:
Respond ONLY with a valid, raw JSON object matching this exact schema:
{
  "plant_name": "Identified Common Plant Name",
  "scientific_name": "Scientific botanical name",
  "health": "Healthy",
  "disease": "Specific Disease Name or None",
  "confidence": 95,
  "severity": "Medium",
  "description": "Visual diagnostic summary of the leaf appearance and observed symptoms",
  "symptoms": ["Specific observed symptom 1", "Specific symptom 2", "Specific symptom 3"],
  "cause": "Specific biological pathogen or environmental cause",
  "detailed_reasoning": "In-depth scientific and biological explanation tailored to this exact plant species",
  "prevention": ["Prevention tip 1 for this plant", "Prevention tip 2 for this plant", "Prevention tip 3"],
  "organic_treatment": ["Specific organic remedy 1", "Specific organic remedy 2"],
  "chemical_treatment": ["Specific chemical active ingredient / spray 1", "Specific chemical treatment 2"],
  "water": "Specific watering instructions for this tree/plant",
  "sunlight": "Specific sunlight guidance for this species",
  "fertilizer": "Specific fertilizer recommendation (NPK / organic compost) for this plant",
  "recovery_time": "Realistic recovery duration"
}
`;

  // List of vision-capable models to try via Puter.js in order
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
Translate ONLY the string values of this JSON into ${targetLanguage}.
CRITICAL INSTRUCTIONS:
1. DO NOT translate the JSON keys. Keep keys exactly as they are in English (e.g., "plant_name", "symptoms", "organic_treatment", etc.).
2. Keep the "health" value as exactly one of: "Healthy", "Warning", or "Critical".
3. Return ONLY valid, raw JSON. No markdown fences, no explanations.

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
