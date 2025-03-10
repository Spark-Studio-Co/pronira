import { BottomTab } from "@/features/bottom-tab/ui/bottom-tab";
import React from "react";

interface ILayout {
  children: React.ReactNode;
  isWelcome: boolean;
  isHeading?: boolean;
  heading?: string;
}

export const Layout: React.FC<ILayout> = ({
  children,
  isWelcome = false,
  isHeading,
  heading,
}) => {
  return (
    <div className="w-full min-h-full">
      <div className="px-4 pt-[90px] flex flex-col items-center">
        {isHeading && (
          <div className="w-full flex items-start mb-4">
            <h1 className="text-[28px] text-black text-left font-bold">
              {heading}
            </h1>
          </div>
        )}
        {children}
      </div>
      {!isWelcome && <BottomTab />}
    </div>
  );
};
