import { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import TopNav from "../components/TopNav";
import { useNavigate } from 'react-router-dom';
import { ploggingItems } from '../data/products';
import { applyActivity, getActivities } from '../services/activityService';

export default function PloggingPage() {
  const navigate = useNavigate();
 
  const [selections, setSelections] = useState<Record<number, boolean>>({});
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appliedActivities, setAppliedActivities] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // 페이지 로드 시 이미 신청한 활동 목록 가져오기
  useEffect(() => {
    const fetchAppliedActivities = async () => {
      try {
        const activitiesData = await getActivities();
        console.log('=== 플로깅 페이지 디버깅 ===');
        console.log('전체 활동 데이터:', activitiesData);
        console.log('활동 개수:', activitiesData.items?.length || 0);
        
        // 이미 신청한 ID 모음
        const appliedIds = new Set<number>();
        const initialSelections: Record<number, boolean> = {};

        if (activitiesData.items) {
          activitiesData.items.forEach(activity => {
            console.log(`활동 ID: ${activity.id}, isApplied: ${activity.isApplied}, participationId: ${activity.participationId}`);
            // isApplied 필드가 true이거나 participationId가 있으면 신청한 활동
            if (activity.isApplied || activity.participationId) {
              appliedIds.add(activity.id);
              console.log(`  → 신청한 활동으로 추가됨: ${activity.id}`);
              // 이미 신청한 활동은 선택 상태에 포함하지 않음 (마이플로깅에만 표시)
            }
          });
        }

        console.log('신청한 활동 ID Set:', Array.from(appliedIds));
        console.log('로컬 ploggingItems ID:', ploggingItems.map(item => item.id));
        console.log('==========================');
        
        setAppliedActivities(appliedIds);
        setSelections(initialSelections); // 기본 선택 상태 반영
      } catch (error) {
        console.error('활동 목록 조회 실패:', error);
        // 에러 발생 시 빈 Set 유지
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppliedActivities();
  }, []);

  const handleSelect = (id: number) => {
    // 이미 신청한 활동은 선택할 수 없음
    if (appliedActivities.has(id)) {
      return;
    }
    setSelections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const hasAnySelection = Object.values(selections).some(selected => selected);
  const canSubmit = hasAnySelection && isAgreed;

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // 선택된 모든 활동에 대해 참여 신청 (이미 신청한 활동은 제외)
      const selectedIds = Object.keys(selections)
        .map(Number)
        .filter(id => selections[id] && !appliedActivities.has(id));

      // 모든 활동에 대해 병렬로 참여 신청
      const results = await Promise.allSettled(
        selectedIds.map(activityId => applyActivity(activityId))
      );

      // 결과 처리: 성공한 것과 실패한 것 분리
      const successfulIds: number[] = [];
      const alreadyAppliedIds: number[] = [];

      console.log('=== 예약 신청 결과 디버깅 ===');
      console.log('선택된 활동 ID:', selectedIds);
      console.log('예약 신청 결과:', results);

      results.forEach((result, index) => {
        const activityId = selectedIds[index];
        if (result.status === 'fulfilled') {
          successfulIds.push(activityId);
          console.log(`활동 ${activityId}: 예약 성공`);
        } else {
          // 에러 메시지 확인
          const errorMessage = result.reason?.response?.data?.message || result.reason?.message || '';
          console.log(`활동 ${activityId}: 예약 실패 -`, errorMessage);
          if (errorMessage.includes('이미 신청한 활동')) {
            alreadyAppliedIds.push(activityId);
            setAppliedActivities(prev => new Set([...prev, activityId]));
            console.log(`활동 ${activityId}: 이미 신청한 활동으로 처리`);
          }
        }
      });

      console.log('성공한 활동:', successfulIds);
      console.log('이미 신청한 활동:', alreadyAppliedIds);
      console.log('==========================');

      // 이미 신청한 활동이 있으면 해당 활동들을 신청완료 상태로 표시
      if (alreadyAppliedIds.length > 0) {
        // 선택 상태에서 제거하고 신청완료 상태로 변경
        setSelections(prev => {
          const newSelections = { ...prev };
          alreadyAppliedIds.forEach(id => {
            delete newSelections[id];
          });
          return newSelections;
        });
      }

      // 성공한 활동이 있으면 로컬스토리지에 저장
      if (successfulIds.length > 0) {
        localStorage.setItem('myPloggingSelections', JSON.stringify(selections));
        alert('예약이 저장되었습니다!');
        navigate('/my');
      } else if (alreadyAppliedIds.length > 0) {
        // 모든 활동이 이미 신청된 경우
        alert('선택하신 활동은 이미 신청 완료되었습니다.');
      }
    } catch (error) {
      console.error('예약 신청 실패:', error);
      alert('예약 신청에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">
        <TopNav />
        <div className="px-4 py-6 flex-1 overflow-y-auto space-y-6">
          <h2 className="text-xl font-bold text-center text-main mt-2 mb-4">
            예약 가능한 플로깅
          </h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-8 text-gray-500">
              <p>활동 목록을 불러오는 중...</p>
            </div>
          ) : (
            ploggingItems.map(item => {
            // 각 항목이 선택되었는지 확인
            const isSelected = selections[item.id] || false;
            // 이미 신청한 활동인지 확인
            const isApplied = appliedActivities.has(item.id);
            // 선택된 경우 참여 인원 1, 아니면 0 (실제로는 서버에서 가져와야 하지만 일단 선택 여부로 표시)
            const currentCount = isSelected ? 1 : 0;
            return (
              <div key={item.id} className="border rounded-xl p-4 shadow-sm space-y-1">
                <p><span className="font-bold">장소:</span> {item.place}</p>
                <p><span className="font-bold">날짜:</span> {item.date}</p>
                <p><span className="font-bold">시간:</span> {item.time}</p>
                <p className="mb-2"><span className="font-bold">모집인원:</span> {currentCount}/{item.capacity}</p>

                <button
                  onClick={() => !isApplied && handleSelect(item.id)}
                  disabled={isApplied}
                  className={`w-full py-3 rounded-lg font-medium shadow-sm transition-all ${
                    isApplied
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : selections[item.id]
                      ? 'bg-main text-white ring-2 ring-main'
                      : 'bg-sub1 text-gray-700 hover:bg-sub2 hover:text-white'
                  }`}
                >
                  {isApplied ? '신청완료' : '선택'}
                </button>
              </div>
            );
          })
          )}

          {/* 선택하신 플로깅 */}
          {hasAnySelection && (
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3">선택하신 플로깅</h3>
              <div className="space-y-2">
                {ploggingItems
                  .filter(item => selections[item.id] && !appliedActivities.has(item.id)) // 이미 신청한 활동은 제외
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
              <p className="text-[12px]">RE:BUY에 가입하셨던 개인정보 제공에 동의합니다.</p>
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
            disabled={!canSubmit || isSubmitting}
            className={`w-full py-3 rounded-xl text-lg font-bold shadow-lg transition-colors mt-4 ${
              canSubmit && !isSubmitting
                ? 'bg-main text-white hover:bg-[#3d5a44] cursor-pointer'
                : 'bg-sub1 text-gray-700 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? '예약 중...' : '예약하기'}
          </button>
        </div>
      </div>
    </Layout>
  );
}
