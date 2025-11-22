import { useNavigate, useLocation } from "react-router-dom";

interface BottomNavProps {
  className?: string;
}

export function BottomNav({ className = "" }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "홈", icon: "🏠", path: "/home", onClick: () => navigate("/main") },
    { label: "쇼핑", icon: "🛍️", path: "/list", onClick: () => navigate("/list") },
    { label: "플로깅", icon: "🌐", path: "/plogging", onClick: () => navigate("/plogging") },
    { label: "마이페이지", icon: "👤", path: "/my", onClick: () => navigate("/my") },
  ];

  const isActive = (path: string) => location.pathname === path;
    
  return (
    <nav className={`w-full h-[55px] border-t bg-white flex justify-around items-center text-main text-xs ${className}`}>
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (item.onClick) {
              item.onClick();
            }
          }}
          className={`flex flex-col items-center ${
            isActive(item.path) ? "font-bold text-main" : "text-gray1"
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