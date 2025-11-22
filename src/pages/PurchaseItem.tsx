import React, { useState } from 'react';
import Layout from "../components/Layout";
import TopNav from "../components/TopNav";
import { useNavigate } from 'react-router-dom'; // ← 추가

interface PurchaseItemProps {
  id: number; 
  name: string; 
  price: number; 
  qty: number; 
  img: string;
  brand: string; 
  date: string;
}

function PurchaseItem({ brand, name, price, qty, img, date }: PurchaseItemProps) {
  return (
    <li className="flex gap-4 py-5 px-4 rounded-xl shadow-sm bg-white">
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden border rounded-lg bg-white flex items-center justify-center">
        <img 
          src={img} 
          alt={name} 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-1">
        <span className="text-xs text-gray-700">{brand}</span>
        <h3 className="text-base font-bold text-gray-900">{name}</h3>
        <div className="flex flex-col text-sm leading-snug">
          <span className="text-gray-600">수량: {qty}</span>
          <span className="font-bold text-red mt-0.5">{price.toLocaleString()}원</span>
          <span className="text-xs text-gray-400 mt-1">구매일: {date}</span>
        </div>
      </div>
    </li>
  );
}

export default function PurchaseHistoryPage() {
  const navigate = useNavigate(); // ← 이전 버튼용

  const [purchases] = useState([
    { id: 1, brand: '프라이탁', name: '리사이클링 지갑', price: 34500, qty: 1, img: '/images/products/p2.png', date: '2025-11-23' },
    { id: 2, brand: '서울우유', name: '저탄소 우유', price: 5000, qty: 1, img: '/images/products/product1.jpg', date: '2025-11-22' },
    { id: 3, brand: '친환경', name: '에코백', price: 15000, qty: 3, img: '/images/products/product3.jpg', date: '2025-11-21' },
  ]);

  const totalPrice = purchases.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">

        <TopNav />

        {/* 이전 버튼 */}
        <div className="px-5 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 mb-4"
          >
            ◀ 이전
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-6">
          <div className="pt-2 pb-2">
            <h2 className="text-2xl font-bold text-gray-900">구매내역</h2>
          </div>

          {purchases.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p>구매내역이 없습니다.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {purchases.map(item => (
                <PurchaseItem 
                  key={item.id} 
                  id={item.id} 
                  brand={item.brand} 
                  name={item.name} 
                  price={item.price} 
                  qty={item.qty} 
                  img={item.img} 
                  date={item.date}
                />
              ))}
            </ul>
          )}

          {/* 총 구매금액 박스: 하단바 바로 위에 고정 */}
          {purchases.length > 0 && (
            <div className="absolute left-0 right-0 bottom-16 px-4"> 
              <div className="bg-sub1/30 rounded-xl p-4 flex justify-between items-center">
                <span className="font-bold text-gray-800">총 구매금액</span>
                <span className="font-bold text-red1">{totalPrice.toLocaleString()}원</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
