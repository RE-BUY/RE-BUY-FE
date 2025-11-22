export interface Review {
  id: number;
  productId: number;
  title: string;
  content: string;
  rating: number;
  author: string;
  date: Date;
}

// 상품별 후기 데이터
export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    title: '정말 만족스러워요!',
    content: '친환경 소재로 만들어져서 마음에 들어요. 내구성도 좋고 디자인도 깔끔합니다.',
    rating: 5,
    author: '김환경',
    date: new Date('2024-01-15'),
  },
  {
    id: 2,
    productId: 1,
    title: '가격 대비 훌륭해요',
    content: '재활용 소재인데도 품질이 정말 좋네요. 오래 쓸 수 있을 것 같아요.',
    rating: 4,
    author: '이지구',
    date: new Date('2024-01-10'),
  },
  {
    id: 3,
    productId: 1,
    title: '디자인이 예뻐요',
    content: '색상이 다양해서 선택의 폭이 넓어요. 친구들도 좋아하더라구요.',
    rating: 5,
    author: '박친환',
    date: new Date('2024-01-20'),
  },
  {
    id: 4,
    productId: 1,
    title: '무난해요',
    content: '생각보다는 그냥 무난한데, 친환경이라는 점이 마음에 들어요.',
    rating: 3,
    author: '최재활',
    date: new Date('2024-01-05'),
  },
  {
    id: 5,
    productId: 1,
    title: '강력 추천합니다!',
    content: '친환경 제품을 찾고 있었는데 정말 만족스러워요. 또 구매할 예정입니다.',
    rating: 5,
    author: '정업사',
    date: new Date('2024-01-18'),
  },
  {
    id: 6,
    productId: 2,
    title: '품질이 좋아요',
    content: '재활용 소재인데도 견고하고 오래 쓸 수 있을 것 같아요.',
    rating: 5,
    author: '이친환',
    date: new Date('2024-01-12'),
  },
  {
    id: 7,
    productId: 2,
    title: '만족합니다',
    content: '친환경 제품이라 구매했는데 생각보다 좋네요.',
    rating: 4,
    author: '박지구',
    date: new Date('2024-01-08'),
  },
];

// 상품 ID로 후기 가져오기
export function getReviewsByProductId(productId: number): Review[] {
  return reviews.filter(review => review.productId === productId);
}

