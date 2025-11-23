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

export interface CartItem {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineAmount: number;
  ecoScore: number;
}

export interface CartResponse {
  items: CartItem[];
  totalAmount: number;
  totalEcoScore: number;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

/**
 * 장바구니에 상품 추가
 * @param productId 상품 ID
 * @param quantity 수량
 * @returns Promise<CartResponse>
 */
export const addToCart = async (productId: number, quantity: number): Promise<CartResponse> => {
  const response = await apiClient.post<CartResponse>(
    '/api/v1/cart/items',
    {
      productId,
      quantity,
    } as AddToCartRequest
  );
  return response.data;
};

/**
 * 장바구니 조회
 * @returns Promise<CartResponse>
 */
export const getCart = async (): Promise<CartResponse> => {
  const response = await apiClient.get<CartResponse>('/api/v1/cart');
  return response.data;
};

/**
 * 장바구니에서 상품 삭제
 * @param productId 상품 ID
 * @returns Promise<CartResponse>
 */
export const removeFromCart = async (productId: number): Promise<CartResponse> => {
  const response = await apiClient.delete<CartResponse>(`/api/v1/cart/items/${productId}`);
  return response.data;
};

/**
 * 장바구니 상품 수량 업데이트
 * @param productId 상품 ID
 * @param quantity 수량
 * @returns Promise<CartResponse>
 */
export const updateCartItem = async (productId: number, quantity: number): Promise<CartResponse> => {
  const response = await apiClient.patch<CartResponse>(
    `/api/v1/cart/items/${productId}`,
    {
      productId,
      quantity,
    }
  );
  return response.data;
};

/**
 * 장바구니 전체 비우기
 * @returns Promise<CartResponse>
 */
export const clearCart = async (): Promise<CartResponse> => {
  const response = await apiClient.delete<CartResponse>('/api/v1/cart/clear');
  return response.data;
};

