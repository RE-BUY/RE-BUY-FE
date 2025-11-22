import axiosClient from "./axiosClient";

// 최근 본 상품 + 추천
export const getRecommendations = () => {
  return axiosClient.get("/api/v1/ai/recommendations");
};

// 현재 월 리포트
export const getCurrentReport = () => {
  return axiosClient.get("/api/v1/ai/report/current");
};

// 월별 리포트
export const getMonthlyReport = () => {
  return axiosClient.get("/api/v1/ai/report/monthly");
};
