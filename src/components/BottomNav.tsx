import { useNavigate, useLocation } from "react-router-dom";
import homeIcon from "../assets/home.svg";
import shoppingIcon from "../assets/shopping.svg";
import ploggingIcon from "../assets/plogging.svg";
import myIcon from "../assets/my.svg";

interface BottomNavProps {
  className?: string;
}

export function BottomNav({ className = "" }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "홈", icon: homeIcon, path: "/home", onClick: () => navigate("/home"), size: "w-7 h-7", iconClassName: "top-[2px]" },
    { label: "쇼핑", icon: shoppingIcon, path: "/list", onClick: () => navigate("/list"), size: "w-[26px] h-[24px]", iconClassName: "" },
    { label: "플로깅", icon: ploggingIcon, path: "/plogging", onClick: () => navigate("/plogging"), size: "w-7 h-7", iconClassName: "" },
    { label: "마이페이지", icon: myIcon, path: "/my", onClick: () => navigate("/my"), size: "w-[26px] h-[26px]", iconClassName: "" },
  ];

  const isActive = (path: string) => location.pathname === path;
    
  return (
    <nav className={`w-full h-[55px] border-t bg-white flex items-center text-main text-xs ${className}`}>
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
          className={`flex-1 flex flex-col items-center justify-end ${
            isActive(item.path) ? "font-bold text-main" : "text-main"
          }`}
        >
          <div className={`h-8 flex items-end justify-center ${item.iconClassName}`}>
            <img src={item.icon} alt={item.label} className={item.size} />
          </div>
          <span className="h-4 text-xs leading-tight mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;