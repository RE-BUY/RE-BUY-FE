interface BottomNavProps {
  className?: string;
}

export function BottomNav({ className = "" }: BottomNavProps) {
    const navItems = [
    { label: "홈", icon: "🏠", active: true },
    { label: "카테고리", icon: "📂" },
    { label: "플로깅", icon: "🌐" },
    { label: "마이페이지", icon: "👤" },
    ];
    
    
    return (
    <nav className={`w-full h-[55px] border-t bg-white flex justify-around items-center text-main text-xs ${className}`}>
    {navItems.map((item) => (
    <button
    key={item.label}
    className={`flex flex-col items-center ${
    item.active ? "font-bold text-main" : "text-gray1"
    }`}
    >
    <span className="text-xl">{item.icon}</span>
    <span>{item.label}</span>
    </button>
    ))}
    </nav>
    );
    }
    
    
    export default BottomNav;