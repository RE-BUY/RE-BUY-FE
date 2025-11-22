/**
 * RE:BUY 프로젝트에서 사용되는 주요 데이터 타입 정의
 */

// 1. 상품 정보 타입
export interface Product {
    id: number;
    name: string;
    price: number;
    img: string;
    eco_liters: number;
    eco_trees: number;
}

// 2. 구매 내역 타입
export interface Purchase {
    id: number;
    brand: string;
    name: string;
    price: number;
    qty: number;
    img: string;
    date: string;
}

// 3. 파트너 기업 타입
export interface Partner {
    id: number;
    img: string;
}

// 4. 리뷰 타입
export type ReviewStatus = 'bad' | 'good' | null;