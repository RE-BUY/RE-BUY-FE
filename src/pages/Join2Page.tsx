import React from 'react';
import earthIconImage from '../assets/earth.svg'; // 🚨 [수정] 아이콘 대신 SVG 이미지 import

interface Join2PageProps {
  onGoHome: () => void;
}

const Join2Page: React.FC<Join2PageProps> = ({ onGoHome }) => {
  
  const handleToHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      alert('라우팅 오류: 홈 경로가 설정되지 않았습니다.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 상단바 */}
      <header className="flex items-center justify-center border-b border-gray-100 bg-white py-4">
        <img src={earthIconImage} alt="RE:BUY 로고" className="mr-2 h-8 w-8 rounded-full" />
        <span className="text-xl font-bold text-[#388E3C]">RE:BUY</span>
      </header>

      {/* 메인 콘텐츠: 완료 메시지 */}
      <main className="flex flex-grow flex-col items-center justify-start p-6 text-center">
        <h2 className="mb-8 mt-12 text-3xl font-bold text-[#4F7457]">RE:BUY</h2>

        <img
          src={earthIconImage}
          alt="RE:BUY 로고"
          className="mb-6 mt-4 h-24 w-24 rounded-full"
        />

        <p className="text-lg font-semibold text-gray-800">
          회원가입이 완료되었습니다.
        </p>
        <p className="mt-2 text-gray-600">
          RE:BUY와 함께 더 나은 내일을 만들어 보아요!
        </p>

        <div className="flex flex-col items-center pt-10 text-sm text-gray-500">
          <p>RE:BUY에 관하여 더 궁금하신가요?</p>
          <button className="mt-1 font-semibold text-[#4F7457] underline hover:text-[#8FAB95]">
            about RE:BUY
          </button>
        </div>

        <button
          className="mt-12 w-full max-w-xs rounded-lg bg-[#8FAB95] py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-[#4F7457]"
          onClick={handleToHome}
        >
          홈으로 가기
        </button>
      </main>
    </div>
  );
};

export default Join2Page;