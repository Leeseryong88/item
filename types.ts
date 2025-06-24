export interface Attribute {
  name: string;
  value: string | number;
  description?: string;
}

export interface Effect {
  name:string;
  description: string;
}

export interface ItemAnalysisResult {
  identifiedGameName?: string; // New field for the identified game
  itemName: string;
  itemType: string;
  rarity?: string;
  levelRequirement?: number | string; // Can be number or text like "Any"
  flavorText?: string;
  attributes: Attribute[];
  effects: Effect[];
  options?: Attribute[];
  usageGuide: string;
  optionAnalysis: string;
  identifiedSuccessfully: boolean;
  rawIdentifiedText?: string;
  // New fields for item value analysis
  scarcityAnalysis?: string;
  popularityDemand?: string;
  optimalOptionsSummary?: string;
  itemValueAssessment?: string;
}