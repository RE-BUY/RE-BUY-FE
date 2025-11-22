import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import earthIconImage from '../assets/earth.svg'; // 🚨 [기존과 동일] SVG 이미지 import

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    id: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('로그인 시도:', loginData);
    
    navigate('/main'); 
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-center border-b border-gray-100 bg-white py-4">
        <img src={earthIconImage} alt="RE:BUY 로고" className="mr-2 h-8 w-8" />
        <span className="text-xl font-bold text-[#388E3C]">RE:BUY</span>
      </header>

      <main className="flex flex-grow flex-col items-center justify-center p-6">
        <div className="mb-8 flex flex-col items-center">
          <h2 className="mb-4 text-3xl font-bold text-[#4F7457]">LOGIN</h2>
          <img 
            src={earthIconImage} 
            alt="RE:BUY 로고" 
            className="h-24 w-24" 
          />
        </div>

        <form 
          className="flex w-full max-w-xs flex-col items-center space-y-4"
          onSubmit={handleLogin}
        >
          <div className="w-full space-y-1">
            <p className="w-full text-left text-sm font-medium text-gray-700">아이디</p>
            <input
              type="text"
              name="id"
              value={loginData.id}
              onChange={handleChange}
              placeholder="아이디를 입력해주세요."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4F7457]"
              required
            />
          </div>

          <div className="w-full space-y-1">
            <p className="w-full text-left text-sm font-medium text-gray-700">비밀번호</p>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4F7457]"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-lg bg-[#8FAB95] py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-[#4F7457]"
          >
            로그인
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            아직 계정이 없으신가요?{' '}
            <button 
              onClick={() => navigate('/join1')}
              className="font-semibold text-[#4F7457] hover:underline"
            >
              회원가입
            </button>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;