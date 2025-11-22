import Layout from "../components/Layout";
import earth from "../assets/earth.svg";

export default function MainPage() {
return (
<Layout>
<div className="flex flex-col h-full overflow-hidden pb-16">
{/* HERO */}
<section className="flex flex-col items-center mt-10 mb-4">
<p className="text-[40px] font-black tracking-wide">RE:BUY</p>


<div className="w-32 h-32 flex items-center justify-center">
<img src={earth} alt="earth" className="w-full h-full object-contain" />
</div>
</section>


{/* ABOUT */}
<section className="mt-6 mx-8 p-8 bg-sub1 rounded-xl text-center">
<h2 className="text-[24px] font-bold mb-2">about RE:BUY</h2>
<p className="text-base leading-relaxed">
RE:BUY는 친환경 제품을 <br />
추천해주고 안내해주는 어플입니다.<br />
회원가입 후 지구를 지켜주세요!
</p>
</section>


{/* LOGIN BUTTON */}
<button
type="button"
className="mx-12 mt-8 py-3 bg-sub2 text-white rounded-xl font-semibold"
>
로그인 후 이용하기
</button>


{/* SIGNUP */}
<p className="mt-14 mb-20 text-center text-sm">
아직 RE:BUY 회원이 아니신가요?
<button type="button" className="text-main underline ml-1">
회원가입
</button>
</p>
</div>
</Layout>
);
}