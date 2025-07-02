import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { ItemAnalysisResult } from '../types';
import { parseGeminiJsonResponse } from '../utils/textUtils';
import type { Language } from '../contexts/LanguageContext';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API Key is missing. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "MISSING_API_KEY_FALLBACK" });
const MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

const getItemAnalysisPrompt = (language: Language): string => {
  let langName: string;
  switch (language) {
    case 'ko':
      langName = 'Korean';
      break;
    case 'ja':
      langName = 'Japanese';
      break;
    case 'en':
    default:
      langName = 'English';
      break;
  }
  
  return `
You are a professional game item analyst with expertise in major RPGs including Diablo, Path of Exile, World of Warcraft, Lost Ark, Final Fantasy XIV, and similar loot-based games. You must provide definitive, expert-level analysis based STRICTLY on visual evidence.

CRITICAL ANALYSIS REQUIREMENTS:
- NEVER make assumptions or guesses - only state what you can definitively see
- NEVER provide speculative information about stats, rolls, or values
- If information is unclear or uncertain, explicitly state "Cannot be determined from image"
- Provide PRECISE analysis with concrete evidence from the visual data
- When discussing variable stats, provide EXACT minimum and maximum roll ranges if clearly identifiable

Based on the provided image of a game item:

0.  GAME IDENTIFICATION: Identify the specific video game ONLY if you can definitively determine it from visual cues, UI elements, or distinctive design patterns (e.g., 'Diablo IV', 'Path of Exile', 'World of Warcraft', 'Lost Ark'). If uncertain, state the ${langName} equivalent of 'Unknown Game'. Do NOT guess based on item appearance alone.

1.  ITEM NAME: Extract the exact item name as shown in the image. If it's a unique item name (proper noun), preserve the original language. For generic names, translate to ${langName}. If the name is unclear or partially obscured, state "Cannot be clearly determined from image" in ${langName}.

2.  ITEM TYPE: Identify the item type ONLY if clearly visible (e.g., Sword, Helmet, Ring, Amulet). Translate to ${langName}. If uncertain, state "Cannot be determined from image" in ${langName}.

3.  RARITY IDENTIFICATION: Determine rarity ONLY from clear visual indicators (color coding, borders, explicit text, rarity gems/symbols). Common indicators: White=Common, Blue=Magic, Yellow/Gold=Rare, Orange=Legendary, Green=Set, Purple=Unique. Translate to ${langName} if applicable. If unclear, state "Cannot be determined from image".

4.  LEVEL REQUIREMENT: Extract ONLY if explicitly visible as text or numbers. Do not estimate.

5.  FLAVOR TEXT: Extract visible lore/flavor text exactly as shown, then translate to ${langName}. If partially visible, note what portions are unclear.

6.  ATTRIBUTES & STATS: List ONLY explicitly visible stats with exact values (e.g., "+127 Strength", "18% Critical Strike Chance"). Translate attribute names to ${langName} while preserving exact numerical values. Do NOT estimate or fill in partially visible numbers.

7.  SPECIAL EFFECTS: Describe ONLY clearly visible special bonuses or unique mechanics. Translate descriptions to ${langName}. If effects are partially obscured, note which parts are unclear.

8.  EXPERT USAGE ANALYSIS: Provide definitive usage recommendations in ${langName} based on the identified game's meta. Be specific about character classes, build archetypes, and mechanical synergies. Base recommendations ONLY on the visible stats - do not assume hidden properties.

9.  VARIABLE STAT ANALYSIS: For stats with variable rolls, provide PRECISE analysis in ${langName}:
   - State the visible roll value exactly
   - If you can definitively identify the possible roll range for this stat on this item type, provide exact minimum-maximum values
   - Assess roll quality as: "Perfect Roll", "Near-Maximum (X-Y% of max)", "High Roll (X-Y% of max)", "Average Roll (X-Y% of max)", "Below Average (X-Y% of max)", or "Cannot determine roll quality"
   - NEVER provide estimated ranges unless you have definitive knowledge of the game's mechanics
   - If roll ranges are unknown, state "Roll range data not available"

10. RAW TEXT EXTRACTION: Extract ALL clearly visible text segments exactly as they appear, maintaining original language and formatting. This aids in debugging and verification.

11. IDENTIFICATION SUCCESS: Set 'identifiedSuccessfully' to true ONLY if you can definitively identify the item name, type, and at least 70% of visible attributes. If false, provide specific reasons in 'usageGuide' field in ${langName}.

12. SCARCITY ANALYSIS: Provide definitive scarcity assessment in ${langName} based on visible rarity indicators and game knowledge. Use categories: "Common Drop", "Uncommon Drop", "Rare Drop", "Very Rare Drop", "Extremely Rare/Unique", "Unknown Rarity". Do not speculate.

13. MARKET DEMAND: Assess player demand in ${langName} based on visible stats and meta knowledge: "High Demand - Meta Item", "Moderate Demand - Viable Option", "Low Demand - Niche Use", "Poor Demand - Vendor Item", "Cannot Assess Demand". Support assessment with specific reasons.

14. OPTIMAL STAT PRIORITIES: For the identified item type, list the TOP priority stats that define "perfect rolls" in ${langName}. Be specific: "For [item type], optimal stats are: 1) [stat] at maximum roll, 2) [stat] with high roll, 3) [stat] for synergy." Base this on definitive game knowledge.

15. VALUE ASSESSMENT: Provide concrete value evaluation in ${langName}: "High Trade Value - Multiple perfect/near-perfect rolls", "Moderate Value - Good usable stats", "Low Value - Average rolls", "Vendor/Salvage Value - Poor stats", "Cannot Determine Value". Justify assessment with specific stat analysis.

RESPONSE FORMAT REQUIREMENTS:
Return analysis ONLY as valid JSON adhering to the TypeScript interface below.
JSON keys MUST remain in English. Values should be in ${langName} where specified.
Use "Cannot be determined from image" or ${langName} equivalent for unclear information.
NEVER use vague terms like "likely", "probably", "appears to be" - provide definitive statements or acknowledge limitations.

export interface Attribute {
  name: string; // Attribute name, translated to ${langName} if generic
  value: string | number; // Exact value as visible, untranslated
  description?: string; // Optional clarification in ${langName}
}

export interface Effect {
  name: string; // Effect name, translated to ${langName}
  description: string; // Precise effect description in ${langName}
}

export interface ItemAnalysisResult {
  identifiedGameName?: string; // Definitive game name or "Unknown Game" in ${langName}
  itemName: string; // Exact name in ${langName} or "Cannot be determined"
  itemType: string; // Definitive type in ${langName} or "Cannot be determined"
  rarity?: string; // Definitive rarity in ${langName} or "Cannot be determined"
  levelRequirement?: number | string; // Exact visible requirement only
  flavorText?: string; // Exact visible text translated to ${langName}
  attributes: Attribute[]; // Only clearly visible attributes
  effects: Effect[]; // Only clearly visible effects
  options?: Attribute[]; // Variable affixes with exact visible values
  usageGuide: string; // Expert recommendations in ${langName}
  optionAnalysis: string; // Precise variable stat analysis with exact roll quality assessment
  identifiedSuccessfully: boolean; // True only if 70%+ information is definitive
  rawIdentifiedText?: string; // ALL visible text in original language
  scarcityAnalysis?: string; // Definitive rarity assessment in ${langName}
  popularityDemand?: string; // Concrete demand assessment in ${langName}
  optimalOptionsSummary?: string; // Definitive optimal stat priorities in ${langName}
  itemValueAssessment?: string; // Concrete value assessment with justification in ${langName}
}

ACCURACY MANDATE: Base analysis EXCLUSIVELY on visible information. State limitations clearly. Provide expert-level precision without speculation.
`;
};

