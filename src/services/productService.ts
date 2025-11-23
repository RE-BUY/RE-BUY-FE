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
  imageUrls?: string[]; // 추가 이미지 배열 (상품마다 개수 다름)
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
 * 이미지 경로를 완전한 URL로 변환
 * @param imagePath 백엔드에서 받은 이미지 경로 (예: /images/products/p1.png)
 * @returns 완전한 이미지 URL (예: http://192.168.45.170:8080/images/products/p1.png)
 */
const getImageFullUrl = (imagePath: string | undefined): string => {
  if (!imagePath) return '';
  // 이미 완전한 URL인 경우 (http:// 또는 https://로 시작)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // 경로만 있는 경우 BASE_URL과 조합
  return `${BASE_URL}${imagePath}`;
};

/**
 * 상품 목록 조회
 * @param params 조회 파라미터 (category, q, page, size)
 * @returns Promise<ProductsResponse>
 */
export const getProducts = async (params?: GetProductsParams): Promise<ProductsResponse> => {
  const response = await apiClient.get<ProductsResponse>('/api/v1/products', {
    params,
  });
  
  // 각 상품의 imageUrl을 완전한 URL로 변환
  const productsWithFullImageUrl = response.data.items.map(product => ({
    ...product,
    imageUrl: getImageFullUrl(product.imageUrl),
  }));
  
  return {
    ...response.data,
    items: productsWithFullImageUrl,
  };
};

/**
 * 상품 상세 조회
 * @param id 상품 ID
 * @returns Promise<Product>
 */
export const getProduct = async (id: number): Promise<Product> => {
  const response = await apiClient.get<Product>(`/api/v1/products/${id}`);
  
  // 디버깅: 원본 응답 확인
  console.log("🔍 productService - 원본 응답 전체:", JSON.stringify(response.data, null, 2));
  console.log("🔍 productService - 원본 응답 키 목록:", Object.keys(response.data));
  console.log("🔍 productService - imageUrls 원본:", response.data.imageUrls);
  console.log("🔍 productService - imageUrl 원본:", response.data.imageUrl);
  
  // imageUrl과 imageUrls를 완전한 URL로 변환
  const transformedProduct = {
    ...response.data,
    imageUrl: getImageFullUrl(response.data.imageUrl),
    imageUrls: response.data.imageUrls 
      ? response.data.imageUrls.map(url => getImageFullUrl(url))
      : undefined,
  };
  
  console.log("🔍 productService - 변환된 imageUrls:", transformedProduct.imageUrls);
  
  return transformedProduct;
};

