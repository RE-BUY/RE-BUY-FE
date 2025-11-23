import { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import BottomNav from "../components/BottomNav";
import TopNav from "../components/TopNav";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getMyPageInfo, type MyPageResponse } from '../services/myPageService';
import { getCurrentReport } from '../services/reportService';

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
  const { logout } = useAuth();
  const [reviewStatus, setReviewStatus] = useState<'bad' | 'good' | null>(null);
  const [myPageData, setMyPageData] = useState<MyPageResponse | null>(null);
  const [waterSaved, setWaterSaved] = useState<number>(0);
  const [treeSaved, setTreeSaved] = useState<number>(0);

  useEffect(() => {
    const fetchMyPageData = async () => {
      try {
        // 사용자 정보와 리포트 데이터를 병렬로 가져오기
        const [userData, report] = await Promise.all([
          getMyPageInfo(),
          getCurrentReport().catch(() => null) // 리포트 실패 시 null
        ]);
        
        setMyPageData(userData);
        
        // 물 절약량: 리포트의 environmentalImpact.waterSaved 사용
        const waterValue = report?.environmentalImpact?.waterSaved ?? 0;
        setWaterSaved(waterValue);
        
        // 나무: MyPage의 pineTreeCount 사용
        setTreeSaved(userData.pineTreeCount || 0);
      } catch (error) {
        console.error('마이페이지 데이터 로드 실패:', error);
        // 에러 발생 시 기본값 사용
      }
    };

    fetchMyPageData();
  }, []);

  // API 데이터가 있으면 사용, 없으면 기본값
  const userInfo: UserInfo = {
    name: myPageData?.username || 'Y',
    waterSaved: waterSaved,
    treesSaved: treeSaved,
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
    { name: '리포트', icon: '/images/products/coin.png' },
  ];

  const handleMenuClick = (menuName: string) => {
    switch(menuName) {
      case '구매내역': navigate('/history'); break;
      case '리포트': navigate('/point'); break;
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

  const handleLogout = () => {
    alert('로그아웃이 완료되었습니다.');
    logout();
    navigate('/main');
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white overflow-y-auto pb-10">
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
        <section className="px-4 mb-8">
          <p className="font-semibold mb-3 text-[#4F7457] text-sm">최근 본 상품</p>
          
          {/* 가로 스크롤 카드 */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {recentItems.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/detail?id=${item.id}`)}
                className="snap-start flex-shrink-0 w-32 h-32 border rounded-lg shadow-sm flex items-center justify-center overflow-hidden bg-white cursor-pointer hover:shadow-md transition-shadow"
              >
                <img 
                  src={item.img} 
                  className="max-w-full max-h-full object-contain" 
                  alt={item.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            ))}
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
        <div className="mt-10 px-6 flex gap-6 text-sm text-gray-400">
          <button onClick={handleLogout} className="underline hover:text-gray-600">로그아웃</button>
          <button className="underline hover:text-gray-600">회원탈퇴</button>
        </div>
      </div>

      <BottomNav className="absolute bottom-0 left-0 right-0" />
    </Layout>
  );
}
