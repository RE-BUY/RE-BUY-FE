import React from 'react';
import { useNavigate } from 'react-router-dom';
import earthIconImage from '../assets/earth.svg'; 

const Join1Page: React.FC = () => {
  const navigate = useNavigate();

  // 폼 제출 시 Join2Page(완료 화면)로 이동
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API 호출 로직이 들어갈 자리
    navigate('/join-complete'); // 라우터 설정에 따라 '/join2' 혹은 '/join-complete'로 수정
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
    

      {/* 메인 컨텐츠: 바로 입력 폼이 나옵니다 */}
      <main className="flex flex-grow flex-col items-center justify-start p-4">
        <form
          className="flex w-full max-w-xs flex-col items-center space-y-4 p-6 pt-10"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-6 mt-2 text-3xl font-bold text-[#4F7457]">RE:BUY</h2>
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
      </main>
    </div>
  );
};

export default Join1Page;