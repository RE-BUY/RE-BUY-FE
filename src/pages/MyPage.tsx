import BottomNav from "../components/BottomNav";

export default function MyPage() {
  return (
    <div className="flex flex-col h-screen bg-white text-main overflow-hidden pb-16">
      <div className="flex m-6">
        <p className="text-sm font-medium">my</p>
      </div>
      <BottomNav className="absolute bottom-0 left-0 right-0" />
    </div>
  );
}


