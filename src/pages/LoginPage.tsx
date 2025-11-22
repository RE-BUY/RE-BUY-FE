import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import earthIconImage from '../assets/earth.svg';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    id: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    id: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 입력 시 에러 메시지 초기화
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation 체크
    const newErrors = {
      id: '',
      password: '',
    };

    if (!loginData.id.trim()) {
      newErrors.id = '아이디를 입력해주세요.';
    }

    if (!loginData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }

    setErrors(newErrors);

    // 에러가 있으면 제출하지 않음
    if (newErrors.id || newErrors.password) {
      return;
    }

    console.log('로그인 시도:', loginData);
    
    navigate('/main'); 
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex flex-grow flex-col items-center justify-start p-6 pt-12 mx-4 overflow-y-auto">
        <div className="mb-8 flex flex-col items-center">
          <h2 className="mt-[46px] text-3xl font-bold text-[#4F7457]">LOGIN</h2>
          <img 
            src={earthIconImage} 
            alt="RE:BUY 로고" 
            className="h-28 w-28" 
          />
        </div>

        <form 
          className="flex w-full flex-col items-center mx-12"
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
              className="w-full h-11 rounded-[10px] border border-[#8FAB95] bg-white px-4 focus:outline-none focus:ring-1 focus:ring-[#8FAB95]"
            />
            <div className="h-5">
              {errors.id && (
                <p className="text-sm text-red-500 mt-1">{errors.id}</p>
              )}
            </div>
          </div>

          <div className="w-full space-y-1 mt-[8px]">
            <p className="w-full text-left text-sm font-medium text-gray-700">비밀번호</p>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요."
              className="w-full h-11 rounded-[10px] border border-[#8FAB95] bg-white px-4 focus:outline-none focus:ring-1 focus:ring-[#8FAB95]"
            />
            <div className="h-5">
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-[22px] px-12 py-3 bg-sub2 text-white rounded-xl font-semibold"
          >
            로그인
          </button>
        </form>

        <div className="mt-8 text-center">
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