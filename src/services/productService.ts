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

export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  manufacturer: string;
  imageUrl: string;
  price: number;
  stock: number;
  ecoBaseScore: number;
  savedCo2Kg: number;
  savedWaterL: number;
  savedOilMl: number;
  savedPlasticG: number;
  dynamicEcoScore: number;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  size: number;
}

export interface GetProductsParams {
  category?: string;
  q?: string;
  page?: number;
  size?: number;
}

/**
 * 상품 목록 조회
 * @param params 조회 파라미터 (category, q, page, size)
 * @returns Promise<ProductsResponse>
 */
export const getProducts = async (params?: GetProductsParams): Promise<ProductsResponse> => {
  const response = await apiClient.get<ProductsResponse>('/api/v1/products', {
    params,
  });
  return response.data;
};

/**
 * 상품 상세 조회
 * @param id 상품 ID
 * @returns Promise<Product>
 */
export const getProduct = async (id: number): Promise<Product> => {
  const response = await apiClient.get<Product>(`/api/v1/products/${id}`);
  return response.data;
};

