import { useState } from 'react';
import Layout from '../components/Layout';
import TopNav from '../components/TopNav';
import { useNavigate } from 'react-router-dom'; // ← 추가

interface Product {
  id: number;
  name: string;
  img: string;
}

interface Review {
  id: number;
  product: Product;
  title: string;
  content: string;
  date: string;
  status: '공개' | '비공개';
  rating: number;
}

const products: Product[] = [
  { id: 1, name: '리사이클링 지갑', img: '/images/products/p2.png' },
  { id: 2, name: '저탄소 우유', img: '/images/products/product1.jpg' },
  { id: 3, name: '에코백', img: '/images/products/product3.jpg' },
];

export default function ReviewPage() {
  const navigate = useNavigate(); // ← 이전 버튼용
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newStatus, setNewStatus] = useState<'공개' | '비공개'>('공개');
  const [newRating, setNewRating] = useState(5);

  const handleAddReview = () => {
    if (!selectedProductId) {
      alert('리뷰할 상품을 선택해주세요.');
      return;
    }
    if (!newTitle || !newContent) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const product = products.find(p => p.id === selectedProductId)!;

    const newReview: Review = {
      id: reviews.length + 1,
      product,
      title: newTitle,
      content: newContent,
      date: new Date().toISOString().split('T')[0],
      status: newStatus,
      rating: newRating,
    };

    setReviews([newReview, ...reviews]);
    setNewTitle('');
    setNewContent('');
    setNewStatus('공개');
    setSelectedProductId(null);
    setNewRating(5);
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

        <div className="flex-1 overflow-y-auto px-5 pt-0 pb-20 space-y-6">
          {/* 리뷰 작성 섹션 */}
          <section className="mb-6 border rounded-xl p-4 shadow-sm space-y-3">
            <h2 className="font-bold text-gray-800 mb-2">리뷰 작성</h2>

            <select
              className="w-full mb-2 p-2 border rounded"
              value={selectedProductId ?? ''}
              onChange={(e) => setSelectedProductId(Number(e.target.value))}
            >
              <option value="" disabled>리뷰할 상품을 선택하세요</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <div className="flex items-center gap-1 mb-2">
              {[1,2,3,4,5].map((star) => (
                <span
                  key={star}
                  onClick={() => setNewRating(star)}
                  className={`cursor-pointer text-2xl ${star <= newRating ? 'text-yellow-400' : 'text-gray-300'}`}
                > ★
                </span>
              ))}
            </div>

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
                <li key={item.id} className="border rounded-xl p-4 shadow-sm flex flex-col justify-between space-y-2">
                  <div className="flex items-center gap-3">
                    <img src={item.product.img} alt={item.product.name} className="w-16 h-16 object-contain rounded-lg border" />
                    <p className="font-bold text-gray-800">{item.product.name}</p>
                  </div>

                  <div className="flex text-yellow-400 gap-1">
                    {Array.from({length: item.rating}).map((_, idx) => <span key={idx}>★</span>)}
                    {Array.from({length: 5 - item.rating}).map((_, idx) => <span key={idx} className="text-gray-300">★</span>)}
                  </div>

                  <p className="font-bold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
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
