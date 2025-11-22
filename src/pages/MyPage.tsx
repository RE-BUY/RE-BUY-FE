import React, { useState } from 'react';
import Layout from "../components/Layout";
import BottomNav from "../components/BottomNav";
import TopNav from "../components/TopNav";
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  img: string;
  brand: string;
}

interface UserInfo {
  name: string;
  waterSaved: number;
  treesSaved: number;
}

export default function MyPage() {
  const navigate = useNavigate();
  const [reviewStatus, setReviewStatus] = useState<'bad' | 'good' | null>(null);

  const userInfo: UserInfo = {
    name: 'Y',
    waterSaved: 12,
    treesSaved: 5,
  };

  const recentItems: Product[] = [
    { id: 1, name: '리사이클링 지갑', img: '/images/products/p1.png', brand: '프라이탁' },
    { id: 2, name: '저탄소 우유', img: '/images/products/p2.png', brand: '그린밀크' },
    { id: 3, name: '에코백', img: '/images/products/p33.png', brand: '에코백브랜드' },
    { id: 4, name: '텀블러', img: '/images/products/p4.png', brand: '그린텀블러' },
  ];

  const quickMenus = [
    { name: '구매내역', icon: '/images/products/receipt.png' },
    { name: '리뷰', icon: '/images/products/review.png' },
    { name: '문의', icon: '/images/products/chat.png' },
    { name: '플로깅 예약', icon: '/images/products/calendar.png' },
    { name: '포인트', icon: '/images/products/coin.png' },
  ];

  const handleMenuClick = (menuName: string) => {
    switch(menuName) {
      case '구매내역': navigate('/history'); break;
      case '포인트': navigate('/point'); break;
      case '플로깅 예약': navigate('/my-plogging'); break;
      case '리뷰': navigate('/review'); break;
      case '문의': navigate('/inquiry'); break;
      default: break;
    }
  };

  const handleReviewClick = (status: 'bad' | 'good') => {
    setReviewStatus(status); 
    navigate('/review', { state: { reviewStatus: status } });
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white overflow-y-auto pb-20">
        <TopNav />

        {/* 유저 정보 */}
        <section className="px-6 pt-4 pb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{userInfo.name}님</h1>
          <p className="text-main font-medium text-sm">
            물 {userInfo.waterSaved}L 나무 {userInfo.treesSaved}그루 절약중!!
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
                <div className="w-12 h-12 bg-sub1 rounded-full flex items-center justify-center group-hover:bg-sub2 transition-colors shadow-sm p-2">
                  <img src={menu.icon} alt={menu.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-xs text-gray-600 whitespace-nowrap">{menu.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Review Card */}
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
                  onClick={() => handleReviewClick('bad')}
                  className={`flex-1 bg-white py-2 text-xs font-medium rounded shadow-sm transition-all border
                    ${reviewStatus === 'bad' ? 'text-[#4F7457] font-bold border-[#4F7457] ring-1 ring-[#4F7457]' : 'text-gray-700 border-transparent hover:bg-gray-50'}`}
                >
                  별로에요
                </button>
                <button 
                  onClick={() => handleReviewClick('good')}
                  className={`flex-1 bg-white py-2 text-xs font-medium rounded shadow-sm transition-all border
                    ${reviewStatus === 'good' ? 'text-[#4F7457] font-bold border-[#4F7457] ring-1 ring-[#4F7457]' : 'text-gray-700 border-transparent hover:bg-gray-50'}`}
                >
                  만족해요
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 최근 본 상품 */}
        <section className="px-6 mb-8 space-y-2">
          <h2 className="font-bold text-gray-800 mb-3">최근 본 상품</h2>
          <div className="bg-sub1 rounded-xl p-2">
            <div className="flex gap-4 overflow-x-auto py-4 px-2 scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {recentItems.map((item) => (
                <div
                  key={item.id}
                  className="w-44 h-44 flex-shrink-0 bg-white rounded-xl border border-white/50 flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => navigate(`/detail?id=${item.id}`)}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 문의사항 */}
        <section className="px-6">
          <div
            className="flex justify-between items-center py-4 border-b border-t border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors px-1"
            onClick={() => navigate('/inquiry')}
          >
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
