import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export interface PurchaseStats {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  categoryDistribution?: Record<string, number>;
  averageEcoScore: number;
}

export interface EnvironmentalImpact {
  co2Saved: number;
  waterSaved: number;
  oilSaved: number;
  plasticSaved: number;
  equivalentTo?: string;
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
  aiAnalysis?: string;
  achievements?: string[];
  recommendations?: string[];
  ranking: Ranking;
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: 토큰 자동 추가
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

// Response interceptor: 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

/**
 * 현재 월의 소비 리포트를 가져옵니다.
 */
export async function getCurrentReport(): Promise<MonthlyReportResponse> {
  const response = await apiClient.get<MonthlyReportResponse>('/api/v1/ai/report/current');
  return response.data;
}

