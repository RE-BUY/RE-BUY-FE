import React, { useState } from 'react';
import Layout from "../components/Layout";
import { useNavigate } from 'react-router-dom';

interface PostItem {
  id: number;
  place: string;
  time: string;
  capacity: number;
}

export default function PloggingPage() {
  const navigate = useNavigate();

  // 예시 게시글 내 여러 항목
  const items: PostItem[] = [
    { id: 1, place: '경북대', time: '10:00 AM', capacity: 20 },
    { id: 2, place: '동성로', time: '1:00 PM', capacity: 15 },
    { id: 3, place: '수성못', time: '4:00 PM', capacity: 10 },
  ];

  // [State] 항목별 참여/불참 상태 관리
  const [selections, setSelections] = useState<Record<number, '참여' | '불참' | null>>({});

  const handleSelect = (id: number, value: '참여' | '불참') => {
    setSelections(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    // 선택 안 한 항목도 포함해서 alert
    const result = items.map(item => ({
      place: item.place,
      time: item.time,
      status: selections[item.id] || '미선택',
    }));

    alert(JSON.stringify(result, null, 2));
    navigate('/home'); // 완료 후 이동
  };

  return (
    <Layout>
      <div className="flex flex-col h-full bg-white relative">
        
        {/* 상단 이미지 */}
        <div className="w-full h-48 relative shrink-0">
          <img 
            src="/images/products/plogging.jpg" 
            alt="플로깅" 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={() => navigate(-1)} 
            className="absolute top-4 left-4 text-2xl text-white p-2 z-10"
          >
            &#8249;
          </button>
        </div>

        <div className="flex-1 px-6 py-8 flex flex-col space-y-6 overflow-y-auto">

          <div className="text-center mb-4">
            <p className="text-[#4F7457] font-bold text-lg leading-snug">
              당신도 이제 지구 지킴이!<br />
              리바이 플로깅에 참여해보세요
            </p>
          </div>

          {/* 게시글 항목 반복 */}
          {items.map(item => (
            <div key={item.id} className="border rounded-xl p-4 shadow-sm space-y-3">
              <div className="text-gray-700">
                <p><span className="font-bold">장소:</span> {item.place}</p>
                <p><span className="font-bold">시간:</span> {item.time}</p>
                <p><span className="font-bold">모집인원:</span> {item.capacity}명</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleSelect(item.id, '참여')}
                  className={`flex-1 py-3 rounded-lg font-medium shadow-sm transition-all
                    ${selections[item.id] === '참여' 
                      ? 'bg-main text-white ring-2 ring-main' 
                      : 'bg-sub1 text-gray-700 hover:bg-sub2 hover:text-white'}`
                  }
                >
                  참여
                </button>
                <button
                  onClick={() => handleSelect(item.id, '불참')}
                  className={`flex-1 py-3 rounded-lg font-medium shadow-sm transition-all
                    ${selections[item.id] === '불참' 
                      ? 'bg-main text-white ring-2 ring-main' 
                      : 'bg-sub1 text-gray-700 hover:bg-sub2 hover:text-white'}`
                  }
                >
                  불참
                </button>
              </div>
            </div>
          ))}

          {/* 제출 버튼 */}
          <div className="mt-auto">
            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-xl text-lg font-bold shadow-lg bg-main text-white hover:bg-[#3d5a44] transition-colors"
            >
              선택 완료
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
}
