import React, { useState } from 'react';
import earthIconImage from '../assets/earth.svg'; // 🚨 [수정] 아이콘 대신 SVG 이미지 import

interface Join1PageProps {
  onGoLogin: () => void;
  onGoJoin2: () => void;
}

const Join1Page: React.FC<Join1PageProps> = ({ onGoLogin, onGoJoin2 }) => {
  // 0: 소개, 1: 폼 입력
  const [signupStep, setSignupStep] = useState<number>(0);

  const handleSignupLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSignupStep(1);
  };

  const handleToLogin = () => {
    if (onGoLogin) {
      onGoLogin();
    } else {
      console.error('onGoLogin Prop 누락');
    }
  };

  // 폼 제출 시 Join2Page(완료 화면)로 이동
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onGoJoin2) {
      onGoJoin2();
    }
  };

  const renderContent = () => {
    // [Step 1] 회원가입 폼
    if (signupStep === 1) {
      return (
        <form
          className="flex w-full max-w-xs flex-col items-center space-y-4 p-6 pt-4"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-6 mt-2 text-3xl font-bold text-[#4F7457]">RE:BUY</h2>
          {/* 🚨 [수정] Globe 아이콘 -> 이미지 태그로 변경 */}
          <img 
            src={earthIconImage} 
            alt="RE:BUY 로고" 
            className="mb-6 h-20 w-20 text-[#4F7457]" 
          />

          {/* 입력 필드들 */}
          <div className="w-full space-y-1">
            <p className="w-full text-left text-sm font-medium text-gray-700">아이디</p>
            <input
              type="text"
              placeholder="아이디를 입력해주세요."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4F7457]"
              required
            />
          </div>
          <div className="w-full space-y-1">
            <p className="w-full text-left text-sm font-medium text-gray-700">비밀번호</p>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4F7457]"
              required
            />
          </div>
          <div className="w-full space-y-1">
            <p className="w-full text-left text-sm font-medium text-gray-700">비밀번호 확인</p>
            <input
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4F7457]"
              required
            />
          </div>
          <div className="w-full space-y-1">
            <p className="w-full text-left text-sm font-medium text-gray-700">연락처</p>
            <input
              type="text"
              placeholder="연락처를 입력해주세요."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4F7457]"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-lg bg-[#8FAB95] py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-[#4F7457]"
          >
            가입하기
          </button>
        </form>
      );
    }

    // [Step 0] 초기 소개 화면
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-8 p-6 text-center pt-10">
        <h2 className="text-3xl font-bold text-[#4F7457]">RE:BUY</h2>
        {/* 🚨 [수정] Globe 아이콘 -> 이미지 태그로 변경 */}
        <img 
          src={earthIconImage} 
          alt="지구 아이콘" 
          className="mb-4 h-28 w-28" 
        />

        <div className="w-full max-w-sm rounded-xl bg-[#D5E4D8] p-8 shadow-lg">
          <h3 className="mb-2 text-xl font-bold text-[#4F7457]">about RE:BUY</h3>
          <p className="text-gray-700">RE:BUY는 친환경 제품을 추천해주고 안내해주는 어플입니다.</p>
          <p className="text-gray-700">회원가입 후 지구를 지켜주세요!</p>
        </div>

        <button
          className="mt-6 w-full max-w-sm rounded-lg bg-[#8FAB95] py-3 font-semibold text-white shadow-md transition-colors hover:bg-[#4F7457]"
          onClick={handleToLogin}
        >
          로그인 후 이용하기
        </button>

        <div className="pt-2 text-center">
          <p className="mb-1 text-sm text-gray-600">아직 RE:BUY 회원이 아니신가요?</p>
          <button
            className="font-semibold text-[#4F7457] hover:underline"
            onClick={handleSignupLinkClick}
          >
            회원가입
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-center border-b border-gray-100 bg-white py-4">
        {/* 🚨 [수정] Globe 아이콘 -> 이미지 태그로 변경 */}
        <img src={earthIconImage} alt="RE:BUY 로고" className="mr-2 h-8 w-8" />
        <span className="text-xl font-bold text-[#388E3C]">RE:BUY</span>
      </header>
      <main className="flex flex-grow flex-col items-center justify-start p-4">
        {renderContent()}
      </main>
    </div>
  );
};

export default Join1Page;