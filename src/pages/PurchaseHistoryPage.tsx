import React from 'react';
import Layout from "../components/Layout";
import { useNavigate } from 'react-router-dom';
import earthIcon from '../assets/earth.svg'; 

export default function PurchaseHistoryPage() {
  const navigate = useNavigate();

 
  const historyItems = [
    {
      id: 1,
      brand: '프라이탁',
      name: '리사이클링 지갑',
      qty: 1,
      price: 34500,
      img: '/images/products/p2.png', 
      date: '2024.05.20'
    },
    {
      id: 2,
      brand: '서울우유',
      name: '저탄소 우유',
      qty: 1,
      price: 5000,
      img: '/images/products/p1.png', 
      date: '2024.05.18'
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">
        
        <header className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src={earthIcon} alt="RE:BUY" className="h-6 w-6 mr-1" />
            <span className="text-xl font-black tracking-wide text-[#4F7457]">RE:BUY</span>
          </div>
          
          <button onClick={() => navigate('/cart')} className="p-1">
            <span className="text-2xl">🛒</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto pb-20">
          
          <div className="px-5 py-6">
            <h2 className="text-xl font-bold text-gray-900">구매내역</h2>
          </div>

          {historyItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p>구매한 내역이 없습니다.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 border-t border-gray-100">
              {historyItems.map((item) => (
                <li key={item.id} className="px-5 py-6 flex gap-4 bg-white">
                  <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden border border-gray-100 bg-gray-50">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover mix-blend-multiply" 
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-xs text-gray-500 mb-1 font-medium">
                      {item.brand}
                    </p>
                    
                    <h3 className="text-base font-bold text-gray-900 mb-2">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-600 mb-1">
                      수량 : {item.qty}
                    </p>

                    <p className="text-base font-bold text-red-500">
                      {item.price.toLocaleString()}원
                  
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 h-16 flex justify-around items-center z-50 text-gray-400">
            <button className="flex flex-col items-center justify-center w-full h-full hover:text-[#4F7457] transition-colors" onClick={() => navigate('/')}>
              <span className="text-2xl mb-1">🏠</span>
              <span className="text-[10px]">홈</span>
            </button>
            
            <button className="flex flex-col items-center justify-center w-full h-full hover:text-[#4F7457] transition-colors">
              <span className="text-2xl mb-1">☰</span>
              <span className="text-[10px]">카테고리</span>
            </button>
            
            <button className="flex flex-col items-center justify-center w-full h-full hover:text-[#4F7457] transition-colors">
              <span className="text-2xl mb-1">🌏</span>
              <span className="text-[10px]">플로깅</span>
            </button>
            
            {/* 마이페이지 버튼 */}
            <button className="flex flex-col items-center justify-center w-full h-full hover:text-[#4F7457] transition-colors" onClick={() => navigate('/mypage')}>
              <span className="text-2xl mb-1">👤</span>
              <span className="text-[10px]">마이페이지</span>
            </button>
        </nav>

      </div>
    </Layout>
  );
}