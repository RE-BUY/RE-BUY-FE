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

export interface CategoryDistribution {
  [key: string]: number;
}

export interface PurchaseStats {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  categoryDistribution: CategoryDistribution;
  averageEcoScore: number;
}

export interface EnvironmentalImpact {
  co2Saved: number;
  waterSaved: number;
  oilSaved: number;
  plasticSaved: number;
  equivalentTo: string;
}

export interface Ranking {
  userRank: number;
  totalUsers: number;
  rankPercentile: string;
  comparedToAverage: number;
}

export interface MonthlyReportResponse {
  username: string;
  year: number;
  month: number;
  reportGeneratedAt: string;
  purchaseStats: PurchaseStats;
  environmentalImpact: EnvironmentalImpact;
  aiAnalysis: string;
  achievements: string[];
  recommendations: string[];
  ranking: Ranking;
}

/**
 * 현재 월 소비 리포트 조회
 * @returns Promise<MonthlyReportResponse>
 */
export const getCurrentReport = async (): Promise<MonthlyReportResponse> => {
  const response = await apiClient.get<MonthlyReportResponse>('/api/v1/ai/report/current');
  return response.data;
};

