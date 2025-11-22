import Layout from "../components/Layout";
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const navigate = useNavigate();

  const quickMenus = [
    { name: '구매내역', icon: '🧾' },
    { name: '리뷰', icon: '✍️' },
    { name: '문의', icon: '💬' },
    { name: '플로깅 예약', icon: '📅' },
    { name: '포인트', icon: '🪙' },
  ];
 
  return (
    <Layout>
      <div className="flex flex-col h-full bg-white overflow-y-auto pb-20">
        
        {/* [Header] */}
        <header className="flex justify-between items-center px-6 py-4">
          <span className="text-xl font-black tracking-wide text-main">RE:BUY</span>
          <button onClick={() => navigate('/shoppingBasket')} className="p-1">
             <span className="text-2xl">🛒</span>
          </button>
        </header>

        <section className="px-6 pt-4 pb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Y님</h1>
          <p className="text-main font-medium text-sm">
            물 200L 나무 3그루 절약중!! 🌱
          </p>
        </section>

        <section className="px-4 mb-8">
          <div className="flex justify-between bg-white py-2 px-2">
            {quickMenus.map((menu) => (
              <button key={menu.name} className="flex flex-col items-center gap-2 p-1 group w-16">
                <div className="w-10 h-10 bg-sub1 rounded-full flex items-center justify-center text-lg group-hover:bg-sub2 transition-colors shadow-sm">
                  {menu.icon}
                </div>
                <span className="text-xs text-gray-600 whitespace-nowrap">{menu.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* [Review Card] */}
        <section className="px-6 mb-8">
          <h2 className="font-bold text-gray-800 mb-3">도착한 상품은 어땠나요?</h2>
          <div className="bg-sub1 rounded-xl p-4 flex gap-4 items-center">
            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center text-xs text-gray-400 border border-white/50">
              IMG
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-1">프라이탁</p>
              <p className="font-bold text-gray-800 mb-3">리사이클링 지갑</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-white py-2 text-xs font-medium rounded shadow-sm hover:bg-gray-50 text-gray-700 transition-colors">
                  별로에요
                </button>
                <button className="flex-1 bg-white py-2 text-xs font-medium rounded shadow-sm hover:bg-gray-50 text-gray-700 transition-colors">
                  만족해요
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* [List Menu] 화살표 아이콘 -> '>' 기호로 대체 */}
        <section className="px-6 space-y-2">
            <div className="flex justify-between items-center py-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors px-1">
                <span className="font-bold text-gray-800">최근 본 상품</span>
                <span className="text-gray-400 text-lg">&#8250;</span> {/* '>' 모양 HTML 엔티티 */}
            </div>
             <div className="flex justify-between items-center py-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors px-1">
                <span className="font-bold text-gray-800">내 정보 수정</span>
                <span className="text-gray-400 text-lg">&#8250;</span>
            </div>
        </section>

        {/* [Footer Links] */}
        <div className="mt-10 mb-10 px-6 flex gap-6 text-sm text-gray-400">
            <button className="underline hover:text-gray-600">로그아웃</button>
            <button className="underline hover:text-gray-600">회원탈퇴</button>
        </div>
      </div>
    </Layout>
  );
}