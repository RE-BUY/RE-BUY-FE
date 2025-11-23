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

export interface Recommendation {
  id: number;
  productName: string;
  reason?: string;
}

export interface RecommendationsResponse {
  recommendations: Recommendation[];
  aiInsight: string;
}

/**
 * AI 상품 추천 조회
 * @param limit 추천 상품 개수 (기본값: 5)
 * @returns Promise<RecommendationsResponse>
 */
export const getRecommendations = async (limit: number = 5): Promise<RecommendationsResponse> => {
  const response = await apiClient.get<RecommendationsResponse>('/api/v1/ai/recommendations', {
    params: {
      limit,
    },
  });
  return response.data;
};

