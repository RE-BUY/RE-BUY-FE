import React, { useState } from 'react';
import Layout from "../components/Layout";
import TopNav from "../components/TopNav";

// PurchaseItem 컴포넌트의 props 정의
interface PurchaseItemProps {
  id: number; 
  name: string; 
  price: number; 
  qty: number; 
  img: string;
  brand: string; 
}

// PurchaseItem 컴포넌트
function PurchaseItem({ brand, name, price, qty, img }: PurchaseItemProps) {
  return (
    <li className="py-4 flex gap-4">
      {/* 이미지 */}
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden border rounded-lg bg-white flex items-center justify-center">
        <img 
          src={img} 
          alt={name} 
          className="w-full h-full object-contain"
        />
      </div>

      {/* 정보 */}
      <div className="flex-1 flex flex-col justify-center">
        <span className="text-xs text-gray-700 mb-1">{brand}</span>
        <h3 className="text-base font-bold text-gray-800 mb-2">{name}</h3>
        <div className="flex flex-col text-sm leading-snug">
          <span className="text-gray-600">수량: {qty}</span>
          <span className="font-bold text-red-500 mt-0.5">{price.toLocaleString()}원</span>
        </div>
      </div>
    </li>
  );
}

// 구매내역 페이지
export default function PurchaseHistoryPage() {
  const [purchases] = useState([
    { id: 1, brand: '프라이탁', name: '리사이클링 지갑', price: 34500, qty: 1, img: '/images/products/p2.png' },
    { id: 2, brand: '서울우유', name: '저탄소 우유', price: 5000, qty: 1, img: '/images/products/product1.jpg' },
    { id: 3, brand: '친환경', name: '에코백', price: 15000, qty: 3, img: '/images/products/product3.jpg' },
  ]);

  const totalPrice = purchases.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">

        {/* TopNav */}
        <TopNav />

        {/* 컨텐츠 (스크롤 가능 영역) */}
        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-32">
          <div className="py-4 pt-8 pb-6">
            <h2 className="text-2xl font-bold text-gray-900">구매내역</h2>
          </div>

          {purchases.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p>구매내역이 없습니다.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {purchases.map(item => (
                <PurchaseItem 
                  key={item.id} 
                  id={item.id} 
                  brand={item.brand} 
                  name={item.name} 
                  price={item.price} 
                  qty={item.qty} 
                  img={item.img} 
                />
              ))}
            </ul>
          )}

          {/* 총 구매금액 박스: 스크롤 영역 내, 하단바 바로 위 */}
          {purchases.length > 0 && (
            <div className="mt-6">
              <div className="bg-sub1/30 rounded-xl p-4 flex justify-between items-center">
                <span className="font-bold text-gray-800">총 구매금액</span>
                <span className="font-bold text-red-500">{totalPrice.toLocaleString()}원</span>
              </div>
            </div>
          )}
        </div>

        {/* BottomNav는 Layout에서 처리됩니다. */}
      </div>
    </Layout>
  );
}
