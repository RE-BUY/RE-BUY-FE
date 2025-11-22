import React, { useState } from 'react';
import Layout from "../components/Layout";
import BottomNav from "../components/BottomNav";
import TopNav from "../components/TopNav";
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const navigate = useNavigate();
  const [reviewStatus, setReviewStatus] = useState<'bad' | 'good' | null>(null);

  const quickMenus = [
    { name: '구매내역', icon: '🧾' },
    { name: '리뷰', icon: '✍️' },
    { name: '문의', icon: '💬' },
    { name: '플로깅 예약', icon: '📅' },
    { name: '포인트', icon: '🪙' },
  ];

  const handleMenuClick = (menuName: string) => {
    if (menuName === '구매내역') navigate('/history');
    else if (menuName === '포인트') navigate('/point');
  };

  const recentItems = [
    { id: 1, name: '저탄소 인증 우유', img: '/images/products/product1.jpg' },
    { id: 2, name: '리사이클링 지갑', img: '/images/products/p2.png' },
    { id: 3, name: '제로웨이스트 파우치', img: '/images/products/product3.jpg' },
  ];

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white overflow-y-auto pb-20">
        
        <TopNav />

        <section className="px-6 pt-4 pb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Y님</h1>
          <p className="text-main font-medium text-sm">
            물 200L 나무 3그루 절약중!! 
          </p>
        </section>

        {/* Quick Menu */}
        <section className="px-4 mb-8">
          <div className="flex justify-between bg-white py-2 px-2">
            {quickMenus.map((menu) => (
              <button 
                key={menu.name} 
                className="flex flex-col items-center gap-2 p-1 group w-16"
                onClick={() => handleMenuClick(menu.name)}
              >
                <div className="w-10 h-10 bg-sub1 rounded-full flex items-center justify-center text-lg group-hover:bg-sub2 transition-colors shadow-sm">
                  {menu.icon}
                </div>
                <span className="text-xs text-gray-600 whitespace-nowrap">{menu.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Review Card (초록색 배경 박스) */}
        <section className="px-6 mb-8">
          <h2 className="font-bold text-gray-800 mb-3">도착한 상품은 어땠나요?</h2>
          <div className="bg-sub1 rounded-xl p-4 flex gap-4 items-center">
            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center text-xs text-gray-400 border border-white/50 overflow-hidden">
              <img src="/images/products/p2.png" alt="리사이클링 지갑" className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-1">프라이탁</p>
              <p className="font-bold text-gray-800 mb-3">리사이클링 지갑</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setReviewStatus('bad')}
                  className={`flex-1 bg-white py-2 text-xs font-medium rounded shadow-sm transition-all border
                    ${reviewStatus === 'bad' ? 'text-[#4F7457] font-bold border-[#4F7457] ring-1 ring-[#4F7457]' : 'text-gray-700 border-transparent hover:bg-gray-50'}`}
                >
                  별로에요
                </button>
                <button 
                  onClick={() => setReviewStatus('good')}
                  className={`flex-1 bg-white py-2 text-xs font-medium rounded shadow-sm transition-all border
                    ${reviewStatus === 'good' ? 'text-[#4F7457] font-bold border-[#4F7457] ring-1 ring-[#4F7457]' : 'text-gray-700 border-transparent hover:bg-gray-50'}`}
                >
                  만족해요
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* [수정됨] 최근 본 상품 (초록색 배경 박스 적용) */}
        <section className="px-6 mb-8 space-y-2">
            {/* 타이틀 */}
            <h2 className="font-bold text-gray-800 mb-3">최근 본 상품</h2>
            
            {/* 초록색 배경 박스 (bg-sub1) */}
            <div className="bg-sub1 rounded-xl p-4">
                {/* 가로 스크롤 이미지 리스트 */}
                <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                    {recentItems.map((item) => (
                        // 이미지 배경은 흰색으로 유지
                        <div key={item.id} className="w-24 h-24 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-white/50 flex items-center justify-center shadow-sm">
                            <img 
                                src={item.img} 
                                alt={item.name} 
                                className="w-full h-full object-contain p-1 mix-blend-multiply" 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* 문의사항 (박스 밖으로 분리) */}
        <section className="px-6">
             <div className="flex justify-between items-center py-4 border-b border-t border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors px-1">
                <span className="font-bold text-gray-800">문의사항</span>
                <span className="text-gray-400 text-lg">&#8250;</span>
            </div>
        </section>

        {/* Footer Links */}
        <div className="mt-10 mb-28 px-6 flex gap-6 text-sm text-gray-400">
            <button className="underline hover:text-gray-600">로그아웃</button>
            <button className="underline hover:text-gray-600">회원탈퇴</button>
        </div>

      </div>

      <BottomNav className="absolute bottom-0 left-0 right-0" />
    </Layout>
  );
}