export const analyzeGameItem = async (
    base64ImageData: string, 
    language: Language,
    t: (key: string, params?: Record<string, string | number>) => string
): Promise<ItemAnalysisResult> => {
  if (!API_KEY) {
     console.error("Gemini API Key is missing. Analysis cannot proceed.");
     return {
        identifiedGameName: t('gemini.gameNameUnknown'),
        itemName: t('gemini.itemNameError'),
        itemType: t('gemini.itemTypeError'),
        attributes: [],
        effects: [],
        usageGuide: t('gemini.error.apiKeyMissingUser'),
        optionAnalysis: t('gemini.optionAnalysisConfigError'),
        identifiedSuccessfully: false,
        rawIdentifiedText: t('gemini.rawTextApiKeyMissing'),
        scarcityAnalysis: t('gemini.analysisNotAvailable'),
        popularityDemand: t('gemini.analysisNotAvailable'),
        optimalOptionsSummary: t('gemini.analysisNotAvailable'),
        itemValueAssessment: t('gemini.analysisNotAvailable'),
     };
  }

  try {
    const imagePart = {
      inlineData: {
        mimeType: base64ImageData.substring(base64ImageData.indexOf(':') + 1, base64ImageData.indexOf(';')),
        data: base64ImageData.split(',')[1],
      },
    };

    const currentPrompt = getItemAnalysisPrompt(language);
    const textPart = {
      text: currentPrompt,
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ parts: [imagePart, textPart] }],
      config: {
        responseMimeType: "application/json",
        temperature: 0.3, // Slightly reduced temperature for more deterministic game identification
      },
    });
    
    const rawJsonText = response.text;
    const parsedResult = parseGeminiJsonResponse<ItemAnalysisResult>(rawJsonText);

    if (!parsedResult) {
        console.error("Failed to parse JSON response from Gemini:", rawJsonText);
        return {
            identifiedGameName: t('gemini.gameNameError'),
            itemName: t('gemini.itemNameParsingError'),
            itemType: t('gemini.itemTypeError'),
            attributes: [],
            effects: [],
            usageGuide: t('gemini.error.parsingErrorUser'),
            optionAnalysis: t('gemini.optionAnalysisParsingError'),
            identifiedSuccessfully: false,
            rawIdentifiedText: rawJsonText || t('gemini.error.noRawText', { lang: language }),
            scarcityAnalysis: t('gemini.analysisNotAvailableOnError'),
            popularityDemand: t('gemini.analysisNotAvailableOnError'),
            optimalOptionsSummary: t('gemini.analysisNotAvailableOnError'),
            itemValueAssessment: t('gemini.analysisNotAvailableOnError'),
        };
    }
    
    // Ensure identifiedGameName has a fallback if missing but identification was otherwise successful
    if (parsedResult.identifiedSuccessfully && !parsedResult.identifiedGameName) {
        parsedResult.identifiedGameName = t('gemini.gameNameUnknown');
    }


    if (!parsedResult.rawIdentifiedText && rawJsonText) {
        parsedResult.rawIdentifiedText = `Full AI JSON Response (or attempt):\n${rawJsonText}`;
    }
    return parsedResult;

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    let errorMessageContent = "Unknown error";
    if (error instanceof Error) {
        errorMessageContent = error.message;
    }
    
    return {
      identifiedGameName: t('gemini.gameNameError'),
      itemName: t('gemini.itemNameError'),
      itemType: t('gemini.itemTypeError'),
      attributes: [],
      effects: [],
      usageGuide: t('gemini.error.apiErrorUser'), 
      optionAnalysis: t('gemini.error.apiErrorUser'),
      identifiedSuccessfully: false,
      rawIdentifiedText: t('gemini.rawTextApiError', { errorMessage: errorMessageContent }),
      scarcityAnalysis: t('gemini.analysisNotAvailableOnError'),
      popularityDemand: t('gemini.analysisNotAvailableOnError'),
      optimalOptionsSummary: t('gemini.analysisNotAvailableOnError'),
      itemValueAssessment: t('gemini.analysisNotAvailableOnError'),
    };
  }
};