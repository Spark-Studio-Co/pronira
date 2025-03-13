import { House, Settings, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";

interface NavStore {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const useNavStore = create<NavStore>((set) => ({
  activeTab: "personal",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export const BottomTab = () => {
  const navigate = useNavigate();
  const { activeTab, setActiveTab } = useNavStore();

  const handleNavigation = (path: string, tab: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  const getColor = (tab: string) => (activeTab === tab ? "#4A90E2" : "#C2D6F2");

  return (
    <div
      style={{
        boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
      }}
      className="w-full fixed flex items-center justify-between px-[78px] h-[85px] py-[27px]  bottom-0 bg-white rounded-t-[32px] shadow-2xl"
    >
      <House
        color={getColor("personal")}
        size={32}
        onClick={() => handleNavigation("/personal", "personal")}
      />
      <Wallet
        color={getColor("payment")}
        size={32}
        onClick={() => handleNavigation("/payment", "payment")}
      />
      <Settings
        color={getColor("settings")}
        size={32}
        onClick={() => handleNavigation("/settings", "settings")}
      />
    </div>
  );
};
