import React from 'react';
import Layout from '../components/Layout';
import TopNav from '../components/TopNav';
import { useNavigate } from 'react-router-dom';

export default function InquiryPage() {
  const navigate = useNavigate();

  // 예시 문의 목록
  const inquiries = [
    { 
      id: 1, 
      title: '배송 문의', 
      content: '주문한 상품이 아직 도착하지 않았습니다. 언제 받을 수 있을까요?', 
      date: '2025-11-22', 
      status: '답변 완료' 
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
      status: '답변 완료' 
    },
  ];

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
              {inquiries.map((item) => (
                <li key={item.id} className="border rounded-xl p-4 shadow-sm flex flex-col justify-between">
                  <div className="mb-2">
                    <p className="font-bold text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                  {/* 문의 내용 preview */}
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.content}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full self-start
                    ${item.status === '답변 완료' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}
