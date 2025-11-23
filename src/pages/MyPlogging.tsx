import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TopNav from '../components/TopNav';
import { getActivities } from '../services/activityService';
import { ploggingItems } from '../data/products';

export default function MyPloggingPage() {
  const [appliedActivities, setAppliedActivities] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedActivities = async () => {
      try {
        const activitiesData = await getActivities();
        // 이미 신청한 활동 ID만 추출
        const appliedIds: number[] = [];
        if (activitiesData.items) {
          activitiesData.items.forEach(activity => {
            // isApplied 필드가 true이거나 participationId가 있으면 신청한 활동
            if (activity.isApplied || activity.participationId) {
              appliedIds.push(activity.id);
            }
          });
        }
        setAppliedActivities(appliedIds);
      } catch (error) {
        console.error('활동 목록 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppliedActivities();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">
        <TopNav />

        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">내 플로깅 예약현황</h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-8 text-gray-500">
              <p>예약 현황을 불러오는 중...</p>
            </div>
          ) : appliedActivities.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-gray-500">
              <p>신청한 플로깅이 없습니다.</p>
            </div>
          ) : (
            ploggingItems
              .filter(item => appliedActivities.includes(item.id))
              .map(item => (
                <div key={item.id} className="border rounded-xl p-4 shadow-sm flex justify-between items-center">
                  <div>
                    <p><span className="font-bold">장소:</span> {item.place}</p>
                    <p><span className="font-bold">날짜:</span> {item.date}</p>
                    <p><span className="font-bold">시간:</span> {item.time}</p>
                    <p><span className="font-bold">모집인원:</span> {item.capacity}명</p>
                  </div>

                  <div className="px-4 py-2 rounded-lg font-medium bg-main text-white">
                    신청완료
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </Layout>
  );
}
