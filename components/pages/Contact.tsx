import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // mailto 링크로 이메일 클라이언트 열기
    const subject = `[아이템 인사이트 AI] ${formData.subject} - ${formData.name}님의 문의`;
    const body = `이름: ${formData.name}\n이메일: ${formData.email}\n문의 유형: ${formData.subject}\n\n메시지:\n${formData.message}`;
    const mailtoLink = `mailto:airiska2025@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(mailtoLink);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-8">
        {t('pages.contact.title')}
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* 연락처 정보 */}
        <div className="space-y-6">
          <section className="p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-purple-300 mb-4">{t('pages.contact.contactInfo')}</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">📧</span>
                </div>
                <div>
                  <p className="text-purple-200 font-semibold">{t('pages.contact.email')}</p>
                  <p className="text-gray-300">{t('pages.contact.emailAddress')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🕒</span>
                </div>
                <div>
                  <p className="text-purple-200 font-semibold">{t('pages.contact.responseTime')}</p>
                  <p className="text-gray-300">{t('pages.contact.businessHours')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🌍</span>
                </div>
                <div>
                  <p className="text-purple-200 font-semibold">{t('pages.contact.supportLanguages')}</p>
                  <p className="text-gray-300">{t('pages.contact.languages')}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-purple-300 mb-4">{t('pages.contact.faqSection')}</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-700 bg-opacity-50 rounded-lg">
                <p className="text-purple-200 font-semibold text-sm mb-1">{t('pages.contact.faq1.q')}</p>
                <p className="text-gray-300 text-sm">{t('pages.contact.faq1.a')}</p>
              </div>
              <div className="p-3 bg-gray-700 bg-opacity-50 rounded-lg">
                <p className="text-purple-200 font-semibold text-sm mb-1">{t('pages.contact.faq2.q')}</p>
                <p className="text-gray-300 text-sm">{t('pages.contact.faq2.a')}</p>
              </div>
              <div className="p-3 bg-gray-700 bg-opacity-50 rounded-lg">
                <p className="text-purple-200 font-semibold text-sm mb-1">{t('pages.contact.faq3.q')}</p>
                <p className="text-gray-300 text-sm">{t('pages.contact.faq3.a')}</p>
              </div>
            </div>
            <div className="mt-4">
              <a 
                href="/faq" 
                className="text-purple-400 hover:text-purple-300 text-sm underline"
              >
                {t('pages.contact.moreFaq')}
              </a>
            </div>
          </section>

        </div>

        {/* 문의하기 폼 */}
        <div>
          <section className="p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-purple-300 mb-4">{t('pages.contact.inquiryForm')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-purple-200 font-semibold mb-2">
                  {t('pages.contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={String(t('pages.contact.form.namePlaceholder'))}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-purple-200 font-semibold mb-2">
                  {t('pages.contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={String(t('pages.contact.form.emailPlaceholder'))}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-purple-200 font-semibold mb-2">
                  {t('pages.contact.form.subject')}
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">{t('pages.contact.form.subjectPlaceholder')}</option>
                  <option value="general">{t('pages.contact.form.subjectGeneral')}</option>
                  <option value="bug">{t('pages.contact.form.subjectBug')}</option>
                  <option value="feature">{t('pages.contact.form.subjectFeature')}</option>
                  <option value="game">{t('pages.contact.form.subjectGame')}</option>
                  <option value="business">{t('pages.contact.form.subjectBusiness')}</option>
                  <option value="other">{t('pages.contact.form.subjectOther')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-purple-200 font-semibold mb-2">
                  {t('pages.contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
                  placeholder={String(t('pages.contact.form.messagePlaceholder'))}
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition duration-200 transform hover:scale-105"
              >
                {t('pages.contact.form.submit')}
              </button>
            </form>
          </section>

          <div className="mt-6 p-4 bg-blue-800 bg-opacity-30 rounded-lg">
            <p className="text-blue-200 text-sm">
              <strong>{t('pages.contact.note')}</strong> {t('pages.contact.noteText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 