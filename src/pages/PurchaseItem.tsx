import { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import TopNav from "../components/TopNav";
import { getOrders, getOrderDetail, type OrderItem } from '../services/orderService';

// 구매내역 페이지
export default function PurchaseHistoryPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [orderDetails, setOrderDetails] = useState<Record<number, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await getOrders(0, 10);
        setOrders(data.items);
        
        // 각 주문의 상세 정보를 가져와서 상품 이름 추출
        const detailsMap: Record<number, string[]> = {};
        await Promise.all(
          data.items.map(async (order) => {
            try {
              const detail = await getOrderDetail(order.orderId);
              detailsMap[order.orderId] = detail.items.map(item => item.productName);
            } catch (error) {
              console.error(`주문 ${order.orderId} 상세 정보 로드 실패:`, error);
              detailsMap[order.orderId] = [];
            }
          })
        );
        setOrderDetails(detailsMap);
      } catch (error) {
        console.error('주문 목록 로드 실패:', error);
        // 에러 발생 시 빈 배열 유지
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const totalPrice = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  // 주문 상태 한글 변환
  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return '대기중';
      case 'COMPLETED': return '완료';
      case 'CANCELLED': return '취소';
      default: return status;
    }
  };

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

        {/* 컨텐츠 (스크롤 가능 영역) */}
        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-24">
          <div className="py-4 pt-8 pb-6">
            <h2 className="text-2xl font-bold text-gray-900">구매내역</h2>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p>구매내역을 불러오는 중...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p>구매내역이 없습니다.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {orders.map(order => (
                <li key={order.orderId} className="py-4 flex flex-col gap-2 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-gray-800">주문번호: {order.orderId}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                          order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      {/* 구매물품 이름 표시 */}
                      {orderDetails[order.orderId] && orderDetails[order.orderId].length > 0 && (
                        <div className="mb-2">
                          <p className="text-sm font-medium text-gray-700">
                            {orderDetails[order.orderId].join(', ')}
                          </p>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mb-1">주문일: {formatDate(order.createdAt)}</p>
                      {order.paidAt && (
                        <p className="text-xs text-gray-500">결제일: {formatDate(order.paidAt)}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-500 text-lg">{order.totalAmount.toLocaleString()}원</p>
                      {order.creditUsed > 0 && (
                        <p className="text-xs text-gray-500">포인트 사용: {order.creditUsed.toLocaleString()}p</p>
                      )}
                      {order.creditEarned > 0 && (
                        <p className="text-xs text-green-600">포인트 적립: {order.creditEarned.toLocaleString()}p</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 총 구매금액 박스: 하단 고정 */}
        {!isLoading && orders.length > 0 && (
          <div className="fixed bottom-[60px] left-0 right-0 max-w-full mx-auto px-5 pb-2 bg-white border-t border-gray-200 z-30">
            <div className="bg-sub1/30 rounded-xl p-4 flex justify-between items-center">
              <span className="font-bold text-gray-800">총 구매금액</span>
              <span className="font-bold text-red-500">{totalPrice.toLocaleString()}원</span>
            </div>
          </div>
        )}

        {/* BottomNav는 Layout에서 처리됩니다. */}
      </div>
    </Layout>
  );
}
