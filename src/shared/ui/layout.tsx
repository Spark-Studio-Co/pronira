import { BottomTab } from "@/features/bottom-tab/ui/bottom-tab";
import React from "react";

interface ILayout {
  children: React.ReactNode;
  isWelcome: boolean;
}

export const Layout: React.FC<ILayout> = ({ children, isWelcome = false }) => {
  return (
    <div className="w-full min-h-full">
      <div className="px-4 py-[90px] flex flex-col items-center">
        {children}
      </div>
      {!isWelcome && <BottomTab />}
    </div>
  );
};
