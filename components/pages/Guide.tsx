import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export const Guide: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-8">
        {t('pages.guide.title')}
      </h1>
      
      <div className="prose prose-invert max-w-none">
        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">{t('pages.guide.quickStart')}</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-200 mb-2">{t('pages.guide.step1.title')}</h3>
                <p className="text-gray-300">{t('pages.guide.step1.desc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-200 mb-2">{t('pages.guide.step2.title')}</h3>
                <p className="text-gray-300">{t('pages.guide.step2.desc')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-200 mb-2">{t('pages.guide.step3.title')}</h3>
                <p className="text-gray-300">{t('pages.guide.step3.desc')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">{t('pages.guide.screenshotGuide')}</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-green-800 bg-opacity-30 rounded-lg border border-green-600">
              <h3 className="text-lg font-semibold text-green-300 mb-3">{t('pages.guide.goodScreenshot')}</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• {t('pages.guide.goodTips.1')}</li>
                <li>• {t('pages.guide.goodTips.2')}</li>
                <li>• {t('pages.guide.goodTips.3')}</li>
                <li>• {t('pages.guide.goodTips.4')}</li>
                <li>• {t('pages.guide.goodTips.5')}</li>
                <li>• {t('pages.guide.goodTips.6')}</li>
              </ul>
            </div>
            <div className="p-4 bg-red-800 bg-opacity-30 rounded-lg border border-red-600">
              <h3 className="text-lg font-semibold text-red-300 mb-3">{t('pages.guide.badScreenshot')}</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• {t('pages.guide.badTips.1')}</li>
                <li>• {t('pages.guide.badTips.2')}</li>
                <li>• {t('pages.guide.badTips.3')}</li>
                <li>• {t('pages.guide.badTips.4')}</li>
                <li>• {t('pages.guide.badTips.5')}</li>
                <li>• {t('pages.guide.badTips.6')}</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-blue-800 bg-opacity-30 rounded-lg">
            <h4 className="text-purple-200 font-semibold mb-2">{t('pages.guide.proTip')}</h4>
            <p className="text-gray-300 text-sm">
              {t('pages.guide.proTipDesc')}
            </p>
          </div>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">{t('pages.guide.gameGuides')}</h2>
          
          <div className="space-y-6">
            <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-200 mb-3">Diablo IV</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• {t('pages.guide.diablo.tip1')}</li>
                <li>• {t('pages.guide.diablo.tip2')}</li>
                <li>• {t('pages.guide.diablo.tip3')}</li>
                <li>• {t('pages.guide.diablo.tip4')}</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-200 mb-3">Path of Exile</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• {t('pages.guide.poe.tip1')}</li>
                <li>• {t('pages.guide.poe.tip2')}</li>
                <li>• {t('pages.guide.poe.tip3')}</li>
                <li>• {t('pages.guide.poe.tip4')}</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-200 mb-3">Lost Ark</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• {t('pages.guide.lostark.tip1')}</li>
                <li>• {t('pages.guide.lostark.tip2')}</li>
                <li>• {t('pages.guide.lostark.tip3')}</li>
                <li>• {t('pages.guide.lostark.tip4')}</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-200 mb-3">{t('pages.guide.otherGames')}</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• {t('pages.guide.other.tip1')}</li>
                <li>• {t('pages.guide.other.tip2')}</li>
                <li>• {t('pages.guide.other.tip3')}</li>
                <li>• {t('pages.guide.other.tip4')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">{t('pages.guide.understanding')}</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-200 mb-2">{t('pages.guide.overview.title')}</h3>
              <p className="text-gray-300 text-sm">
                {t('pages.guide.overview.desc')}
              </p>
            </div>

            <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-200 mb-2">{t('pages.guide.attributes.title')}</h3>
              <p className="text-gray-300 text-sm">
                {t('pages.guide.attributes.desc')}
              </p>
            </div>

            <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-200 mb-2">{t('pages.guide.valueAssessment.title')}</h3>
              <p className="text-gray-300 text-sm">
                {t('pages.guide.valueAssessment.desc')}
              </p>
            </div>

            <div className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-200 mb-2">{t('pages.guide.usageGuide.title')}</h3>
              <p className="text-gray-300 text-sm">
                {t('pages.guide.usageGuide.desc')}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">{t('pages.guide.troubleshooting')}</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-yellow-800 bg-opacity-30 rounded-lg border border-yellow-600">
              <h3 className="text-lg font-semibold text-yellow-300 mb-2">{t('pages.guide.analysisFails')}</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• {t('pages.guide.analysisFails.tip1')}</li>
                <li>• {t('pages.guide.analysisFails.tip2')}</li>
                <li>• {t('pages.guide.analysisFails.tip3')}</li>
                <li>• {t('pages.guide.analysisFails.tip4')}</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-800 bg-opacity-30 rounded-lg border border-yellow-600">
              <h3 className="text-lg font-semibold text-yellow-300 mb-2">{t('pages.guide.inaccurateResults')}</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• {t('pages.guide.inaccurateResults.tip1')}</li>
                <li>• {t('pages.guide.inaccurateResults.tip2')}</li>
                <li>• {t('pages.guide.inaccurateResults.tip3')}</li>
                <li>• {t('pages.guide.inaccurateResults.tip4')}</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-800 bg-opacity-30 rounded-lg border border-yellow-600">
              <h3 className="text-lg font-semibold text-yellow-300 mb-2">{t('pages.guide.uploadFails')}</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• {t('pages.guide.uploadFails.tip1')}</li>
                <li>• {t('pages.guide.uploadFails.tip2')}</li>
                <li>• {t('pages.guide.uploadFails.tip3')}</li>
                <li>• {t('pages.guide.uploadFails.tip4')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8 p-6 bg-gradient-to-r from-purple-800 to-pink-800 bg-opacity-30 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">{t('pages.guide.needHelp')}</h2>
          <p className="text-purple-100 leading-relaxed mb-4">
            {t('pages.guide.needHelpDesc')}
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="/faq" 
              className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200"
            >
              {t('pages.guide.viewFaq')}
            </a>
            <a 
              href="/contact" 
              className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition duration-200"
            >
              {t('pages.guide.contactUs')}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}; 