import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqData: FAQItem[] = [
    {
      id: 1,
      category: 'general',
      question: String(t('pages.faq.items.1.question')),
      answer: String(t('pages.faq.items.1.answer'))
    },
    {
      id: 2,
      category: 'general',
      question: String(t('pages.faq.items.2.question')),
      answer: String(t('pages.faq.items.2.answer'))
    },
    {
      id: 3,
      category: 'general',
      question: String(t('pages.faq.items.3.question')),
      answer: String(t('pages.faq.items.3.answer'))
    },
    {
      id: 4,
      category: 'usage',
      question: String(t('pages.faq.items.4.question')),
      answer: String(t('pages.faq.items.4.answer'))
    },
    {
      id: 5,
      category: 'usage',
      question: String(t('pages.faq.items.5.question')),
      answer: String(t('pages.faq.items.5.answer'))
    },
    {
      id: 6,
      category: 'usage',
      question: String(t('pages.faq.items.6.question')),
      answer: String(t('pages.faq.items.6.answer'))
    },
    {
      id: 7,
      category: 'technical',
      question: String(t('pages.faq.items.7.question')),
      answer: String(t('pages.faq.items.7.answer'))
    },
    {
      id: 8,
      category: 'technical',
      question: String(t('pages.faq.items.8.question')),
      answer: String(t('pages.faq.items.8.answer'))
    },
    {
      id: 9,
      category: 'technical',
      question: String(t('pages.faq.items.9.question')),
      answer: String(t('pages.faq.items.9.answer'))
    },
    {
      id: 10,
      category: 'features',
      question: String(t('pages.faq.items.10.question')),
      answer: String(t('pages.faq.items.10.answer'))
    },
    {
      id: 11,
      category: 'features',
      question: String(t('pages.faq.items.11.question')),
      answer: String(t('pages.faq.items.11.answer'))
    },
    {
      id: 12,
      category: 'features',
      question: String(t('pages.faq.items.12.question')),
      answer: String(t('pages.faq.items.12.answer'))
    }
  ];

  const categories = [
    { id: 'all', name: t('pages.faq.categories.all'), icon: '📋' },
    { id: 'general', name: t('pages.faq.categories.general'), icon: '❓' },
    { id: 'usage', name: t('pages.faq.categories.usage'), icon: '📖' },
    { id: 'technical', name: t('pages.faq.categories.technical'), icon: '🔧' },
    { id: 'features', name: t('pages.faq.categories.features'), icon: '✨' }
  ];

  const filteredFAQ = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleItem = (id: number) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-8">
        {t('pages.faq.title')}
      </h1>
      
      {/* 카테고리 필터 */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition duration-200 flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* FAQ 리스트 */}
      <div className="space-y-4">
        {filteredFAQ.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 bg-opacity-50 rounded-xl shadow-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full p-6 text-left hover:bg-gray-700 hover:bg-opacity-30 transition duration-200 flex items-center justify-between"
            >
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">Q</span>
                </div>
                <h3 className="text-lg font-semibold text-purple-200 leading-relaxed">
                  {item.question}
                </h3>
              </div>
              <div className={`transform transition-transform duration-200 ${
                activeItem === item.id ? 'rotate-180' : ''
              }`}>
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            {activeItem === item.id && (
              <div className="px-6 pb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 추가 도움말 섹션 */}
      <div className="mt-12 p-6 bg-gradient-to-r from-purple-800 to-pink-800 bg-opacity-30 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          💬 {t('pages.faq.needHelpTitle')}
        </h2>
        <p className="text-purple-100 text-center leading-relaxed mb-6">
          {t('pages.faq.needHelpDesc')}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a 
            href="/guide" 
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200 flex items-center space-x-2"
          >
            <span>📖</span>
            <span>{t('pages.faq.viewGuide')}</span>
          </a>
          <a 
            href="/contact" 
            className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition duration-200 flex items-center space-x-2"
          >
            <span>✉️</span>
            <span>{t('pages.faq.contactUs')}</span>
          </a>
        </div>
      </div>

      {/* 검색 제안 */}
      <div className="mt-8 p-4 bg-blue-800 bg-opacity-30 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-200 mb-2">💡 {t('pages.faq.quickTipsTitle')}</h3>
        <div className="text-blue-100 text-sm space-y-1">
          <p>• {t('pages.faq.quickTips.1')}</p>
          <p>• {t('pages.faq.quickTips.2')}</p>
          <p>• {t('pages.faq.quickTips.3')}</p>
          <p>• {t('pages.faq.quickTips.4')}</p>
        </div>
      </div>
    </div>
  );
}; 