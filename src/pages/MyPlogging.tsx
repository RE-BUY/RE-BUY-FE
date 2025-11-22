import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TopNav from '../components/TopNav';
import { ploggingItems } from '../data/products';

type SelectionStatus = '참여' | '불참' | null;

export default function MyPloggingPage() {
  const [mySelections, setMySelections] = useState<Record<number, SelectionStatus>>({});

  useEffect(() => {
    const saved = localStorage.getItem('myPloggingSelections');
    if (saved) {
      try {
        const parsed: Record<string, '참여' | '불참'> = JSON.parse(saved);
        // key를 number로 변환
        const selections: Record<number, '참여' | '불참'> = {};
        Object.keys(parsed).forEach(key => {
          selections[Number(key)] = parsed[key];
        });
        setMySelections(selections);
      } catch (error) {
        console.error('Failed to parse myPloggingSelections:', error);
      }
    }
  }, []);

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">
        <TopNav />

        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">내 플로깅 예약현황</h2>

          {ploggingItems.map(item => (
            <div key={item.id} className="border rounded-xl p-4 shadow-sm flex justify-between items-center">
              <div>
                <p><span className="font-bold">장소:</span> {item.place}</p>
                <p><span className="font-bold">시간:</span> {item.time}</p>
                <p><span className="font-bold">모집인원:</span> {item.capacity}명</p>
              </div>

              <div className={`px-4 py-2 rounded-lg font-medium
                ${mySelections[item.id] === '참여'
                  ? 'bg-main text-white'
                  : mySelections[item.id] === '불참'
                  ? 'bg-gray-300 text-gray-700'
                  : 'bg-sub1 text-gray-700'
                }`}>
                {mySelections[item.id] ?? '미선택'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
