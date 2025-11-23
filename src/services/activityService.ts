import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export interface Activity {
  id: number;
  name: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
  capacity?: number;
  currentParticipants?: number;
  status?: string;
  isApplied?: boolean; // 사용자가 이미 신청했는지 여부
  participationId?: number; // 참여 ID (신청한 경우)
}

export interface ActivitiesResponse {
  items: Activity[];
  total?: number;
  page?: number;
  size?: number;
}

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
    console.log('토큰 확인:', token ? '토큰 있음' : '토큰 없음');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization 헤더 추가됨:', `Bearer ${token.substring(0, 20)}...`);
    } else {
      console.warn('토큰이 없습니다. 로그인을 먼저 해주세요.');
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

/**
 * 활동 목록 조회
 * @returns Promise<ActivitiesResponse>
 */
export const getActivities = async (): Promise<ActivitiesResponse> => {
  const response = await apiClient.get<ActivitiesResponse>('/api/v1/activities');
  return response.data;
};

/**
 * 특정 활동 상세 정보 조회
 * @param activityId 활동 ID
 * @returns Promise<Activity>
 */
export const getActivity = async (activityId: number): Promise<Activity> => {
  const response = await apiClient.get<Activity>(`/api/v1/activities/${activityId}`);
  return response.data;
};

/**
 * 활동 참여 신청
 * @param activityId 활동 ID
 * @returns Promise<string>
 */
export const applyActivity = async (activityId: number): Promise<string> => {
  const response = await apiClient.post<string>(
    `/api/v1/activities/${activityId}/apply`
  );
  return response.data;
};

/**
 * 활동 인증샷 제출
 * @param participationId 참여 ID
 * @param imageUrl 이미지 URL
 * @returns Promise<string>
 */
export const verifyParticipation = async (
  participationId: number,
  imageUrl: string
): Promise<string> => {
  const response = await apiClient.post<string>(
    `/api/v1/activities/participations/${participationId}/verify`,
    null,
    {
      params: {
        imageUrl,
      },
    }
  );
  return response.data;
};

/**
 * [관리자] 인증 승인 및 보상 지급
 * @param participationId 참여 ID
 * @returns Promise<string>
 */
export const confirmParticipation = async (
  participationId: number
): Promise<string> => {
  const response = await apiClient.post<string>(
    `/api/v1/activities/admin/participations/${participationId}/confirm`
  );
  return response.data;
};

