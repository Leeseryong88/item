import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export const TermsOfService: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-8">
        {t('pages.terms.title')}
      </h1>
      
      <div className="prose prose-invert max-w-none">
        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">제1조 (목적)</h2>
          <p className="text-gray-300 leading-relaxed">
            이 약관은 아이템 인사이트 AI 웹사이트(이하 "사이트")에서 제공하는 게임 아이템 분석 서비스(이하 "서비스")의 이용조건 및 절차에 관한 사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">제2조 (정의)</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            이 약관에서 사용하는 용어의 정의는 다음과 같습니다:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><strong>"서비스"</strong>란 사이트에서 제공하는 게임 아이템 이미지 분석 및 정보 제공 서비스를 의미합니다.</li>
            <li><strong>"이용자"</strong>란 사이트에 접속하여 서비스를 이용하는 모든 개인을 의미합니다.</li>
            <li><strong>"콘텐츠"</strong>란 사이트에서 제공하는 정보, 텍스트, 이미지, 분석 결과 등을 의미합니다.</li>
          </ul>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">제3조 (약관의 효력 및 변경)</h2>
          <p className="text-gray-300 leading-relaxed">
            1. 이 약관은 사이트에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.<br/>
            2. 사이트는 합리적인 사유가 발생할 경우 관련 법령에 위배되지 않는 범위에서 이 약관을 변경할 수 있습니다.<br/>
            3. 약관이 변경되는 경우, 변경된 약관의 적용일자 및 변경사유를 명시하여 현행약관과 함께 사이트에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.
          </p>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">제4조 (서비스의 제공)</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            사이트는 다음과 같은 서비스를 제공합니다:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>게임 아이템 이미지 업로드 및 AI 분석 서비스</li>
            <li>아이템 정보, 옵션, 가치 평가 제공</li>
            <li>사용 가이드 및 추천 정보 제공</li>
            <li>기타 관련 부가 서비스</li>
          </ul>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">제5조 (서비스 이용)</h2>
          <p className="text-gray-300 leading-relaxed">
            1. 서비스는 무료로 제공되며, 별도의 회원가입 없이 이용할 수 있습니다.<br/>
            2. 이용자는 관련 법령, 이 약관의 규정, 이용안내 및 서비스상에 공지한 주의사항을 준수하여야 합니다.<br/>
            3. 서비스는 24시간 연중무휴로 제공됩니다. 다만, 시스템 정기점검, 증설 및 교체를 위해 사이트가 정한 날이나 시간에는 서비스가 일시 중단될 수 있습니다.
          </p>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">제6조 (이용자의 의무)</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            이용자는 다음 행위를 하여서는 안 됩니다:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>서비스를 이용하여 얻은 정보를 무단으로 복제, 유통, 조작하거나 상업적으로 이용하는 행위</li>
            <li>사이트의 서버에 부하를 주거나 서비스 제공을 방해하는 행위</li>
            <li>타인의 개인정보, 등록정보, 신용정보 등을 도용하는 행위</li>
            <li>욕설, 저속하거나 음란한 언어의 사용 및 기타 공서양속에 반하는 행위</li>
            <li>관련 법령에 위배되는 행위</li>
          </ul>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">제7조 (면책조항)</h2>
          <p className="text-gray-300 leading-relaxed">
            1. 사이트는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.<br/>
            2. 사이트는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.<br/>
            3. 사이트는 AI 분석 결과의 정확성을 보장하지 않으며, 분석 결과로 인한 손해에 대해 책임을 지지 않습니다.<br/>
            4. 분석 결과는 참고용으로만 사용되어야 하며, 실제 게임 내 결정에 대한 책임은 이용자에게 있습니다.
          </p>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">제8조 (저작권)</h2>
          <p className="text-gray-300 leading-relaxed">
            1. 사이트가 제공하는 서비스, 그에 필요한 소프트웨어, 이미지, 마크, 로고, 디자인, 서비스명칭, 정보 및 상표 등과 관련된 지적재산권 및 기타 권리는 사이트에 소유권이 있습니다.<br/>
            2. 이용자는 사이트가 명시적으로 승인한 경우를 제외하고는 전항의 소정의 각 재산에 대한 전부 또는 일부의 수정, 대여, 대출, 판매, 배포, 제작, 양도, 재라이센스, 담보권 설정 행위, 상업적 이용 행위를 할 수 없습니다.
          </p>
        </section>

        <section className="mb-8 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">제9조 (준거법 및 분쟁해결)</h2>
          <p className="text-gray-300 leading-relaxed">
            1. 이 약관의 해석 및 사이트와 이용자 간의 분쟁에 대하여는 대한민국의 법을 적용합니다.<br/>
            2. 서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 민사소송법상의 관할법원에 제기합니다.
          </p>
        </section>

        <div className="mt-8 p-4 bg-purple-800 bg-opacity-30 rounded-lg">
          <p className="text-center text-purple-200">
            <strong>시행일: 2024년 1월 1일</strong>
          </p>
        </div>
      </div>
    </div>
  );
}; 