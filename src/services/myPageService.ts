import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 토큰 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 처리
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export interface RecentOrder {
  orderId: number;
  orderDate: string;
  representativeProductName: string;
  totalAmount: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

export interface MonthlyEcoStat {
  yearMonth: string;
  totalAmount: number;
  score: number;
}

export interface MyPageResponse {
  username: string;
  totalCredit: number;
  totalEcoScore: number;
  pineTreeCount: number;
  recentOrders: RecentOrder[];
  monthlyEcoStats: MonthlyEcoStat[];
}

/**
 * 마이페이지 메인 정보 조회
 * @returns Promise<MyPageResponse>
 */
export const getMyPageInfo = async (): Promise<MyPageResponse> => {
  const response = await apiClient.get<MyPageResponse>('/api/mypage');
  return response.data;
};

