import React, { useState } from 'react';
import type { ItemAnalysisResult, Attribute, Effect } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface ItemDisplayProps {
  result: ItemAnalysisResult;
  uploadedImage: string | null;
  onReset: () => void;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <div className={`bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-xl backdrop-blur-sm ${className}`}>
    <h3 className="text-xl font-semibold text-purple-300 mb-4 border-b border-purple-700 pb-2">{title}</h3>
    {children}
  </div>
);

const AttributeDisplay: React.FC<{ attribute: Attribute }> = ({ attribute }) => (
  <li className="py-2 border-b border-gray-700 last:border-b-0">
    <strong className="text-purple-400">{attribute.name}:</strong>
    <span className="ml-2 text-gray-200">{String(attribute.value)}</span>
    {attribute.description && <p className="text-xs text-gray-400 mt-1 italic">{attribute.description}</p>}
  </li>
);

const EffectDisplay: React.FC<{ effect: Effect }> = ({ effect }) => (
  <li className="py-2 border-b border-gray-700 last:border-b-0">
    <strong className="text-purple-400">{effect.name}</strong>
    <p className="text-gray-200 mt-1">{effect.description}</p>
  </li>
);

export const ItemDisplay: React.FC<ItemDisplayProps> = ({ result, uploadedImage, onReset }) => {
  const { t } = useTranslation();

  if (!result.identifiedSuccessfully) {
    return (
      <div className="w-full max-w-3xl p-6 bg-yellow-700 bg-opacity-80 rounded-lg shadow-xl text-center">
        <h2 className="text-2xl font-semibold mb-3 text-yellow-100">{t('itemDisplay.identificationIssueTitle')}</h2>
        <p className="text-yellow-200 mb-2">
          {result.usageGuide || t('itemDisplay.identificationIssueMessage')}
        </p>
        {result.identifiedGameName && result.identifiedGameName !== t('gemini.gameNameUnknown') && result.identifiedGameName !== t('gemini.gameNameError') && (
           <p className="text-yellow-300">{t('itemDisplay.label.gameName')} {result.identifiedGameName}</p>
        )}
        {result.itemName && result.itemName !== "Unknown" && result.itemName !== t('gemini.itemNameError') && result.itemName !== t('gemini.itemNameParsingError') && (
            <p className="text-yellow-300">{t('itemDisplay.identifiedAs', { itemName: result.itemName })}</p>
        )}
        {!result.usageGuide && <p className="text-yellow-200 my-4">{t('itemDisplay.tryClearerImage')}</p>}
        <button
          onClick={onReset}
          className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105"
        >
          {t('itemDisplay.analyzeAnotherButton')}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl p-2 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {uploadedImage && (
          <div className="md:w-1/3 flex-shrink-0">
            <InfoCard title={t('itemDisplay.itemImageTitle')}>
              <img src={uploadedImage} alt={result.itemName || "Uploaded Item"} className="rounded-lg shadow-lg w-full object-contain max-h-96" />
            </InfoCard>
          </div>
        )}
        <div className="md:w-2/3 flex-grow">
          <InfoCard title={t('itemDisplay.itemOverviewTitle')}>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-2">
              {result.itemName}
            </h2>
            {result.identifiedGameName && (
              <p className="text-gray-300 mb-1">
                <strong className="text-purple-400">{t('itemDisplay.label.gameName')}</strong> 
                {result.identifiedGameName}
              </p>
            )}
            <p className="text-gray-300 mb-1"><strong className="text-purple-400">{t('itemDisplay.label.type')}</strong> {result.itemType}</p>
            {result.rarity && <p className="text-gray-300 mb-1"><strong className="text-purple-400">{t('itemDisplay.label.rarity')}</strong> {result.rarity}</p>}
            {result.levelRequirement && <p className="text-gray-300 mb-1"><strong className="text-purple-400">{t('itemDisplay.label.levelReq')}</strong> {result.levelRequirement}</p>}
            {result.flavorText && <p className="text-sm italic text-gray-400 mt-3">"{result.flavorText}"</p>}
          </InfoCard>
        </div>
      </div>

      {(result.attributes?.length > 0) && (
        <InfoCard title={t('itemDisplay.attributesTitle')}>
          <ul className="space-y-1 text-gray-300">
            {result.attributes.map((attr, index) => <AttributeDisplay key={`attr-${index}`} attribute={attr} />)}
          </ul>
        </InfoCard>
      )}

      {(result.options?.length > 0) && (
         <InfoCard title={t('itemDisplay.optionsAffixesTitle')}>
          <ul className="space-y-1 text-gray-300">
            {result.options.map((opt, index) => <AttributeDisplay key={`opt-${index}`} attribute={opt} />)}
          </ul>
        </InfoCard>
      )}

      {(result.effects?.length > 0) && (
        <InfoCard title={t('itemDisplay.specialEffectsTitle')}>
          <ul className="space-y-2 text-gray-300">
             {result.effects.map((effect, index) => <EffectDisplay key={`effect-${index}`} effect={effect} />)}
          </ul>
        </InfoCard>
      )}
      
      {result.optionAnalysis && (
        <InfoCard title={t('itemDisplay.optionAnalysisTitle')}>
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">{result.optionAnalysis}</p>
        </InfoCard>
      )}

      {result.usageGuide && (
        <InfoCard title={t('itemDisplay.usageGuideTitle')}>
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">{result.usageGuide}</p>
        </InfoCard>
      )}

      {result.scarcityAnalysis && (
        <InfoCard title={t('itemDisplay.scarcityAnalysisTitle')}>
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">{result.scarcityAnalysis}</p>
        </InfoCard>
      )}

      {result.popularityDemand && (
        <InfoCard title={t('itemDisplay.popularityDemandTitle')}>
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">{result.popularityDemand}</p>
        </InfoCard>
      )}

      {result.optimalOptionsSummary && (
        <InfoCard title={t('itemDisplay.optimalOptionsSummaryTitle')}>
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">{result.optimalOptionsSummary}</p>
        </InfoCard>
      )}

      {result.itemValueAssessment && (
        <InfoCard title={t('itemDisplay.itemValueAssessmentTitle')}>
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">{result.itemValueAssessment}</p>
        </InfoCard>
      )}
      
      <div className="text-center mt-8">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg shadow-xl transition duration-150 ease-in-out transform hover:scale-105 text-lg"
        >
          {t('itemDisplay.analyzeAnotherButton')}
        </button>
      </div>
    </div>
  );
};