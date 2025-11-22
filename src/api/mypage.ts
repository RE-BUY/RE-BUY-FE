import axiosClient from "./axiosClient";

export const getMyPageInfo = () => {
  return axiosClient.get("/api/mypage");
};
