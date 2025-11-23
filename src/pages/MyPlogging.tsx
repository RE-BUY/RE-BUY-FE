import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TopNav from '../components/TopNav';
import { getMyApplications, type Activity } from '../services/activityService';

export default function MyPloggingPage() {
  const [appliedActivities, setAppliedActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedActivities = async () => {
      try {
        const activitiesData = await getMyApplications();
        console.log('=== 마이플로깅 디버깅 ===');
        console.log('신청한 활동 데이터:', activitiesData);
        console.log('활동 개수:', activitiesData.items?.length || 0);
        
        // API에서 받은 활동 정보를 그대로 사용
        if (activitiesData.items) {
          activitiesData.items.forEach(activity => {
            console.log(`활동 ID: ${activity.id}, 이름: ${activity.name}, 장소: ${activity.location}, 날짜: ${activity.date}, 시간: ${activity.time}`);
          });
          setAppliedActivities(activitiesData.items);
        } else {
          setAppliedActivities([]);
        }
        
        console.log('========================');
      } catch (error) {
        console.error('신청한 활동 목록 조회 실패:', error);
        setAppliedActivities([]);
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
            appliedActivities.map((activity) => (
              <div key={activity.id} className="border rounded-xl p-4 shadow-sm flex justify-between items-center">
                <div>
                  {activity.name && (
                    <p className="font-bold text-lg mb-2">{activity.name}</p>
                  )}
                  {activity.location && (
                    <p><span className="font-bold">장소:</span> {activity.location}</p>
                  )}
                  {activity.date && (
                    <p><span className="font-bold">날짜:</span> {activity.date}</p>
                  )}
                  {activity.time && (
                    <p><span className="font-bold">시간:</span> {activity.time}</p>
                  )}
                  {activity.capacity !== undefined && (
                    <p><span className="font-bold">모집인원:</span> {activity.capacity}명</p>
                  )}
                  {activity.currentParticipants !== undefined && activity.capacity !== undefined && (
                    <p><span className="font-bold">현재 참여자:</span> {activity.currentParticipants}/{activity.capacity}명</p>
                  )}
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
