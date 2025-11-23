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

export interface CheckApplicationResponse {
  isApplied: boolean; // 사용자가 신청했는지 여부
  participationId?: number; // 참여 ID (신청한 경우)
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
 * 활동 목록 조회 (신청 여부 포함)
 * @returns Promise<ActivitiesResponse>
 */
export const getActivities = async (): Promise<ActivitiesResponse> => {
  const response = await apiClient.get<ActivitiesResponse>('/api/v1/activities');
  const activities = response.data;
  
  // 각 활동에 대해 신청 여부 확인
  if (activities.items && activities.items.length > 0) {
    const checkPromises = activities.items.map(async (activity) => {
      try {
        const checkResult = await checkApplication(activity.id);
        return {
          ...activity,
          isApplied: checkResult.isApplied,
          participationId: checkResult.participationId,
        };
      } catch (error) {
        // checkApplication 실패 시 기본값 사용
        console.warn(`활동 ${activity.id} 신청 여부 확인 실패:`, error);
        return {
          ...activity,
          isApplied: false,
          participationId: undefined,
        };
      }
    });
    
    const activitiesWithStatus = await Promise.all(checkPromises);
    return {
      ...activities,
      items: activitiesWithStatus,
    };
  }
  
  return activities;
};

/**
 * 특정 활동 상세 정보 조회 (신청 여부 포함)
 * @param activityId 활동 ID
 * @returns Promise<Activity>
 */
export const getActivity = async (activityId: number): Promise<Activity> => {
  const response = await apiClient.get<Activity>(`/api/v1/activities/${activityId}`);
  const activity = response.data;
  
  // 신청 여부 확인
  try {
    const checkResult = await checkApplication(activityId);
    return {
      ...activity,
      isApplied: checkResult.isApplied,
      participationId: checkResult.participationId,
    };
  } catch (error) {
    // checkApplication 실패 시 기본값 사용
    console.warn(`활동 ${activityId} 신청 여부 확인 실패:`, error);
    return {
      ...activity,
      isApplied: false,
      participationId: undefined,
    };
  }
};

/**
 * 내가 신청한 활동 목록 조회
 * @returns Promise<ActivitiesResponse>
 */
export const getMyApplications = async (): Promise<ActivitiesResponse> => {
  console.log('📡 GET /api/v1/activities/my-applications 호출');
  const response = await apiClient.get<ActivitiesResponse>('/api/v1/activities/my-applications');
  console.log('📥 응답 원본:', response);
  console.log('📥 응답 데이터:', response.data);
  console.log('📥 응답 데이터 타입:', typeof response.data);
  console.log('📥 response.data.items:', response.data.items);
  return response.data;
};

/**
 * 활동 신청 여부 확인
 * @param activityId 활동 ID
 * @returns Promise<CheckApplicationResponse>
 */
export const checkApplication = async (activityId: number): Promise<CheckApplicationResponse> => {
  const response = await apiClient.get<CheckApplicationResponse>(
    `/api/v1/activities/${activityId}/check-application`
  );
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

