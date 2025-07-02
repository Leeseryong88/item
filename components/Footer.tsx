import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-900 bg-opacity-80 py-8 text-center border-t border-gray-700">
      <div className="container mx-auto px-4">
        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <a href="/about" className="text-gray-400 hover:text-purple-400 transition duration-200 text-sm">
            서비스 소개
          </a>
          <a href="/guide" className="text-gray-400 hover:text-purple-400 transition duration-200 text-sm">
            사용 가이드
          </a>
          <a href="/faq" className="text-gray-400 hover:text-purple-400 transition duration-200 text-sm">
            FAQ
          </a>
          <a href="/contact" className="text-gray-400 hover:text-purple-400 transition duration-200 text-sm">
            연락처
          </a>
          <a href="/privacy" className="text-gray-400 hover:text-purple-400 transition duration-200 text-sm">
            개인정보 처리방침
          </a>
          <a href="/terms" className="text-gray-400 hover:text-purple-400 transition duration-200 text-sm">
            이용약관
          </a>
        </div>



        {/* Copyright and Disclaimer */}
        <div className="space-y-2">
          <p className="text-gray-500 text-xs">
            © 2025 아이템 인사이트 AI. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            {t('footer.demoDisclaimer')}
          </p>
          <p className="text-gray-500 text-xs">
            Google AdSense 파트너 | 완전 무료 서비스
          </p>
        </div>
      </div>
    </footer>
  );
};
