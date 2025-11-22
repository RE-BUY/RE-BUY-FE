import React, { useState } from 'react';
import Layout from "../components/Layout";
import TopNav from "../components/TopNav";
import SearchBar from "../components/SearchBar";

interface Product {
  id: number;
  name: string;
  img: string;
}

interface UserInfo {
  name: string;
  waterSaved: number;
  treesSaved: number;
}

export default function HomePage() {
  // 임시 유저 정보
  const [userInfo] = useState<UserInfo>({
    name: 'Y',
    waterSaved: 12,
    treesSaved: 5,
  });

  // 임시 추천 상품
  const [products] = useState<Product[]>([
    { id: 1, name: '리사이클링 지갑', img: '/images/products/p2.png' },
    { id: 2, name: '저탄소 우유', img: '/images/products/product1.jpg' },
    { id: 3, name: '에코백', img: '/images/products/product2.png' },
    { id: 4, name: '텀블러', img: '/images/products/product3.png' },
  ]);

  const partners = [
    { id: 1, img: '/images/products/enter1.png' },
    { id: 2, img: '/images/products/enter2.png' },
    { id: 3, img: '/images/products/enter3.png' },
    { id: 4, img: '/images/partners/hyundai.png' },
    { id: 5, img: '/images/partners/lotte.png' },
    { id: 6, img: '/images/partners/kakao.png' },
  ];

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">
        {/* 상단바 */}
        <TopNav />

        {/* 컨텐츠 영역 */}
        <div className="flex-1 overflow-y-auto px-4 pb-20 scrollbar-hide">
          {/* 검색창 */}
          <SearchBar />

          {/* 절약 자원 표시 */}
          <div className="mt-8">
            <h2 className="text-xl font-bold">{userInfo.name}님, 안녕하세요.</h2>
            <p className="text-gray-600 text-sm mt-1">지금까지 RE:BUY로 절약한 자원</p>
          </div>

          {/* WATER / TREE 카드 */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {/* WATER */}
            <div className="p-4 border rounded-xl shadow-sm bg-[#D5E4D8] text-[#4F7457]">
              <p className="text-sm font-semibold">WATER</p>
              <div className="flex items-center gap-2 mt-2">
                <img src="/images/products/water_icon.png" className="w-12 h-12" alt="물 아이콘" />
                <span className="text-4xl font-bold">{userInfo.waterSaved}</span>
                <span className="text-sm text-gray-500">L</span>
              </div>
            </div>

            {/* TREE */}
            <div className="p-4 border rounded-xl shadow-sm bg-[#D5E4D8] text-[#4F7457]">
              <p className="text-sm font-semibold">TREE</p>
              <div className="flex items-center gap-2 mt-2">
                <img src="/images/products/tree_icon.png" className="w-12 h-12" alt="나무 아이콘" />
                <span className="text-4xl font-bold">{userInfo.treesSaved}</span>
                <span className="text-sm text-gray-500">T</span>
              </div>
            </div>
          </div>

          {/* 함께하는 기업 */}
          <div className="mt-8">
            <p className="font-semibold mb-3 text-[#4F7457] text-lg">함께하는 기업</p>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
              {partners.map(partner => (
                <div 
                  key={partner.id} 
                  className="snap-start flex-shrink-0 w-32 h-32 border border-gray-100 rounded-lg flex items-center justify-center bg-white shadow-sm overflow-hidden"
                >
                  <img 
                    src={partner.img} 
                    alt={`파트너 ${partner.id}`} 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.className = "snap-start flex-shrink-0 w-32 h-32 border border-gray-100 rounded-lg flex items-center justify-center bg-gray-50";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 추천 상품 */}
          <div className="mt-8">
            <p className="font-semibold mb-3 text-[#4F7457] text-lg">추천 상품</p>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
              {products.map(product => (
                <div key={product.id} className="snap-start flex-shrink-0 w-32 h-32 border rounded-lg shadow-sm flex items-center justify-center overflow-hidden bg-white">
                  <img src={product.img} alt={product.name} className="max-w-full max-h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
