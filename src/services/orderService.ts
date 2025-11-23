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

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  orderItems: OrderItemRequest[];
}

export interface CreateOrderResponse {
  orderId: number;
  message?: string;
}

export interface OrderItem {
  orderId: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  totalAmount: number;
  amountPaid: number;
  creditUsed: number;
  creditEarned: number;
  paidAt: string;
  createdAt: string;
}

export interface OrderDetailItem {
  id: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineAmount: number;
  ecoScore: number;
}

export interface OrderDetail {
  orderId: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  totalAmount: number;
  amountPaid: number;
  creditUsed: number;
  creditEarned: number;
  environmentScoreGain: number;
  paidAt: string;
  createdAt: string;
  receiverName: string;
  address: string;
  contactPhone: string;
  items: OrderDetailItem[];
}

export interface OrdersResponse {
  items: OrderItem[];
  total: number;
  page: number;
  size: number;
}

export interface CheckoutRequest {
  creditToUse: number;
  receiverName: string;
  address: string;
  contactPhone: string;
}

export interface CheckoutResponse {
  orderId: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  totalAmount: number;
  amountPaid: number;
  creditUsed: number;
  creditEarned: number;
  environmentScoreGain: number;
  paidAt: string;
  createdAt: string;
  receiverName: string;
  address: string;
  contactPhone: string;
  items: OrderDetailItem[];
}

/**
 * 주문 생성
 * @param orderItems 주문할 상품 목록 (배열)
 * @returns Promise<CreateOrderResponse>
 */
export const createOrder = async (
  orderItems: OrderItemRequest[]
): Promise<CreateOrderResponse> => {
  const response = await apiClient.post<CreateOrderResponse>(
    '/api/v1/orders',
    {
      orderItems,
    } as CreateOrderRequest
  );
  return response.data;
};

/**
 * 주문 목록 조회
 * @param page 페이지 번호 (기본값: 0)
 * @param size 페이지 크기 (기본값: 10)
 * @returns Promise<OrdersResponse>
 */
export const getOrders = async (page: number = 0, size: number = 10): Promise<OrdersResponse> => {
  const response = await apiClient.get<OrdersResponse>('/api/v1/orders', {
    params: {
      page,
      size,
    },
  });
  return response.data;
};

/**
 * 주문 상세 조회
 * @param orderId 주문 ID
 * @returns Promise<OrderDetail>
 */
export const getOrderDetail = async (orderId: number): Promise<OrderDetail> => {
  const response = await apiClient.get<OrderDetail>(`/api/v1/orders/${orderId}`);
  return response.data;
};

/**
 * 주문 상태 변경
 * @param orderId 주문 ID
 * @param status 변경할 상태 ('PENDING' | 'COMPLETED' | 'CANCELLED')
 * @returns Promise<OrderItem>
 */
export const updateOrderStatus = async (
  orderId: number,
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED'
): Promise<OrderItem> => {
  const response = await apiClient.patch<OrderItem>(
    `/api/v1/orders/${orderId}/status`,
    {
      status,
    }
  );
  return response.data;
};

/**
 * 장바구니 전체 주문 (체크아웃)
 * @param checkoutData 체크아웃 정보 (creditToUse, receiverName, address, contactPhone)
 * @returns Promise<CheckoutResponse>
 */
export const checkoutOrder = async (
  checkoutData: CheckoutRequest
): Promise<CheckoutResponse> => {
  const response = await apiClient.post<CheckoutResponse>(
    '/api/v1/orders/checkout',
    checkoutData
  );
  return response.data;
};

