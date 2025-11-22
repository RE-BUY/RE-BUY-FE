import { useState } from 'react';
import Layout from "../components/Layout";
import TopNav from "../components/TopNav";
import { useNavigate } from 'react-router-dom';
import { ploggingItems } from '../data/products';

export default function PloggingPage() {
  const navigate = useNavigate();

  const [selections, setSelections] = useState<Record<number, boolean>>({});
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSelect = (id: number) => {
    setSelections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const hasAnySelection = Object.values(selections).some(selected => selected);
  const canSubmit = hasAnySelection && isAgreed;

  const handleSubmit = () => {
    // 로컬스토리지에 저장
    localStorage.setItem('myPloggingSelections', JSON.stringify(selections));
    alert('예약이 저장되었습니다!');
    navigate('/my'); // MyPage로 이동
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">
        <TopNav />
        <div className="px-4 py-6 flex-1 overflow-y-auto space-y-6">
          <h2 className="text-xl font-bold text-center text-main mt-2 mb-4">
            예약 가능한 플로깅
          </h2>

          {ploggingItems.map(item => {
            // 각 항목이 선택되었는지 확인
            const isSelected = selections[item.id] || false;
            // 선택된 경우 참여 인원 1, 아니면 0 (실제로는 서버에서 가져와야 하지만 일단 선택 여부로 표시)
            const currentCount = isSelected ? 1 : 0;
            return (
              <div key={item.id} className="border rounded-xl p-4 shadow-sm space-y-1">
                <p><span className="font-bold">장소:</span> {item.place}</p>
                <p><span className="font-bold">날짜:</span> {item.date}</p>
                <p><span className="font-bold">시간:</span> {item.time}</p>
                <p className="mb-2"><span className="font-bold">모집인원:</span> {currentCount}/{item.capacity}</p>

                <button
                  onClick={() => handleSelect(item.id)}
                  className={`w-full py-3 rounded-lg font-medium shadow-sm transition-all
                    ${selections[item.id]
                      ? 'bg-main text-white ring-2 ring-main'
                      : 'bg-sub1 text-gray-700 hover:bg-sub2 hover:text-white'
                    }`}
                >
                  선택
                </button>
              </div>
            );
          })}

          {/* 선택하신 플로깅 */}
          {hasAnySelection && (
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3">선택하신 플로깅</h3>
              <div className="space-y-2">
                {ploggingItems
                  .filter(item => selections[item.id])
                  .map(item => (
                    <div key={item.id} className="p-3 bg-gray-100 rounded-lg">
                      <p className="font-semibold">{item.place}</p>
                      <p className="text-sm text-gray-600">{item.date}   <span className="font-semibold">{item.time}</span></p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 주의사항 */}
          {hasAnySelection && (
            <div className="p-4 mt-6">
            <h3 className="text-lg font-bold mb-4">주의사항</h3>
            <div className="mb-2">
              <p className="text-[12px]">리바이에 가입하셨던 개인정보 제공에 동의합니다.</p>
              <p className="text-[12px]">무단 불참 시 제제가 가해질 수 있음에 동의합니다.</p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <label htmlFor="agree" className="text-sm cursor-pointer">
                동의하기
              </label>
              <input
                type="checkbox"
                id="agree"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full py-3 rounded-xl text-lg font-bold shadow-lg transition-colors mt-4 ${
              canSubmit
                ? 'bg-main text-white hover:bg-[#3d5a44] cursor-pointer'
                : 'bg-sub1 text-gray-700 cursor-not-allowed'
            }`}
          >
            예약하기
          </button>
        </div>
      </div>
    </Layout>
  );
}