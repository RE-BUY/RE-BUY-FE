import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import TopNav from "../components/TopNav";
import { getCurrentReport, type MonthlyReportResponse } from "../services/reportService";
import { getMyPageInfo } from "../services/myPageService";
import { getOrders, getOrderDetail, type OrderItem } from "../services/orderService";

interface OrderWithDetails extends OrderItem {
  productNames: string[];
  creditEarned: number;
}

export default function PointPage() {
  const [reportData, setReportData] = useState<MonthlyReportResponse | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [totalCredit, setTotalCredit] = useState<number>(0);
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // 리포트 데이터 가져오기
      try {
        setIsLoadingReport(true);
        const data = await getCurrentReport();
        setReportData(data);
      } catch (error) {
        console.error('소비 리포트 로드 실패:', error);
      } finally {
        setIsLoadingReport(false);
      }

      // 사용자 정보 가져오기 (총 포인트)
      try {
        const userInfo = await getMyPageInfo();
        setTotalCredit(userInfo.totalCredit || 0);
      } catch (error) {
        console.error('사용자 정보 로드 실패:', error);
      }

      // 실제 구매 내역 가져오기
      try {
        setIsLoadingOrders(true);
        const ordersData = await getOrders(0, 100); // 최대 100개까지 가져오기
        
        // 각 주문의 상세 정보를 가져와서 상품 이름 추출
        // 필터링 조건 완화: 취소되지 않은 주문만 (포인트 적립이 0이어도 표시)
        const ordersWithDetails: OrderWithDetails[] = await Promise.all(
          ordersData.items
            .filter(order => order.status !== 'CANCELLED') // 취소되지 않은 주문만
            .map(async (order) => {
              try {
                const detail = await getOrderDetail(order.orderId);
                return {
                  ...order,
                  productNames: detail.items.map(item => item.productName),
                  creditEarned: order.creditEarned || 0,
                };
              } catch (error) {
                console.error(`주문 ${order.orderId} 상세 정보 로드 실패:`, error);
                return {
                  ...order,
                  productNames: [],
                  creditEarned: order.creditEarned || 0,
                };
              }
            })
        );
        
        setOrders(ordersWithDetails);
      } catch (error) {
        console.error('주문 내역 로드 실패:', error);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    fetchData();
  }, []);

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">

        {/* TopNav */}
        <TopNav />

        {/* 포인트 영역 */}
        <div className="flex-1 overflow-y-auto px-5 pt-6 pb-12">

          <h2 className="text-xl font-bold text-main mb-4">녹색생활 리포트</h2>

          {/* 소비 리포트 */}
          {isLoadingReport ? (
            <div className="bg-sub1 rounded-xl p-6 mb-6 text-center">
              <p className="text-gray-600">소비 리포트를 불러오는 중...</p>
            </div>
          ) : reportData ? (
            <div className="bg-sub1 rounded-xl p-6 mb-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">소비 리포트</h3>
              
              {/* 구매 통계 */}
              <div className="bg-white rounded-lg p-4 mb-4">
                <h4 className="font-bold text-gray-800 mb-3">구매 통계</h4>
                <div className="space-y-2 text-sm">
                  <p>총 주문 수: <span className="font-semibold">{reportData.purchaseStats.totalOrders}건</span></p>
                  <p>총 지출: <span className="font-semibold">{reportData.purchaseStats.totalSpent.toLocaleString()}원</span></p>
                  <p>평균 주문 금액: <span className="font-semibold">{reportData.purchaseStats.averageOrderValue.toLocaleString()}원</span></p>
                  <p>평균 에코 점수: <span className="font-semibold">{reportData.purchaseStats.averageEcoScore}점</span></p>
                </div>
              </div>

              {/* 환경 영향 */}
              <div className="bg-white rounded-lg p-4 mb-4">
                <h4 className="font-bold text-gray-800 mb-3">환경 영향</h4>
                <div className="space-y-2 text-sm">
                  <p>CO₂ 절약: <span className="font-semibold">{reportData.environmentalImpact.co2Saved}kg</span></p>
                  <p>물 절약: <span className="font-semibold">{reportData.environmentalImpact.waterSaved}L</span></p>
                  <p>기름 절약: <span className="font-semibold">{reportData.environmentalImpact.oilSaved}L</span></p>
                  <p>플라스틱 절약: <span className="font-semibold">{reportData.environmentalImpact.plasticSaved}kg</span></p>
                  {reportData.environmentalImpact.equivalentTo && (
                    <p className="text-main font-semibold">{reportData.environmentalImpact.equivalentTo}</p>
                  )}
                </div>
              </div>

              {/* AI 분석 */}
              {reportData.aiAnalysis && (
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-gray-800 mb-3">AI 분석</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{reportData.aiAnalysis}</p>
                </div>
              )}

              {/* 성취 */}
              {reportData.achievements && reportData.achievements.length > 0 && (
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-gray-800 mb-3">성취</h4>
                  <ul className="space-y-1">
                    {reportData.achievements.map((achievement, index) => (
                      <li key={index} className="text-sm text-gray-700">• {achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 추천 */}
              {reportData.recommendations && reportData.recommendations.length > 0 && (
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-gray-800 mb-3">추천</h4>
                  <ul className="space-y-1">
                    {reportData.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm text-gray-700">• {recommendation}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 랭킹 */}
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-3">랭킹</h4>
                <div className="space-y-2 text-sm">
                  <p>내 순위: <span className="font-semibold">{reportData.ranking.userRank}위</span> / {reportData.ranking.totalUsers}명</p>
                  <p>상위: <span className="font-semibold">{reportData.ranking.rankPercentile}</span></p>
                  <p>평균 대비: <span className="font-semibold">{reportData.ranking.comparedToAverage > 0 ? '+' : ''}{reportData.ranking.comparedToAverage}%</span></p>
                </div>
              </div>

              <p className="text-xs text-gray-500 text-right mt-4">
                리포트 생성일: {reportData.reportGeneratedAt}
              </p>
            </div>
          ) : null}

          {/* 실제 구매 및 적립 내역 */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">구매 및 적립 내역</h3>
            {isLoadingOrders ? (
              <div className="text-center py-8 text-gray-500">
                <p>구매 내역을 불러오는 중...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>구매 및 적립 내역이 없습니다.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {orders.map((order) => (
                  <li key={order.orderId} className="flex justify-between items-center bg-[#D9E5DA] rounded-xl p-4 shadow-sm">
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 mb-1">
                        {order.productNames.length > 0 
                          ? order.productNames.join(', ')
                          : `주문번호: ${order.orderId}`
                        }
                      </p>
                      <p className="text-gray-600 text-xs mb-1">
                        {formatDate(order.paidAt || order.createdAt)}
                      </p>
                      <p className="text-gray-700 text-sm">
                        구매금액: {order.totalAmount.toLocaleString()}원
                        {order.creditUsed > 0 && (
                          <span className="text-gray-500 ml-2">(포인트 사용: {order.creditUsed.toLocaleString()}p)</span>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      {order.creditEarned > 0 ? (
                        <span className="font-bold text-green-700 text-lg">
                          +{order.creditEarned.toLocaleString()}p
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">적립 없음</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 총 적립 포인트 */}
          {orders.length > 0 && (
            <div className="bg-sub1/30 rounded-xl p-4 flex justify-between items-center mb-6">
              <span className="font-bold text-gray-800">총 적립 포인트</span>
              <span className="text-green-600 font-bold text-lg">
                {orders.reduce((sum, order) => sum + order.creditEarned, 0).toLocaleString()}p
              </span>
            </div>
          )}

          {/* 설명 */}
          <div className="w-full bg-[#8FAB95] rounded-3xl p-6 text-center shadow-sm mt-6">
            <p className="text-white font-medium text-sm sm:text-base leading-relaxed">
              녹색생활(Green Life)은 환경을 보호하고<br />에너지를 절약하며,
              지속 가능한 삶을<br />실천하는 생활 방식입니다.
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
}
