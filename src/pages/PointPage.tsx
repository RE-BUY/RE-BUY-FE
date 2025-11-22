import { useMemo } from "react";
import Layout from "../components/Layout";
import TopNav from "../components/TopNav";
import { purchaseHistory, type Product2 } from "../data/products";

export default function PointPage() {

  // 총 포인트 및 절약량 계산
  const { totalWater, totalTree, totalPoints } = useMemo(() => {
    let water = 0;
    let tree = 0;
    let points = 0;

    purchaseHistory.forEach((item: Product2) => {
      water += item.waterL * item.qty;
      tree += item.treeT * item.qty;
      points += item.price * item.qty * 0.1; // 1원 = 0.1포인트
    });

    return { totalWater: water, totalTree: tree, totalPoints: points };
  }, []);

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">

        {/* TopNav */}
        <TopNav />

        {/* 포인트 영역 */}
        <div className="flex-1 overflow-y-auto px-5 pt-6 pb-32">

          <h2 className="text-2xl font-bold text-gray-900 mb-4">녹색생활 포인트</h2>
          <p className="text-2xl font-medium text-gray-700 mb-6">
            총 포인트: {totalPoints.toLocaleString()}p
          </p>

          {/* 상품별 절약 포인트 내역 */}
          <ul className="space-y-4 mb-6">
            {purchaseHistory.map((item: Product2) => (
              <li key={item.id} className="flex justify-between items-center bg-[#D9E5DA] rounded-xl p-4 shadow-sm">
                <div>
                  <p className="font-bold text-gray-800">{item.name} ({item.qty}개)</p>
                  <p className="text-gray-700 text-sm flex items-center gap-2">
                    <img src="/images/products/water_icon.png" alt="물" className="w-4 h-4" /> {item.waterL * item.qty}L
                    <span className="mx-2">|</span>
                    <img src="/images/products/tree_icon.png" alt="나무" className="w-4 h-4" /> {item.treeT * item.qty}T
                  </p>
                </div>
                <span className="font-bold text-green-700">{(item.price * item.qty * 0.1).toLocaleString()}p</span>
              </li>
            ))}
          </ul>

          {/* 총 합계 */}
          <div className="bg-sub1/30 rounded-xl p-4 flex justify-between items-center">
            <span className="font-bold text-gray-800">총 절약량</span>
            <div className="text-right">
              <p className="text-red-500 font-bold">{totalPoints.toLocaleString()}p</p>
              <p className="text-gray-700 text-sm flex items-center gap-3">
                <img src="/images/products/water_icon.png" alt="물" className="w-4 h-4" /> {totalWater}L
                <span className="mx-1">|</span>
                <img src="/images/products/tree_icon.png" alt="나무" className="w-4 h-4" /> {totalTree}T
              </p>
            </div>
          </div>

          {/* 설명 */}
          <div className="w-full bg-[#8FAB95] rounded-3xl p-6 text-center shadow-sm mt-6">
            <p className="text-white font-medium text-sm sm:text-base leading-relaxed">
              녹색생활(Green Life)은 환경을 보호하고 에너지를 절약하며,<br />
              지속 가능한 삶을 실천하는 생활 방식입니다.
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
}
