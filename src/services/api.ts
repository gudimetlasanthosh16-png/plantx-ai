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

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';

export const analyzePlantImage = async (base64Image: string): Promise<PlantAnalysisResult> => {
  if (!OPENROUTER_API_KEY) {
    console.warn("No OpenRouter API key found. Using mock data.");
    return mockAnalysis();
  }

  const prompt = `
You are a professional agricultural and botanical expert.
Analyze the uploaded plant image in extreme detail based specifically on the visual evidence in the image.
IMPORTANT: You MUST respond ONLY with a raw JSON object. Do not include markdown formatting (like \`\`\`json), and do not include any other text. 
Identify:
- Plant Name
- Scientific Name
- Plant Health (Must be exactly one of: 'Healthy', 'Warning', 'Critical')
- Disease (If none, write 'None')
- Confidence Percentage (number 0-100)
- Symptoms (Array of strings)
- Cause (string - brief summary)
- Detailed Reasoning (string - extensive explanation of exactly why this condition occurs, covering biological, environmental, and physical factors specific to this leaf)
- Severity (string, e.g., 'Low', 'Medium', 'High')
- Description (string - detailed analysis of the leaf's appearance and condition)
- Prevention (Array of strings)
- Organic Treatment (Array of strings)
- Chemical Treatment (Array of strings)
- Water Recommendation (string)
- Sunlight Recommendation (string)
- Fertilizer Recommendation (string)
- Estimated Recovery Time (string)

Return ONLY valid JSON matching this exact structure:
{
  "plant_name":"",
  "scientific_name":"",
  "health":"",
  "disease":"",
  "confidence":0,
  "severity":"",
  "description":"",
  "symptoms":[],
  "cause":"",
  "detailed_reasoning":"",
  "prevention":[],
  "organic_treatment":[],
  "chemical_treatment":[],
  "water":"",
  "sunlight":"",
  "fertilizer":"",
  "recovery_time":""
}
`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",
        max_tokens: 1000,
        messages: [
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
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter API Error:", data);
      throw new Error(`API request failed with status ${response.status}: ${data.error?.message || 'Unknown error'}`);
    }

    let content = data.choices[0].message.content.trim();
    console.log("Raw API Response:", content);

    // Extract JSON block using regex if wrapped in markdown, otherwise assume raw JSON
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      jsonStr = jsonMatch[1];
    } else {
      // Fallback: Try to find first '{' and last '}'
      const firstBrace = content.indexOf('{');
      const lastBrace = content.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        jsonStr = content.substring(firstBrace, lastBrace + 1);
      }
    }

    try {
      const parsed = JSON.parse(jsonStr);
      // Validate that it has at least some required fields
      if (!parsed.plant_name) {
         throw new Error("Invalid response format from AI");
      }
      return parsed as PlantAnalysisResult;
    } catch (e) {
      console.error("Failed to parse AI response. Raw string was:", jsonStr);
      throw new Error("Failed to interpret AI response. Please try scanning again.");
    }
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};

function mockAnalysis(): Promise<PlantAnalysisResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        plant_name: "Tomato Plant",
        scientific_name: "Solanum lycopersicum",
        health: "Critical",
        disease: "Early Blight",
        confidence: 94,
        severity: "High",
        description: "Early blight is a common tomato disease caused by the fungus Alternaria solani. It can affect leaves, stems, and fruit.",
        symptoms: [
          "Dark, concentric spots on lower leaves",
          "Yellowing around the spots",
          "Leaf drop in severe cases"
        ],
        cause: "Fungus Alternaria solani, often thriving in warm, humid conditions.",
        detailed_reasoning: "Early blight is primarily driven by the fungus Alternaria solani. It thrives in warm (75-85°F) and highly humid environments. The spores are typically soil-borne and splash onto lower leaves during heavy rain or overhead watering. Once attached, the fungus penetrates the leaf tissue, causing the distinct target-like concentric rings visible on the affected areas. If left untreated, the fungus rapidly moves up the plant canopy, severely reducing photosynthetic capacity and crop yield.",
        prevention: [
          "Crop rotation",
          "Ensure good air circulation",
          "Avoid overhead watering"
        ],
        organic_treatment: [
          "Copper-based fungicides",
          "Remove and destroy infected leaves",
          "Neem oil application"
        ],
        chemical_treatment: [
          "Chlorothalonil based fungicides",
          "Mancozeb fungicides"
        ],
        water: "Water at the base, 1-2 inches per week.",
        sunlight: "Full sun (6-8 hours daily)",
        fertilizer: "Balanced fertilizer (10-10-10), avoid excess nitrogen",
        recovery_time: "2-3 weeks with proper treatment"
      });
    }, 3000); // simulate network delay
  });
};
