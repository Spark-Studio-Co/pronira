import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { BottomTab } from "@/features/bottom-tab/ui/bottom-tab";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ILayout {
  children: React.ReactNode;
  isWelcome: boolean;
  isHeading?: boolean;
  heading?: string;
  isCenter?: boolean;
}

export const Layout: React.FC<ILayout> = ({
  children,
  isWelcome = false,
  isHeading,
  heading,
  isCenter,
}) => {
  const { chatId } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!chatId) {
      navigate("/login", { replace: true });
    }
  }, [chatId, navigate]);

  return (
    <div className="w-full min-h-full">
      <div
        className={`px-4 lg:px-0 pt-[90px] ${
          isWelcome && " lg:pt-[64px]"
        } flex flex-col items-center lg:items-start lg:max-w-[1300px] mx-auto relative`}
      >
        {isHeading && (
          <div
            className={`w-full flex ${
              isCenter ? "lg:items-center lg:justify-center" : "items-start"
            } mb-4`}
          >
            <h1
              className={`text-[28px] lg:text-[48px] text-black text-left ${
                isCenter ? "text-center" : "text-left"
              } font-bold`}
            >
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
