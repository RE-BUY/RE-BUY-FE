import React, { useState } from 'react';
import Layout from "../components/Layout";
import { useNavigate } from 'react-router-dom';
import { ploggingItems } from '../data/products';

type SelectionStatus = '참여' | '불참';

export default function PloggingPage() {
  const navigate = useNavigate();

  const [selections, setSelections] = useState<Record<number, SelectionStatus | null>>({});

  const handleSelect = (id: number, value: SelectionStatus) => {
    setSelections(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    // 로컬스토리지에 저장
    localStorage.setItem('myPloggingSelections', JSON.stringify(selections));
    alert('예약이 저장되었습니다!');
    navigate('/my'); // MyPage로 이동
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">
        <div className="px-6 py-8 flex-1 overflow-y-auto space-y-6">
          <h2 className="text-xl font-bold text-center text-[#4F7457] mb-4">
            플로깅 예약
          </h2>

          {ploggingItems.map(item => (
            <div key={item.id} className="border rounded-xl p-4 shadow-sm space-y-3">
              <p><span className="font-bold">장소:</span> {item.place}</p>
              <p><span className="font-bold">시간:</span> {item.time}</p>
              <p><span className="font-bold">모집인원:</span> {item.capacity}명</p>

              <div className="flex gap-4">
                <button
                  onClick={() => handleSelect(item.id, '참여')}
                  className={`flex-1 py-3 rounded-lg font-medium shadow-sm transition-all
                    ${selections[item.id] === '참여'
                      ? 'bg-main text-white ring-2 ring-main'
                      : 'bg-sub1 text-gray-700 hover:bg-sub2 hover:text-white'
                    }`}
                >
                  참여
                </button>
                <button
                  onClick={() => handleSelect(item.id, '불참')}
                  className={`flex-1 py-3 rounded-lg font-medium shadow-sm transition-all
                    ${selections[item.id] === '불참'
                      ? 'bg-main text-white ring-2 ring-main'
                      : 'bg-sub1 text-gray-700 hover:bg-sub2 hover:text-white'
                    }`}
                >
                  불참
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-xl text-lg font-bold shadow-lg bg-main text-white hover:bg-[#3d5a44] transition-colors mt-4"
          >
            예약 저장
          </button>
        </div>
      </div>
    </Layout>
  );
}
