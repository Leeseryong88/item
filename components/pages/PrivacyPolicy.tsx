import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-8">
        {t('pages.privacy.title')}
      </h1>
      
      <div className="prose prose-invert max-w-none">
        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">1. 개인정보의 처리목적</h2>
          <p className="text-gray-300 leading-relaxed">
            아이템 인사이트 AI는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
            <li>웹사이트 운영 및 서비스 제공</li>
            <li>이용자 문의 응답 및 고객서비스 제공</li>
            <li>서비스 개선 및 사용자 경험 향상</li>
          </ul>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">2. 개인정보의 처리 및 보유기간</h2>
          <p className="text-gray-300 leading-relaxed">
            본 서비스는 이미지 분석 서비스로, 사용자가 업로드한 이미지는 분석 후 즉시 삭제됩니다. 별도의 개인정보를 수집하지 않으며, 사용자의 IP 주소는 웹 서비스 운영을 위한 최소한의 기간(최대 30일) 동안만 로그로 보관됩니다.
          </p>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">3. 개인정보의 제3자 제공</h2>
          <p className="text-gray-300 leading-relaxed">
            본 서비스는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
          </ul>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">4. 개인정보처리의 위탁</h2>
          <p className="text-gray-300 leading-relaxed">
            본 서비스는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
          </p>
          <div className="mt-4 p-4 bg-gray-700 bg-opacity-50 rounded-lg">
            <p className="text-purple-200 font-semibold">위탁받는 자: Google Cloud Platform</p>
            <p className="text-gray-300">위탁하는 업무의 내용: 클라우드 인프라 서비스 및 데이터 저장</p>
          </div>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">5. 정보주체의 권리·의무 및 행사방법</h2>
          <p className="text-gray-300 leading-relaxed">
            이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다:
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
            <li>개인정보 처리정지 요구권</li>
            <li>개인정보 열람요구권</li>
            <li>개인정보 정정·삭제요구권</li>
            <li>개인정보 처리정지 요구권</li>
          </ul>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">6. 쿠키 사용</h2>
          <p className="text-gray-300 leading-relaxed">
            본 서비스는 사용자 경험 향상과 분석을 위해 쿠키를 사용할 수 있습니다. 이는 언어 설정 저장, Google Analytics를 통한 사용 통계 수집 등의 목적으로 사용됩니다.
          </p>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">7. 개인정보 보호책임자</h2>
          <p className="text-gray-300 leading-relaxed">
            개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div className="mt-4 p-4 bg-gray-700 bg-opacity-50 rounded-lg">
            <p className="text-purple-200 font-semibold">개인정보 보호책임자</p>
            <p className="text-gray-300">연락처: 070-0000-0000</p>
            <p className="text-gray-300">이메일: airiska2025@gmail.com</p>
          </div>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">8. 개인정보처리방침 변경</h2>
          <p className="text-gray-300 leading-relaxed">
            이 개인정보처리방침은 2024년 1월 1일부터 적용됩니다. 개인정보처리방침이 변경되는 경우 웹사이트 공지사항을 통하여 공지할 것입니다.
          </p>
        </section>
      </div>
    </div>
  );
}; 