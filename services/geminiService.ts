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
You are an expert game item analyzer specializing in RPGs like Diablo, Path of Exile, and similar loot-based games.
Based on the provided image of a game item:

0.  Identify the specific video game this item originates from (e.g., 'Diablo IV', 'Path of Exile', 'World of Warcraft', 'Elden Ring'). If the game cannot be confidently determined, state the ${langName} equivalent of 'Unknown Game'. This information is crucial for context. The game name should be the commonly known English title or its official ${langName} title if one exists and is more common in that language.
1.  Identify the item's name. If it's a very specific unique item name (proper noun), keep it in its original language. If it's a generic name (e.g. "Iron Sword"), translate it to ${langName}. If unsure, state "Unknown Item" in ${langName}.
2.  Determine its type (e.g., Sword, Helmet, Ring, Potion). Translate the type to ${langName}. If unsure, state "Unknown Type" in ${langName}.
3.  Attempt to discern its rarity (e.g., Common, Magic, Rare, Unique, Legendary, Set). Translate the rarity to ${langName} if it's a common term, otherwise use the original term or a ${langName} equivalent.
4.  Note any level requirement if visible.
5.  Extract any flavor text or lore snippets. Translate this to ${langName}.
6.  List all explicit stats, attributes, properties, or affixes with their values (e.g., "+10 Strength", "15% Increased Attack Speed"). Translate attribute names (like 'Strength', 'Attack Speed') to ${langName} if they are common translatable terms. Values should remain as they are.
7.  List any special effects or unique bonuses. Describe them in ${langName}.
8.  Provide a concise usage guide *relevant to the identified game* in ${langName}: Which character classes/builds (specific to that game) would benefit most? Primary strengths in the context of that game's mechanics?
9.  Offer an analysis of its key options/attributes in ${langName}: Are the rolls high/low? What makes these stats valuable? If any options/attributes appear to be variable (i.e., they roll within a range, common in many RPGs), provide an estimated or commonly known minimum and maximum possible roll for those specific stats on this type of item. For example, if an item has '+75 Vitality' and Vitality on this item type can typically roll between 50-100, you should mention this range as part of your analysis for that attribute. This helps the user understand the quality of the roll.
10. Extract any clearly visible raw text segments from the item description in the image. This helps in debugging. Keep this in its original language.
11. Set 'identifiedSuccessfully' to true if you can confidently identify the item's name and type, and some core attributes/effects. Otherwise, set it to false. If false, explain why in the 'usageGuide' field in ${langName} (e.g., "Image unclear", "Not a game item").
12. Scarcity Analysis: Briefly describe how common or rare this item is likely to be (e.g., "Common drop", "Rare find", "Extremely rare unique"). Provide this analysis in ${langName}.
13. Popularity/Demand: Estimate the general player interest or demand for this item or items like it. (e.g., "Highly sought after for endgame builds", "Niche use, moderate demand", "Commonly found, low demand"). Provide this analysis in ${langName}.
14. Optimal Options Summary: For this item type, what are generally considered to be the most desirable or "god-roll" options/affixes? (e.g., "For this weapon type, players typically look for increased critical strike chance, high physical damage, and attack speed."). Provide this summary in ${langName}.
15. Item Value Assessment: Provide a general assessment of the item's potential value or trading power in a typical game economy. Consider its rarity, stats, and demand. (e.g., "Likely a high-value trade item", "Useful for leveling, moderate value early on", "Primarily for self-use, low trade value"). Provide this assessment in ${langName}.


Return your analysis ONLY as a valid JSON object adhering to the following TypeScript interface.
The JSON *keys* (e.g., "identifiedGameName", "itemName", "attributes", "name", "value") MUST remain in English as defined. Only the *values* for specified fields should be in ${langName} (except for gameName, which can be original title).

export interface Attribute {
  name: string; // Attribute name, potentially translated to ${langName} if generic
  value: string | number; // Attribute value, untranslated
  description?: string; // Optional description in ${langName}
}

export interface Effect {
  name: string; // Effect name, potentially translated to ${langName}
  description: string; // Effect description in ${langName}
}

export interface ItemAnalysisResult {
  identifiedGameName?: string; // Game name (e.g., "Diablo IV", "Path of Exile"). Use ${langName} for "Unknown Game".
  itemName: string; // In ${langName} (or original if proper noun)
  itemType: string; // In ${langName}
  rarity?: string; // In ${langName} or original
  levelRequirement?: number | string;
  flavorText?: string; // In ${langName}
  attributes: Attribute[];
  effects: Effect[];
  options?: Attribute[]; // Variable affixes/suffixes, names potentially translated
  usageGuide: string; // In ${langName}, specific to identified game
  optionAnalysis: string; // In ${langName} - THIS IS WHERE MIN/MAX ROLL INFO SHOULD GO
  identifiedSuccessfully: boolean;
  rawIdentifiedText?: string; // Original language
  scarcityAnalysis?: string; // In ${langName}
  popularityDemand?: string; // In ${langName}
  optimalOptionsSummary?: string; // In ${langName}
  itemValueAssessment?: string; // In ${langName}
}

If some information is not discernible, omit the field or use a sensible default like "N/A" (or its ${langName} equivalent if appropriate for that field), "Unknown" (in ${langName}), or an empty array. For 'identifiedGameName', if unknown, use the ${langName} translation of "Unknown Game".
Prioritize accuracy based *only* on the visual information. Do not invent stats.
If the image is unclear or not a game item, set identifiedSuccessfully to false and explain briefly in usageGuide (in ${langName}).
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