import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import earthIconImage from '../assets/earth.svg'; 

const Join1Page: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    contact: '',
  });

  const [errors, setErrors] = useState({
    passwordConfirm: '',
    contact: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 비밀번호 확인 검증
    if (name === 'passwordConfirm') {
      if (formData.password && value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          passwordConfirm: '비밀번호가 틀렸습니다',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          passwordConfirm: '',
        }));
      }
    }

    // 비밀번호 변경 시 비밀번호 확인도 다시 검증
    if (name === 'password') {
      if (formData.passwordConfirm && value !== formData.passwordConfirm) {
        setErrors((prev) => ({
          ...prev,
          passwordConfirm: '비밀번호가 틀렸습니다',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          passwordConfirm: '',
        }));
      }
    }

    // 연락처 형식 검증
    if (name === 'contact') {
      const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
      if (value && !phoneRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          contact: '전화번호 형식이 틀렸습니다',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          contact: '',
        }));
      }
    }
  };

  // 폼 제출 시 Join2Page(완료 화면)로 이동
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 최종 검증
    const newErrors = {
      passwordConfirm: '',
      contact: '',
    };

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 틀렸습니다';
    }

    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    if (formData.contact && !phoneRegex.test(formData.contact)) {
      newErrors.contact = '전화번호 형식이 틀렸습니다';
    }

    setErrors(newErrors);

    // 에러가 있으면 제출하지 않음
    if (newErrors.passwordConfirm || newErrors.contact) {
      return;
    }

    // API 호출 로직이 들어갈 자리
    navigate('/join2');
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
    

      {/* 메인 컨텐츠: 바로 입력 폼이 나옵니다 */}
      <main className="flex flex-grow flex-col items-center justify-start p-6 pt-12 mx-4 overflow-y-auto">
        <div className="mb-8 flex flex-col items-center">
          <h2 className="mt-[46px] text-3xl font-bold text-[#4F7457]">RE:BUY</h2>
          <img 
            src={earthIconImage} 
            alt="RE:BUY 로고" 
            className="h-28 w-28" 
          />
        </div>
        <form
          className="flex w-full flex-col items-center mx-12"
          onSubmit={handleSubmit}
        >

          {/* 입력 필드들 */}
          <div className="w-full space-y-1">
            <p className="w-full text-left text-sm font-medium text-gray-700">아이디</p>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="아이디를 입력해주세요."
              className="w-full h-11 rounded-[10px] border border-[#8FAB95] bg-white px-4 focus:outline-none focus:ring-1 focus:ring-[#8FAB95]"
              required
            />
          </div>
          <div className="w-full space-y-1 mt-[8px]">
            <p className="w-full text-left text-sm font-medium text-gray-700">비밀번호</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요."
              className="w-full h-11 rounded-[10px] border border-[#8FAB95] bg-white px-4 focus:outline-none focus:ring-1 focus:ring-[#8FAB95]"
              required
            />
          </div>
          <div className="w-full space-y-1 mt-[8px]">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-700">비밀번호 확인</p>
              {errors.passwordConfirm && (
                <p className="text-xs text-red-500 whitespace-nowrap">{errors.passwordConfirm}</p>
              )}
            </div>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="비밀번호를 한번 더 입력해주세요."
              className="w-full h-11 rounded-[10px] border border-[#8FAB95] bg-white px-4 focus:outline-none focus:ring-1 focus:ring-[#8FAB95]"
              required
            />
          </div>
          <div className="w-full space-y-1 mt-[8px]">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-700">연락처</p>
              {errors.contact && (
                <p className="text-xs text-red-500 whitespace-nowrap">{errors.contact}</p>
              )}
            </div>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="000-0000-0000"
              className="w-full h-11 rounded-[10px] border border-[#8FAB95] bg-white px-4 focus:outline-none focus:ring-1 focus:ring-[#8FAB95]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-[22px] px-12 py-3 bg-sub2 text-white rounded-xl font-semibold"
          >
            가입하기
          </button>
        </form>
      </main>
    </div>
  );
};

export default Join1Page;