import type { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-full bg-white text-main relative">
      <div className="flex-1 overflow-y-auto pb-[55px]">
        {children}
      </div>
      <BottomNav className="absolute bottom-0 left-0 right-0 z-[70] bg-white" />
    </div>
  );
}

