import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-8">
        {t('pages.about.title')}
      </h1>
      
      <div className="prose prose-invert max-w-none">
        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">{t('pages.about.serviceIntro')}</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            {t('pages.about.serviceDesc1')}
          </p>
          <p className="text-gray-300 leading-relaxed">
            {t('pages.about.serviceDesc2')}
          </p>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">{t('pages.about.keyFeatures')}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-200 mb-2">{t('pages.about.feature.aiAnalysis')}</h3>
              <p className="text-gray-300 text-sm">
                {t('pages.about.feature.aiAnalysisDesc')}
              </p>
            </div>
            <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-200 mb-2">{t('pages.about.feature.valueAssessment')}</h3>
              <p className="text-gray-300 text-sm">
                {t('pages.about.feature.valueAssessmentDesc')}
              </p>
            </div>
            <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-200 mb-2">{t('pages.about.feature.usageGuide')}</h3>
              <p className="text-gray-300 text-sm">
                {t('pages.about.feature.usageGuideDesc')}
              </p>
            </div>
            <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-200 mb-2">{t('pages.about.feature.multiLanguage')}</h3>
              <p className="text-gray-300 text-sm">
                {t('pages.about.feature.multiLanguageDesc')}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">{t('pages.about.supportedGames')}</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            {t('pages.about.supportedGamesDesc')}
          </p>
          <div className="grid md:grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-purple-800 bg-opacity-30 rounded-lg">
              <span className="text-purple-200 font-semibold">{t('pages.about.games.diablo')}</span>
            </div>
            <div className="p-3 bg-purple-800 bg-opacity-30 rounded-lg">
              <span className="text-purple-200 font-semibold">{t('pages.about.games.poe')}</span>
            </div>
            <div className="p-3 bg-purple-800 bg-opacity-30 rounded-lg">
              <span className="text-purple-200 font-semibold">{t('pages.about.games.lostArk')}</span>
            </div>
            <div className="p-3 bg-purple-800 bg-opacity-30 rounded-lg">
              <span className="text-purple-200 font-semibold">{t('pages.about.games.wow')}</span>
            </div>
            <div className="p-3 bg-purple-800 bg-opacity-30 rounded-lg">
              <span className="text-purple-200 font-semibold">{t('pages.about.games.ffxiv')}</span>
            </div>
            <div className="p-3 bg-purple-800 bg-opacity-30 rounded-lg">
              <span className="text-purple-200 font-semibold">{t('pages.about.games.others')}</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            {t('pages.about.supportedGamesNote')}
          </p>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">{t('pages.about.techStack')}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-200 mb-3">{t('pages.about.frontend')}</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• {t('pages.about.tech.react')}</li>
                <li>• {t('pages.about.tech.tailwind')}</li>
                <li>• {t('pages.about.tech.vite')}</li>
                <li>• {t('pages.about.tech.responsive')}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-200 mb-3">{t('pages.about.aiBackend')}</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• {t('pages.about.tech.gemini')}</li>
                <li>• {t('pages.about.tech.ocr')}</li>
                <li>• {t('pages.about.tech.nlp')}</li>
                <li>• {t('pages.about.tech.cloud')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">{t('pages.about.whyUs')}</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">✓</span>
              </div>
              <div>
                <h4 className="text-purple-200 font-semibold">{t('pages.about.advantage.free')}</h4>
                <p className="text-gray-300 text-sm">{t('pages.about.advantage.freeDesc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">✓</span>
              </div>
              <div>
                <h4 className="text-purple-200 font-semibold">{t('pages.about.advantage.fast')}</h4>
                <p className="text-gray-300 text-sm">{t('pages.about.advantage.fastDesc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">✓</span>
              </div>
              <div>
                <h4 className="text-purple-200 font-semibold">{t('pages.about.advantage.accurate')}</h4>
                <p className="text-gray-300 text-sm">{t('pages.about.advantage.accurateDesc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">✓</span>
              </div>
              <div>
                <h4 className="text-purple-200 font-semibold">{t('pages.about.advantage.privacy')}</h4>
                <p className="text-gray-300 text-sm">{t('pages.about.advantage.privacyDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 p-6 bg-gradient-to-r from-purple-800 to-pink-800 bg-opacity-30 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">{t('pages.about.getStarted')}</h2>
          <p className="text-purple-100 leading-relaxed mb-4">
            {t('pages.about.getStartedDesc')}
          </p>
          <div className="text-center">
            <a 
              href="/" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition duration-200 transform hover:scale-105"
            >
              {t('pages.about.startButton')}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}; 