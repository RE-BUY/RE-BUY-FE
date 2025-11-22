import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "../components/Layout";
import TopNav from "../components/TopNav";
import SearchBar from "../components/SearchBar";
import { products } from "../data/products"; 

export default function HomePage() {
  const navigate = useNavigate();
  const partners = [
    { id: 1, img: '/images/products/enter1.png' },
    { id: 2, img: '/images/products/enter2.png' },
    { id: 3, img: '/images/products/enter3.png' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 추천 상품 (처음 3개)
  const recommendedProducts = products.slice(0, 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [partners.length]);

  return (
    <Layout>
      <div className="flex flex-col h-full relative">
        
        {/* 1. 상단바 컴포넌트 */}
        <TopNav />

        {/* 컨텐츠 영역 (스크롤 가능) */}
        <div className="flex-1 overflow-y-auto px-4 scrollbar-hide">
          
          {/* 2. 검색창 컴포넌트 적용 */}
          <div className="pt-[18px]">
            <SearchBar 
              className="pl-0 pr-0" 
              onSearch={(query) => {
                navigate(`/list?q=${encodeURIComponent(query)}`);
              }}
            />
          </div>

          {/* 절약 자원 표시 */}
          <div className="mt-8">
            <h2 className="text-xl font-bold">Y님, 안녕하세요.</h2>
            <p className="text-gray-600 text-sm mt-1">
              지금까지 RE:BUY로 절약한 자원
            </p>
          </div>

          {/* WATER / TREE 카드 */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {/* WATER */}
            <div className="px-3 pt-3 pb-2 h-[122px] border rounded-xl shadow-sm bg-[#D5E4D8] text-[#4F7457]">
              <p className="text-sm font-semibold">WATER</p>
              <div className="flex items-center gap-2">
                <img src="/images/products/water_icon.png" className="w-12 h-12 -mt-4" alt="물 아이콘" />
                <span className="text-[64px] font-extrabold font-baloo">23</span>
                <span className="text-[16px] font-extrabold font-baloo mt-6">L</span>
              </div>
            </div>

            {/* TREE */}
            <div className="px-3 pt-3 pb-2 h-[122px] border rounded-xl shadow-sm bg-[#D5E4D8] text-[#4F7457]">
              <p className="text-sm font-semibold">TREE</p>
              <div className="flex items-center gap-2 mt-1">
                <img src="/images/products/tree_icon.png" className="w-12 h-12 -mt-4" alt="나무 아이콘" />
                <span className="text-[64px] font-extrabold font-baloo">12</span>
                <span className="text-[16px] font-extrabold font-baloo mt-6">T</span>
              </div>
            </div>
          </div>

          {/* 함께하는 기업 (배너 캐러셀) */}
          <div className="mt-16 -mx-4">
            <p className="font-semibold mb-3 text-[#4F7457] text-sm px-4">함께하는 기업</p>
            
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {partners.map((partner) => (
                  <div 
                    key={partner.id} 
                    className="w-full flex-shrink-0 h-32 flex items-center justify-center bg-white"
                  >
                    <img 
                      src={partner.img} 
                      alt={`파트너 ${partner.id}`} 
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
              
              {/* 인디케이터 */}
              <div className="flex justify-center gap-2 mt-3 pb-2">
                {partners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? 'bg-[#4F7457] w-6' : 'bg-gray-300'
                    }`}
                    aria-label={`슬라이드 ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 추천 상품 */}
          <div className="mt-16 mb-12">
            <p className="font-semibold mb-3 text-[#4F7457] text-sm">추천 상품</p>
              
            {/* 가로 스크롤 카드 */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
              {recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/detail?id=${product.id}`)}
                  className="snap-start flex-shrink-0 w-32 h-32 border rounded-lg shadow-sm flex items-center justify-center overflow-hidden bg-white cursor-pointer hover:shadow-md transition-shadow"
                >
                  <img 
                    src={product.image} 
                    className="max-w-full max-h-full object-contain" 
                    alt={product.type}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* MADE BY */}
          <div className="text-center pb-4">
            <p className="text-[8px] text-main">© 2025 RE:BUY Team. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-1 text-[8px] text-main">
              <span>MADE BY</span>
              <span>@yeaey_oo</span>
              <span>@jungmini_l</span>
              <span>@ys_xw</span>
              <span>@nnobrainnmann</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}