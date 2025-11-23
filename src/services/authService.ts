import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// BASE_URL이 없으면 에러 로그 출력
if (!BASE_URL) {
  console.error('VITE_API_URL 환경 변수가 설정되지 않았습니다. .env 파일을 확인해주세요.');
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

/**
 * 로그인
 * @param username 사용자명
 * @param password 비밀번호
 * @returns Promise<LoginResponse>
 */
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const url = `${BASE_URL}/api/v1/auth/login`;
  console.log('로그인 API URL:', url); // 디버깅용
  
  const response = await axios.post<LoginResponse>(
    url,
    {
      username,
      password,
    } as LoginRequest,
    {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
    }
  );
  return response.data;
};

