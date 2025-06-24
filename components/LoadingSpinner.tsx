
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

export const LoadingSpinner: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-purple-500" role="status" aria-label={t('loading.analyzing')}></div>
      <p className="text-xl text-purple-300 font-semibold">{t('loading.analyzing')}</p>
      <p className="text-gray-400">{t('loading.waitMessage')}</p>
    </div>
  );
};
