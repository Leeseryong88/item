import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

export const LoadingSpinner: React.FC = () => {
  const { t } = useTranslation();
  const [currentPhase, setCurrentPhase] = useState(1);
  const [currentMessage, setCurrentMessage] = useState('');
  const [fadeClass, setFadeClass] = useState('opacity-100');

  useEffect(() => {
    // 각 단계별 지속 시간 (밀리초)
    const phaseDurations = [2000, 2500, 2000, 1500]; // 총 8초
    
    const getRandomMessage = (phase: number): string => {
      const messages = t(`loading.funMessages.phase${phase}`) as string[];
      if (Array.isArray(messages)) {
        return messages[Math.floor(Math.random() * messages.length)];
      }
      return messages;
    };

    // 초기 메시지 설정
    setCurrentMessage(getRandomMessage(1));

    const timeouts: NodeJS.Timeout[] = [];
    let totalTime = 0;

    // 각 단계별로 타이머 설정
    for (let phase = 1; phase <= 4; phase++) {
      const timeout = setTimeout(() => {
        // 페이드 아웃
        setFadeClass('opacity-0');
        
        // 페이드 아웃 후 메시지 변경
        setTimeout(() => {
          setCurrentPhase(phase);
          setCurrentMessage(getRandomMessage(phase));
          setFadeClass('opacity-100');
        }, 300);
      }, totalTime);
      
      timeouts.push(timeout);
      totalTime += phaseDurations[phase - 1];
    }

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [t]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      <div 
        className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-purple-500" 
        role="status" 
        aria-label={t('loading.analyzing')}
      ></div>
      
      <div className="text-center space-y-2">
        <p className="text-xl text-purple-300 font-semibold">
          {t('loading.analyzing')}
        </p>
        
        <div 
          className={`transition-opacity duration-300 ${fadeClass} min-h-[1.5rem]`}
        >
          <p className="text-lg text-purple-200 font-medium">
            {currentMessage}
          </p>
        </div>
        
        {/* 단계 표시 점들 */}
        <div className="flex justify-center space-x-2 pt-4">
          {[1, 2, 3, 4].map((phase) => (
            <div
              key={phase}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentPhase >= phase 
                  ? 'bg-purple-400 scale-110' 
                  : 'bg-purple-800'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
