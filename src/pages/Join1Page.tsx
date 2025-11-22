import React from 'react';
import { useNavigate } from 'react-router-dom';
import earthIconImage from '../assets/earth.svg';

const Join1Page: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/join2');
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-center border-b border-gray-100 bg-white py-4">
        <img src={earthIconImage} alt="RE:BUY 로고" className="mr-2 h-8 w-8" />
        <span className="text-xl font-bold text-[#388E3C]">RE:BUY</span>
      </header>

      <main className="flex flex-grow flex-col items-center justify-start p-4">
        <form
          className="flex w-full max-w-xs flex-col items-center space-y-4 p-6 pt-4"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-6 mt-2 text-3xl font-bold text-[#4F7457]">회원가입</h2>
          <img 
            src={earthIconImage} 
            alt="RE:BUY 로고" 
            className="mb-6 h-20 w-20 text-[#4F7457]" 
          />

          {/* 아이디 */}
          <div className="w-full space-y-1">
            <p className="w-full text-left text-sm font-medium text-gray-700">아이디</p>
            <input
              type="text"
              placeholder="아이디를 입력해주세요."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4F7457]"
              required
            />
          </div>

          {/* 비밀번호 */}
          <div className="w-full space-y-1">
            <p className="w-full text-left text-sm font-medium text-gray-700">비밀번호</p>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4F7457]"
              required
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="w-full space-y-1">
            <p className="w-full text-left text-sm font-medium text-gray-700">비밀번호 확인</p>
            <input
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4F7457]"
              required
            />
          </div>

          {/* 연락처 */}
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
            다음 단계
          </button>
        </form>
      </main>
    </div>
  );
};

export default Join1Page;
