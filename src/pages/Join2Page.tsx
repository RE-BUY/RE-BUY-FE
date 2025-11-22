import React from 'react';
import { useNavigate } from 'react-router-dom';
import earthIconImage from '../assets/earth.svg';

const Join2Page: React.FC = () => {
  const navigate = useNavigate();

  const handleGoLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-center border-b border-[#D5E4D8] bg-white py-4">
        <img
          src={earthIconImage}
          alt="RE:BUY 로고"
          className="mr-2 h-8 w-8"
        />
        <span className="text-xl font-bold text-[#4F7457]">RE:BUY</span>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow flex-col items-center justify-center p-6 text-center">
        <img
          src={earthIconImage}
          alt="가입 완료 아이콘"
          className="mb-6 h-24 w-24 opacity-80"
        />

        <h2 className="mb-2 text-3xl font-bold text-[#4F7457]">
          가입 완료!
        </h2>

        <p className="mb-8 text-gray-600">
          RE:BUY의 회원이 되신 것을 환영합니다.<br />
          지금 바로 로그인을 진행해주세요.
        </p>

        <button
          onClick={handleGoLogin}
          className="w-full max-w-xs rounded-lg bg-[#4F7457] py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-[#8FAB95]"
        >
          로그인하러 가기
        </button>
      </main>
    </div>
  );
};


export default Join2Page;
