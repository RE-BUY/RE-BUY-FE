import React, { useState } from 'react';
import Layout from '../components/Layout';
import TopNav from '../components/TopNav';
import { useNavigate } from 'react-router-dom'; // ← 추가

interface Inquiry {
  id: number;
  product?: string; // 문의 상품
  title: string;
  content: string;
  date: string;
  status: string;
  answer?: string; // 답변 내용
}

export default function InquiryPage() {
  const navigate = useNavigate(); // ← 이전 버튼용

  const products = ['리사이클링 지갑', '저탄소 우유', '에코백', '텀블러'];

  const [inquiries, setInquiries] = useState<Inquiry[]>([
    { 
      id: 1, 
      title: '배송 문의', 
      content: '주문한 상품이 아직 도착하지 않았습니다. 언제 받을 수 있을까요?', 
      date: '2025-11-22', 
      status: '답변 완료',
      product: '리사이클링 지갑',
      answer: '고객님, 주문하신 상품은 내일 출고 예정입니다. 조금만 기다려주세요.'
    },
    { 
      id: 2, 
      title: '상품 교환 요청', 
      content: '제품 색상이 마음에 들지 않아 교환을 요청하고 싶습니다.', 
      date: '2025-11-20', 
      status: '답변 대기',
      product: '에코백'
    },
    { 
      id: 3, 
      title: '환불 문의', 
      content: '주문 취소 후 환불 처리가 되었는지 확인하고 싶습니다.', 
      date: '2025-11-18', 
      status: '답변 완료',
      product: '텀블러',
      answer: '환불이 완료되었습니다. 확인 부탁드립니다.'
    },
  ]);

  const [newProduct, setNewProduct] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleSubmit = () => {
    if (!newProduct || !newTitle || !newContent) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const newInquiry: Inquiry = {
      id: inquiries.length + 1,
      product: newProduct,
      title: newTitle,
      content: newContent,
      date: new Date().toISOString().split('T')[0],
      status: '답변 대기'
    };

    setInquiries([newInquiry, ...inquiries]);
    setNewProduct('');
    setNewTitle('');
    setNewContent('');
  };

  const AnswerToggle = ({ answer }: { answer: string }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="mt-3 flex flex-col">
        <button
          onClick={() => setOpen(!open)}
          className="text-[#3d5a44] text-sm font-medium self-start flex items-center gap-1 hover:underline"
        >
          {open ? '답변 접기' : '답변 보기'} <span>{open ? '▲' : '▼'}</span>
        </button>

        {open && (
          <div className="flex items-start gap-2 mt-2">
            <div className="w-0.5 bg-gray-300 h-full mt-1"></div>
            <div className="flex-1 p-2 bg-[#849b89] text-[#ffffff] text-sm rounded">
              {answer}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">
        <TopNav />

        {/* 이전 버튼 */}
        <div className="px-5 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 mb-4"
          >
            ◀ 이전
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-20 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">문의 내역</h2>

          {/* 새 문의 작성 폼 */}
          <div className="mb-6 border rounded-xl p-4 shadow-sm bg-gray-50">
            <h3 className="font-semibold mb-2">새 문의 작성</h3>
            <select
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              className="w-full mb-2 px-3 py-2 border rounded"
            >
              <option value="">문의할 상품 선택</option>
              {products
                .filter((p) => !inquiries.some((inq) => inq.product === p))
                .map((p) => (
                  <option key={p} value={p}>{p}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="문의 제목 입력"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full mb-2 px-3 py-2 border rounded"
            />

            <textarea
              placeholder="문의 내용을 입력해주세요"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full mb-2 px-3 py-2 border rounded resize-none"
              rows={4}
            />

            <button
              onClick={handleSubmit}
              className="w-full py-2 bg-main text-white font-bold rounded-xl hover:bg-[#3d5a44] transition-colors"
            >
              문의 등록
            </button>
          </div>

          {/* 문의 목록 */}
          {inquiries.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <p>문의 내역이 없습니다.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {inquiries.map((item) => (
                <li key={item.id} className="border rounded-xl p-4 shadow-sm flex flex-col justify-between space-y-2">
                  <div className="mb-2">
                    <p className="font-bold text-gray-800">
                      {item.title} {item.product && <span className="text-sm text-gray-500">({item.product})</span>}
                    </p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>

                  <p className="text-sm text-gray-600">{item.content}</p>

                  <span className={`mt-2 text-xs font-semibold px-2 py-1 rounded-full self-start
                    ${item.status === '답변 완료' ? 'bg-gray-100 text-[#3d5a44]' : 'bg-gray-100 text-gray-700'}`}>
                    {item.status}
                  </span>

                  {item.status === '답변 완료' && item.answer && (
                    <AnswerToggle answer={item.answer} />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}
