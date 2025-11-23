import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 초기 로딩: localStorage에서 토큰과 로그인 상태 확인
    const token = localStorage.getItem('token');
    const saved = localStorage.getItem('isLoggedIn');
    
    if (token) {
      // 토큰이 있으면 로그인 상태로 설정
      setIsLoggedIn(true);
    } else if (saved) {
      // 토큰은 없지만 저장된 로그인 상태가 있으면 그대로 사용
      setIsLoggedIn(JSON.parse(saved));
    }
    
    // 로딩 완료
    setLoading(false);
  }, []);

  useEffect(() => {
    // isLoggedIn이 변경될 때마다 localStorage에 저장
    if (!loading) {
      localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }
  }, [isLoggedIn, loading]);

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // 토큰도 함께 삭제
    localStorage.removeItem('isLoggedIn'); // 로그인 상태도 삭제
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

