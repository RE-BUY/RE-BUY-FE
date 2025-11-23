/**
 * 이미지 경로를 완전한 URL로 변환하는 유틸리티 함수
 * 백엔드에서 받은 이미지 경로(예: /images/products/p1.png)를 
 * 완전한 URL(예: http://192.168.45.170:8080/images/products/p1.png)로 변환합니다.
 * 
 * @param imagePath 백엔드에서 받은 이미지 경로
 * @returns 완전한 이미지 URL
 */
export const getImageFullUrl = (imagePath: string | undefined | null): string => {
  if (!imagePath) return '';
  
  // 이미 완전한 URL인 경우 (http:// 또는 https://로 시작)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // 경로만 있는 경우 BASE_URL과 조합
  const BASE_URL = import.meta.env.VITE_API_URL;
  return `${BASE_URL}${imagePath}`;
};

/**
 * 여러 이미지 경로를 한 번에 완전한 URL로 변환
 * @param imagePaths 이미지 경로 배열
 * @returns 완전한 이미지 URL 배열
 */
export const getImageFullUrls = (imagePaths: (string | undefined | null)[]): string[] => {
  return imagePaths.map(path => getImageFullUrl(path)).filter(url => url !== '');
};

