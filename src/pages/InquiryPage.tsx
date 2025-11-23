import { useState } from 'react';
import Layout from '../components/Layout';
import TopNav from '../components/TopNav';

export default function InquiryPage() {
  const [openedInquiries, setOpenedInquiries] = useState<Set<number>>(new Set());

  // 예시 문의 목록
  const inquiries = [
    { 
      id: 1, 
      title: '배송 문의', 
      content: '주문한 상품이 아직 도착하지 않았습니다. 언제 받을 수 있을까요?', 
      date: '2025-11-22', 
      status: '답변 완료',
      answer: '안녕하세요. 주문하신 상품은 발송 완료되어 현재 배송 중입니다. 예상 도착일은 11월 25일(월)입니다. 배송 추적은 주문내역에서 확인하실 수 있습니다. 추가 문의사항이 있으시면 언제든지 연락주세요.'
    },
    { 
      id: 2, 
      title: '상품 교환 요청', 
      content: '제품 색상이 마음에 들지 않아 교환을 요청하고 싶습니다.', 
      date: '2025-11-20', 
      status: '답변 대기' 
    },
    { 
      id: 3, 
      title: '환불 문의', 
      content: '주문 취소 후 환불 처리가 되었는지 확인하고 싶습니다.', 
      date: '2025-11-18', 
      status: '답변 완료',
      answer: '주문 취소 및 환불 처리가 완료되었습니다. 환불 금액은 결제하신 수단으로 3-5일 내에 입금될 예정입니다. 환불 내역은 주문내역 페이지에서 확인하실 수 있습니다. 감사합니다.'
    },
    {
      id: 4,
      title: '상품 품질 문의',
      content: '구매한 제품에 작은 흠집이 있어 문의드립니다.',
      date: '2025-11-15',
      status: '답변 완료',
      answer: '불편을 드려 죄송합니다. 제품에 흠집이 발견되셨다면 교환 또는 환불 처리가 가능합니다. 고객센터로 연락주시면 빠르게 처리해드리겠습니다. 연락처: 1588-0000'
    },
  ];

  const toggleInquiry = (id: number) => {
    setOpenedInquiries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">
        
        {/* TopNav */}
        <TopNav />

        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">문의 내역</h2>

          {inquiries.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <p>문의 내역이 없습니다.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {inquiries.map((item) => {
                const isOpen = openedInquiries.has(item.id);
                const hasAnswer = item.status === '답변 완료' && (item as any).answer;
                
                return (
                  <li 
                    key={item.id} 
                    className={`border rounded-xl p-4 shadow-sm flex flex-col ${hasAnswer ? 'cursor-pointer' : ''}`}
                    onClick={() => hasAnswer && toggleInquiry(item.id)}
                  >
                    <div className="mb-2">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-gray-800">{item.title}</p>
                        {hasAnswer && (
                          <span className="text-xs text-gray-400">
                            {isOpen ? '▼' : '▶'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                    {/* 문의 내용 */}
                    <p className="text-sm text-gray-600 mb-2">{item.content}</p>
                    
                    {/* 답변 내용 (토글) */}
                    {hasAnswer && isOpen && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs font-semibold text-main mb-2">답변</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{(item as any).answer}</p>
                      </div>
                    )}
                    
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full self-start mt-2
                      ${item.status === '답변 완료' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {item.status}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}
