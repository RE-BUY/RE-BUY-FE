import React, { useState } from 'react';
import Layout from "../components/Layout";
import { useNavigate } from 'react-router-dom';

export default function PloggingPage() {
  const navigate = useNavigate();

  // [State] 선택 상태 관리
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isAgreed, setIsAgreed] = useState(false);

  const places = ['경북대', '동성로', '수성못'];
  const times = ['10 : 00 AM', '1 : 00 PM', '4 : 00 PM'];

  // 모든 항목이 선택되었는지 확인
  const isReady = selectedPlace && selectedTime && isAgreed;

  const handleReservation = () => {
    if (!isReady) return;
    alert(`${selectedPlace} / ${selectedTime} 예약이 완료되었습니다! `);
    navigate('/main');
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">
        
        {/* [Top Area] 이미지 영역 */}
        <div className="w-full h-48 relative shrink-0">

          <img 
            src="/images/products/plogging.jpg" 
            alt="플로깅" 
            className="w-full h-full object-cover"
          />
          
      

          {/* 3. 뒤로가기 버튼 */}
          <button 
            onClick={() => navigate(-1)} 
            className="absolute top-4 left-4 text-2xl text-white p-2 z-10"
          >
            &#8249;
          </button>
          
        
        </div>

        {/* [Content Area] */}
        <div className="flex-1 px-6 py-8 flex flex-col">
          
          {/* 헤더 멘트 */}
          <div className="text-center mb-10">
            <p className="text-[#4F7457] font-bold text-lg leading-snug">
              당신도 이제 지구 지킴이!<br />
              리바이 플로깅에 동참해보세요!!
            </p>
          </div>
          {/* 1. 장소 선택 */}
          <section className="mb-8">
            <h3 className="text-lg font-bold text-[#4F7457] mb-4">장소</h3>
            <div className="grid grid-cols-3 gap-3">
              {places.map((place) => (
                <button
                  key={place}
                  onClick={() => setSelectedPlace(place)}
                  className={`h-24 rounded-lg text-base font-medium transition-all duration-200 shadow-sm
                    ${selectedPlace === place 
                      ? 'bg-main text-white ring-2 ring-offset-1 ring-main' // 선택됨
                      : 'bg-sub1 text-gray-700 hover:bg-sub2 hover:text-white' // 선택안됨
                    }`}
                >
                  {place}
                </button>
              ))}
            </div>
          </section>

          {/* 2. 시간 선택 */}
          <section className="mb-10">
            <h3 className="text-lg font-bold text-[#4F7457]  mb-4">시간</h3>
            <div className="grid grid-cols-3 gap-3">
              {times.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`h-24 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm flex items-center justify-center
                    ${selectedTime === time 
                      ? 'bg-main text-white ring-2 ring-offset-1 ring-main' 
                      : 'bg-sub1 text-gray-700 hover:bg-sub2 hover:text-white'
                    }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </section>

          {/* 3. 주의사항 및 동의 */}
          <section className="mb-4 mt-auto">
            <h3 className="text-sm font-bold text-[#4F7457] mb-3">주의사항</h3>
            <div className="text-xs text-gray-500 space-y-1 mb-4">
              <p>리바이에 가입하셨던 개인정보 제공에 동의합니다.</p>
              <p>무단 불참 시 제재가 가해질 수 있음에 동의합니다.</p>
            </div>
            
            <div 
                className="flex justify-end items-center cursor-pointer p-2" 
                onClick={() => setIsAgreed(!isAgreed)}
            >
              <span className="mr-2 font-medium text-[#4F7457]">동의하기</span>
              <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors
                ${isAgreed ? 'border-main bg-main' : 'border-gray1 bg-white'}
              `}>
                {isAgreed && <span className="text-white text-xs font-bold">✓</span>}
              </div>
            </div>
          </section>

          {/* 예약하기 버튼 */}
          <div className="pt-4 pb-4">
             <button
                onClick={handleReservation}
                disabled={!isReady}
                className={`w-full py-4 rounded-xl text-lg font-bold shadow-lg transition-colors
                ${isReady 
                    ? 'bg-main text-white hover:bg-[#3d5a44]' 
                    : 'bg-gray1 text-white cursor-not-allowed'
                }`}
            >
                예약하기
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
}