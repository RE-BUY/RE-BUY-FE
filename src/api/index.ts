import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// 예시: 제품 목록 가져오기
export const getProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE}/products`);
      return response.data;
    } catch (error) {
      console.error('제품 가져오기 실패:', error);
      return [];
    }
  };
  // 최근 본 상품 가져오기
export const getRecentItems = async (): Promise<{ id: number; name: string; img: string }[]> => {
    try {
      const response = await axios.get(`${API_BASE}/recent-items`); // 서버 엔드포인트
      return response.data;
    } catch (error) {
      console.error('최근 본 상품 가져오기 실패:', error);
      return [];
    }
  };
  
  // 유저 정보 가져오기
  export const getUserInfo = async (): Promise<{ name: string; waterSaved: number; treesSaved: number }> => {
    try {
      const response = await axios.get(`${API_BASE}/user-info`); // 서버 엔드포인트
      return response.data;
    } catch (error) {
      console.error('유저 정보 가져오기 실패:', error);
      return { name: '유저', waterSaved: 0, treesSaved: 0 };
    }
  };
  // 예시: 구매 내역 가져오기
  export const getPurchaseHistory = async (userId: string) => {
    try {
      const response = await axios.get(`${API_BASE}/users/${userId}/purchases`);
      return response.data;
    } catch (error) {
      console.error('구매 내역 가져오기 실패:', error);
      return [];
    }
  };
  
  // 예시: 포인트 정보 가져오기
  export const getPointInfo = async (userId: string) => {
    try {
      const response = await axios.get(`${API_BASE}/users/${userId}/points`);
      return response.data;
    } catch (error) {
      console.error('포인트 정보 가져오기 실패:', error);
      return { points: 0 };
    }
  };

  // 플로깅 목록 가져오기
export const getPloggingItems = async (): Promise<{
    id: number;
    place: string;
    time: string;
    capacity: number;
  }[]> => {
    try {
      const response = await axios.get(`${API_BASE}/plogging-items`);
      return response.data;
    } catch (error) {
      console.error('플로깅 목록 가져오기 실패:', error);
      return [];
    }
  };
  
  // 유저 참여 상태 가져오기
  export const getUserPloggingStatus = async (
    userId: string
  ): Promise<Record<number, '참여' | '불참'>> => {
    try {
      const response = await axios.get(`${API_BASE}/users/${userId}/plogging-status`);
      return response.data;
    } catch (error) {
      console.error('유저 플로깅 상태 가져오기 실패:', error);
      return {};
    }
  };
  export const getUserInquiries = async (userId: string) => {
    try {
      const response = await axios.get(`${API_BASE}/users/${userId}/inquiries`);
      return response.data;
    } catch (error) {
      console.error('문의 내역 가져오기 실패:', error);
      return [];
    }
  };