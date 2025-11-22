import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import earthIconImage from '../assets/earth.svg';

const Join1Page: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    // 기본 검증 (필요하다면 강화 가능)
    if (!form.email || !form.password || !form.passwordConfirm || !form.name) {
      alert('필수 정보를 입력해주세요.');
      return;
    }
    if (form.password !== form.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    navigate('/join2');
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-center border-b border-[#D5E4D8] bg-white py-4">
        <img src={earthIconImage} alt="RE:BUY 로고" className="mr-2 h-8 w-8" />
        <span className="text-xl font-bold text-[#4F7457]">RE:BUY</span>
      </header>

      {/* Form */}
      <main className="flex flex-grow flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="이메일"
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="이름"
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="비밀번호"
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <input
            type="password"
            name="passwordConfirm"
            value={form.passwordConfirm}
            onChange={onChange}
            placeholder="비밀번호 확인"
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          <button
            onClick={handleNext}
            className="w-full rounded-lg bg-[#4F7457] py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-[#8FAB95]"
          >
            다음
          </button>
        </div>
      </main>
    </div>
  );
};

export default Join1Page;
