export interface BrandInfo {
  brandName: string; // 브랜드 한글명 (예: "프라이탁")
  brandNameEn: string; // 브랜드 영문명 (예: "FREITAG")
  description: string[]; // 브랜드 설명 (2줄)
  materials: {
    name: string;
    label: string;
    image?: string; // 이미지 경로 (예: "/images/materials/seatbelt.jpg")
    color?: string; // 배경색 (이미지가 없을 때 사용, 예: "from-amber-50 to-amber-100", "bg-blue-500")
    textColor?: string; // 텍스트 색상 (기본: "text-gray-600")
  }[];
}

// 브랜드 정보 데이터
export const brandInfos: Record<string, BrandInfo> = {
  프라이탁: {
    brandName: '프라이탁',
    brandNameEn: 'FREITAG',
    description: [
      '마커스 프라이탁과 다니엘 프라이탁이 만든',
      '스위스의 업사이클링 브랜드.',
    ],
    materials: [
      {
        name: '안전밸트',
        label: '안전밸트',
        image: '/images/materials/seatbelt.png',
        color: 'from-amber-50 to-amber-100',
        textColor: 'text-gray-600',
      },
      {
        name: '방수포',
        label: '방수포',
        image: '/images/materials/po.png',
        color: 'bg-blue-500',
        textColor: 'text-white',
      },
      {
        name: '천막',
        label: '천막',
        image: '/images/materials/mack.png',
        color: 'from-gray-600 to-gray-800',
        textColor: 'text-white',
      },
    ],
  },
  // 다른 브랜드도 추가 가능
  // 예시:
  // '다른브랜드': {
  //   brandName: '다른브랜드',
  //   brandNameEn: 'OTHERBRAND',
  //   description: ['설명1', '설명2'],
  //   materials: [...],
  // },
};

// 브랜드명으로 브랜드 정보 가져오기
export function getBrandInfo(brandName: string): BrandInfo | undefined {
  return brandInfos[brandName];
}

