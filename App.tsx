
import React, { useState, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ImageUploader } from './components/ImageUploader';
import { ItemDisplay } from './components/ItemDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { analyzeGameItem } from './services/geminiService';
import type { ItemAnalysisResult } from './types';
import { fileToBase64 } from './utils/imageUtils';
import { useTranslation } from './hooks/useTranslation';

const App: React.FC = () => {
  const { t, currentLanguage, isLoadingTranslations } = useTranslation(); // Added isLoadingTranslations
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
      
      const result = await analyzeGameItem(base64Image, currentLanguage, t);
      setAnalysisResult(result);
      if (!result.identifiedSuccessfully && !result.itemName?.toLowerCase().includes("error")) {
        if (result.usageGuide) {
            setError(result.usageGuide);
        }
      }
    } catch (err) {
      console.error("Error during item analysis:", err);
      let errorMessage = t('error.analysisFailedDefault');
      // No change needed for err instanceof Error
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
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
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
      <Footer />
      <Analytics />
    </div>
  );
};

export default App;
