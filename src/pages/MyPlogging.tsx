import { useState } from 'react';
import Layout from '../components/Layout';
import TopNav from '../components/TopNav';
import { ploggingItems } from '../data/products';

type SelectionStatus = '참여';

// localStorage에서 예약된 항목만 가져오는 함수
const getInitialSelections = (): Record<number, SelectionStatus> => {
  try {
    const saved = localStorage.getItem('myPloggingSelections');
    if (saved) {
      const parsed: Record<string, boolean> = JSON.parse(saved);
      const selections: Record<number, SelectionStatus> = {};
      Object.keys(parsed).forEach(key => {
        if (parsed[key]) { // 선택된 항목만 '참여'로 표시
          selections[Number(key)] = '참여';
        }
      });
      return selections;
    }
  } catch (error) {
    console.error('Failed to parse myPloggingSelections:', error);
  }
  return {};
};

export default function MyPloggingPage() {
  const [mySelections] = useState<Record<number, SelectionStatus>>(getInitialSelections);

  // 선택된 항목만 필터링
  const selectedItems = ploggingItems.filter(item => mySelections[item.id] === '참여');

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">
        <TopNav />

        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">내 플로깅 예약현황</h2>

          {selectedItems.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <p>예약된 플로깅이 없습니다.</p>
            </div>
          ) : (
            selectedItems.map(item => (
              <div key={item.id} className="border rounded-xl p-4 shadow-sm flex justify-between items-center">
                <div>
                  <p><span className="font-bold">장소:</span> {item.place}</p>
                  <p><span className="font-bold">날짜:</span> {item.date}</p>
                  <p><span className="font-bold">시간:</span> {item.time}</p>
                  <p><span className="font-bold">모집인원:</span> {item.capacity}명</p>
                </div>

                <div className="px-4 py-2 rounded-lg bg-main text-white font-medium">
                  참여
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
