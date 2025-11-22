import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import earthIconImage from '../assets/earth.svg';

const Join2Page: React.FC = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  return (
    <div className="flex flex-col w-full h-full bg-white text-main">
      <main className="flex flex-col items-center justify-start mt-[74px] px-10 text-center">
        
        {/* RE:BUY 로고 텍스트 */}
        <h1 className="text-[40px] font-black tracking-wide text-main mb-3">
          RE:BUY
        </h1>

        {/* 가입 완료 문구 */}
        <p className="text-lg font-medium text-main mb-16">
          회원가입이 완료되었습니다.
        </p>

        {/* 지구 아이콘 */}
        <img
          src={earthIconImage}
          alt="earth icon"
          className="w-40 h-40 mb-6 opacity-95"
        />

        {/* 안내 문구 */}
        <p className="text-sm text-main leading-relaxed mb-11">
          RE:BUY와 함께 더 나은 내일을 만들어봐요!
        </p>

        {/* 홈으로 가기 버튼 */}
        <button
          onClick={() => {
            setIsLoggedIn(true);
            navigate('/home');
          }}
          className="w-full max-w-xs py-3 bg-[#8FAB95] text-white rounded-xl font-semibold text-base"
        >
          홈으로 가기
        </button>

        {/* about */}
        <div className="text-center mb-10">
          <p className="text-xs mt-4 text-gray-500">RE:BUY에 관하여 더 궁금하신가요?</p>
          <button
            className="text-sm text-main underline mt-1"
            onClick={() => navigate("/main")}
          >
            about RE:BUY
          </button>
        </div>
      </main>
    </div>
  );
};

export default Join2Page;
