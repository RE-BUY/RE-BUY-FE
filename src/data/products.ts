export interface Product {
  id: number;
  image: string;
  brand: string;
  type: string;
  model?: string; // 모델명 (선택적)
  price: number;
  category?: string; // 카테고리 (선택적)
}
export interface PloggingItem {
  id: number;
  place: string;
  time: string;
  capacity: number;
}

export const ploggingItems: PloggingItem[] = [
  { id: 1, place: '경북대', time: '10:00 AM', capacity: 20 },
  { id: 2, place: '동성로', time: '1:00 PM', capacity: 15 },
  { id: 3, place: '수성못', time: '4:00 PM', capacity: 10 },
];
// 프로덕트 데이터
export const products: Product[] = [
  {
    id: 1,
    image: "/images/products/p1.png",
    brand: "프라이탁",
    type: "패션/지갑",
    model: "F257 SUTTON 606403",
    price: 152584,
    category: "fashion",
  },
  {
    id: 2,
    image: "/images/products/p2.png",
    brand: "프라이탁",
    type: "패션/지갑",
    model: "F554 MAX 0024",
    price: 169200,
    category: "fashion",
  },
  {
    id: 3,
    image: "/images/products/p33.png",
    brand: "프라이탁",
    type: "패션/지갑",
    model: "F05 BLAIR",
    price: 72000,
    category: "fashion",
  },
  {
    id: 4,
    image: "/images/products/p4.png",
    brand: "프라이탁",
    type: "패션/지갑",
    model: "F554 MAX 0059",
    price: 151510,
    category: "fashion",
  },
  {
    id: 5,
    image: "/images/products/wallet-5.jpg",
    brand: "프라이탁",
    type: "지갑",
    price: 39500,
    category: "fashion",
  },
  {
    id: 6,
    image: "/images/products/wallet-6.jpg",
    brand: "프라이탁",
    type: "지갑",
    price: 41000,
    category: "fashion",
  },
  {
    id: 7,
    image: "/images/products/wallet-7.jpg",
    brand: "프라이탁",
    type: "지갑",
    price: 35000,
    category: "fashion",
  },
  {
    id: 8,
    image: "/images/products/wallet-8.jpg",
    brand: "프라이탁",
    type: "지갑",
    price: 38000,
    category: "fashion",
  },
  {
    id: 9,
    image: "/images/products/wallet-9.jpg",
    brand: "프라이탁",
    type: "지갑",
    price: 40000,
    category: "fashion",
  },
  {
    id: 10,
    image: "/images/products/wallet-10.jpg",
    brand: "프라이탁",
    type: "지갑",
    price: 37500,
    category: "fashion",
  },
  {
    id: 11,
    image: "/images/products/wallet-1.jpg",
    brand: "프라이탁",
    type: "지갑",
    price: 34500,
    category: "fashion",
  },
  {
    id: 12,
    image: "/images/products/wallet-2.jpg",
    brand: "프라이탁",
    type: "지갑",
    price: 38500,
    category: "fashion",
  },
  {
    id: 13,
    image: "/images/products/wallet-3.jpg",
    brand: "프라이탁",
    type: "지갑",
    price: 42000,
    category: "fashion",
  },
  {
    id: 14,
    image: "/images/products/wallet-4.jpg",
    brand: "프라이탁",
    type: "지갑",
    price: 36500,
    category: "fashion",
  },
  {
    id: 15,
    image: "/images/products/wallet-5.jpg",
    brand: "프라이탁",
    type: "지갑",
    price: 39500,
    category: "fashion",
  },
  {
    id: 16,
    image: "/images/products/wallet-6.jpg",
    brand: "프라이탁",
    type: "지갑",
    price: 41000,
    category: "fashion",
  },
  {
    id: 17,
    image: "/images/products/wallet-7.jpg",
    brand: "프라이탁",
    type: "지갑",
    price: 35000,
    category: "fashion",
  },
  {
    id: 18,
    image: "/images/products/wallet-8.jpg",
    brand: "프라이탁",
    type: "지갑",
    price: 38000,
    category: "fashion",
  },
  {
    id: 19,
    image: "/images/products/wallet-9.jpg",
    brand: "프라이탁",
    type: "지갑",
    price: 40000,
    category: "fashion",
  },
  {
    id: 20,
    image: "/images/products/wallet-10.jpg",
    brand: "프라이탁",
    type: "지갑",
    price: 37500,
    category: "fashion",
  },
];

