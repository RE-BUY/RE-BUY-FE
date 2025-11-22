import Layout from "../components/Layout";
import waterIconImage from "../products/water_icon.png";
import treeIconImage from "../products/tree_icon.png";
import earthIconImage from "../assets/earth.svg";
import product1 from "../products/product1.jpg";
import product2 from "../products/product2.jpg";
import product3 from "../products/product3.jpg";

export default function HomePage() {
  return (
    <Layout>
      <div className="px-4 pb-12">

        {/* 헤더 */}
        <header className="border-b py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={earthIconImage} className="w-8 h-8 rounded-full" />
              <span className="font-bold text-xl text-[#388E3C]">RE:BUY</span>
            </div>
            <span className="text-2xl">🛒</span>
          </div>

          {/* 검색창 */}
          <div className="relative mt-4">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-full border rounded-lg py-2 px-3 pr-10"
            />
            <span className="absolute right-3 top-2.5 text-gray-500 text-lg">
              🔍
            </span>
          </div>
        </header>


        <div className="mt-8">
          <h2 className="text-xl font-bold">Y님, 안녕하세요.</h2>
          <p className="text-gray-600 text-sm mt-1">
            지금까지 RE:BUY로 절약한 자원
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* WATER */}
          <div className="p-4 border rounded-xl shadow-sm bg-white">
            <p className="text-sm font-semibold text-gray-700">WATER</p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className="w-6 h-6 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${waterIconImage})` }}
              />
              <span className="text-lg font-bold">23</span>
              <span className="text-sm text-gray-500">L</span>
            </div>
          </div>

          {/* TREE */}
          <div className="p-4 border rounded-xl shadow-sm bg-white">
            <p className="text-sm font-semibold text-gray-700">TREE</p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className="w-6 h-6 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${treeIconImage})` }}
              />
              <span className="text-lg font-bold">12</span>
              <span className="text-sm text-gray-500">T</span>
            </div>
          </div>
        </div>

        {/* 함께하는 기업 */}
        <div className="mt-8">
          <p className="font-semibold">함께하는 기업</p>
          <div className="flex gap-1 text-lg mt-1 text-gray-400">
            <span>•</span>
            <span>•</span>
            <span>•</span>
          </div>
        </div>

        {/* 추천 상품 */}
        <h2 className="mt-8 font-bold text-lg">추천 상품</h2>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {/* 상품 1 */}
          <div>
            <img src={product1} className="rounded-lg shadow-sm" />
            <p className="text-sm font-medium mt-2">저탄소 우유</p>
            <p className="text-xs text-gray-500">1.5L, 0.7T 절약</p>
          </div>

          {/* 상품 2 */}
          <div>
            <img src={product2} className="rounded-lg shadow-sm" />
            <p className="text-sm font-medium mt-2">업사이클링 지갑</p>
            <p className="text-xs text-gray-500">3L, 0.05T 절약</p>
          </div>

          {/* 상품 3 */}
          <div>
            <img src={product3} className="rounded-lg shadow-sm" />
            <p className="text-sm font-medium mt-2">에코백</p>
            <p className="text-xs text-gray-500">2.4L, 1.25T 절약</p>
          </div>
        </div>

       
      </div>
    </Layout>
  );
}
