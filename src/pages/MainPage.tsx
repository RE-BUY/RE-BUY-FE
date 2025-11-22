import { useNavigate } from "react-router-dom";
import earth from "../assets/earth.svg";

export default function MainPage() {
const navigate = useNavigate();

return (
<div className="flex flex-col h-full overflow-hidden pb-16">
{/* HERO */}
<section className="flex flex-col items-center mt-[74px] mb-4">
<p className="text-[40px] font-black text-main tracking-wide">RE:BUY</p>


<div className="w-28 h-28 flex items-center justify-center">
<img src={earth} alt="earth" className="w-full h-full object-contain" />
</div>
</section>


{/* ABOUT */}
<section className="mt-6 mx-10 p-6 bg-sub1 rounded-xl text-center">
<h2 className="text-[24px] font-bold text-main mb-2">about RE:BUY</h2>
<p className="text-base leading-relaxed text-main">
RE:BUY는 친환경 제품을 <br />
추천해주고 안내해주는 어플입니다.<br />
회원가입 후 지구를 지켜주세요!
</p>
</section>


{/* LOGIN BUTTON */}
<button
type="button"
onClick={() => navigate("/login")}
className="mx-10 mt-8 py-3 bg-sub2 text-white rounded-xl font-semibold"
>
로그인 후 이용하기
</button>


{/* SIGNUP */}
<p className="mt-8 mb-20 text-center text-sm text-gray-600">
아직 계정이 없으신가요?{' '}
<button 
type="button" 
onClick={() => navigate("/join1")}
className="font-semibold text-[#4F7457] hover:underline"
>
회원가입
</button>
</p>
</div>
);
}