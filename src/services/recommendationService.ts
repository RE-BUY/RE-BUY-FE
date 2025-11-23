import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export interface Recommendation {
  id: number;
  productName: string;
  reason?: string;
}

export interface RecommendationsResponse {
  recommendations: Recommendation[];
  aiInsight: string;
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
 * AI 상품 추천을 가져옵니다.
 * @param limit 추천 상품 개수 (기본값: 5)
 */
export async function getRecommendations(limit: number = 5): Promise<RecommendationsResponse> {
  const response = await apiClient.get<RecommendationsResponse>('/api/v1/ai/recommendations', {
    params: { limit },
  });
  return response.data;
}

