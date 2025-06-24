
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 bg-opacity-30 py-6 text-center">
      <p className="text-gray-500 text-xs mt-1">
        {t('footer.demoDisclaimer')}
      </p>
    </footer>
  );
};
