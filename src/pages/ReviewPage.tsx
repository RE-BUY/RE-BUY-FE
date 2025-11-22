import React, { useState } from 'react';
import Layout from '../components/Layout';
import TopNav from '../components/TopNav';

interface Review {
  id: number;
  title: string;
  content: string;
  date: string;
  status: '공개' | '비공개';
}

export default function ReviewPage() {
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, title: '리사이클링 지갑 만족', content: '제품 퀄리티가 생각보다 좋고 배송도 빠르게 왔어요.', date: '2025-11-21', status: '공개' },
    { id: 2, title: '저탄소 우유 후기', content: '맛이 일반 우유와 비슷하면서 친환경 제품이라 만족도가 높습니다.', date: '2025-11-19', status: '비공개' },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newStatus, setNewStatus] = useState<'공개' | '비공개'>('공개');

  const handleAddReview = () => {
    if (!newTitle || !newContent) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    const newReview: Review = {
      id: reviews.length + 1,
      title: newTitle,
      content: newContent,
      date: new Date().toISOString().split('T')[0],
      status: newStatus,
    };
    setReviews([newReview, ...reviews]); // 최신 리뷰 위쪽에 추가
    setNewTitle('');
    setNewContent('');
    setNewStatus('공개');
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">
        <TopNav />

        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-20 space-y-6">

          {/* 리뷰 작성 섹션 */}
          <section className="mb-6 border rounded-xl p-4 shadow-sm">
            <h2 className="font-bold text-gray-800 mb-2">리뷰 작성</h2>
            <input 
              type="text"
              placeholder="제목을 입력하세요"
              className="w-full mb-2 p-2 border rounded"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea 
              placeholder="내용을 입력하세요"
              className="w-full mb-2 p-2 border rounded"
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
            <div className="flex items-center gap-4 mb-2">
              <label className="flex items-center gap-1">
                <input type="radio" checked={newStatus === '공개'} onChange={() => setNewStatus('공개')} />
                공개
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" checked={newStatus === '비공개'} onChange={() => setNewStatus('비공개')} />
                비공개
              </label>
            </div>
            <button 
              onClick={handleAddReview}
              className="w-full py-2 bg-main text-white font-bold rounded-xl hover:bg-[#3d5a44] transition-colors"
            >
              리뷰 작성
            </button>
          </section>

          {/* 작성된 리뷰 리스트 */}
          {reviews.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <p>작성한 리뷰가 없습니다.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {reviews.map((item) => (
                <li key={item.id} className="border rounded-xl p-4 shadow-sm flex flex-col justify-between">
                  <div className="mb-2">
                    <p className="font-bold text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.content}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full self-start
                    ${item.status === '공개' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
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
