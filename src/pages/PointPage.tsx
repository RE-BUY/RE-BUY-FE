import Layout from "../components/Layout";
import { useNavigate } from 'react-router-dom';
import earthIcon from '../assets/earth.svg'; 

export default function PointPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">
        
        <header className="flex items-center justify-between px-5 py-4 bg-white">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src={earthIcon} alt="RE:BUY" className="h-6 w-6 mr-1" />
            <span className="text-xl font-black tracking-wide text-[#4F7457]">RE:BUY</span>
          </div>
          
          <button onClick={() => navigate('/shoppingBasket')} className="p-1">
            <span className="text-2xl">🛒</span>
          </button>
        </header>

        <div className="flex-1 flex flex-col items-center pt-16 px-6">
          
          <div className="w-32 h-32 mb-6 rounded-full overflow-hidden flex items-center justify-center">
            <img src={earthIcon} alt="Earth" className="w-full h-full object-cover" />
          </div>

          <h2 className="text-xl font-bold text-[#4F7457] mb-1">
            녹색생활 포인트
          </h2>
          <p className="text-2xl font-medium text-gray-700 mb-10">
            2000p
          </p>

          <div className="w-full bg-[#8FAB95] rounded-3xl p-8 text-center shadow-sm">
            <p className="text-white font-medium leading-relaxed text-sm sm:text-base">
              녹색생활(Green Life)은<br />
              환경을 보호하고 에너지를 절약하며, 지속<br />
              가능한 삶을 실천하는 생활 방식
            </p>
          </div>

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
            
            <button className="flex flex-col items-center justify-center w-full h-full text-[#4F7457] transition-colors" onClick={() => navigate('/mypage')}>
              <span className="text-2xl mb-1">👤</span>
              <span className="text-[10px]">마이페이지</span>
            </button>
        </nav>

      </div>
    </Layout>
  );
}