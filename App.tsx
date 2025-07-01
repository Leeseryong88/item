import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ImageUploader } from './components/ImageUploader';
import { ItemDisplay } from './components/ItemDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { About } from './components/pages/About';
import { Contact } from './components/pages/Contact';
import { Guide } from './components/pages/Guide';
import { FAQ } from './components/pages/FAQ';
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { TermsOfService } from './components/pages/TermsOfService';
import { analyzeGameItem } from './services/geminiService';
import type { ItemAnalysisResult } from './types';
import { fileToBase64 } from './utils/imageUtils';
import { useTranslation } from './hooks/useTranslation';

const HomePage: React.FC = () => {
  const { t, currentLanguage } = useTranslation();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ItemAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const base64Image = await fileToBase64(file);
      setUploadedImage(base64Image);
      
      const tWrapper = (key: string, params?: Record<string, string | number>) => String(t(key, params));
      const result = await analyzeGameItem(base64Image, currentLanguage, tWrapper);
      setAnalysisResult(result);
      if (!result.identifiedSuccessfully && !result.itemName?.toLowerCase().includes("error")) {
        if (result.usageGuide) {
            setError(result.usageGuide);
        }
      }
    } catch (err) {
      console.error("Error during item analysis:", err);
      let errorMessage = String(t('error.analysisFailedDefault'));
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [currentLanguage, t]);

  const handleReset = useCallback(() => {
    setUploadedImage(null);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
      {/* Hero Section */}
      {!analysisResult && !isLoading && !error && (
        <div className="text-center mb-8 max-w-4xl">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {t('home.hero.subtitle')}<br/>
            <span className="text-purple-300 font-semibold">{t('home.hero.freeService')}</span>{t('home.hero.noRegistration')}
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-xl">
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">{t('home.features.gameSupport.title')}</h3>
              <p className="text-gray-400 text-sm">{t('home.features.gameSupport.desc')}</p>
            </div>
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-xl">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">{t('home.features.fastAnalysis.title')}</h3>
              <p className="text-gray-400 text-sm">{t('home.features.fastAnalysis.desc')}</p>
            </div>
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-xl">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">{t('home.features.privacy.title')}</h3>
              <p className="text-gray-400 text-sm">{t('home.features.privacy.desc')}</p>
            </div>
          </div>
        </div>
      )}

      {!analysisResult && !isLoading && !error && (
        <ImageUploader onImageUpload={handleImageUpload} disabled={isLoading} />
      )}

      {isLoading && <LoadingSpinner />}

      {error && !isLoading && !analysisResult?.identifiedSuccessfully && (
        <div className="w-full max-w-2xl p-6 bg-red-700 bg-opacity-80 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-semibold mb-3 text-red-100">{t('error.analysisFailedTitle')}</h2>
          <p className="text-red-200 mb-4">{error}</p>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105"
          >
            {t('error.tryAgainButton')}
          </button>
        </div>
      )}

      {analysisResult && !isLoading && (
        <ItemDisplay 
          result={analysisResult} 
          uploadedImage={uploadedImage}
          onReset={handleReset} 
        />
      )}
    </main>
  );
};

const AppContent: React.FC = () => {
  const { isLoadingTranslations } = useTranslation();

  if (isLoadingTranslations) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100">
        <LoadingSpinner /> 
        <p className="text-xl text-purple-300 font-semibold mt-4">Loading translations...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
      <Footer />
      <Analytics />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
