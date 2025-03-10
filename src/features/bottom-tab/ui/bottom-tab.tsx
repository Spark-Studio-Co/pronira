import { House, MapIcon, Settings, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BottomTab = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
      }}
      className="w-full absolute flex items-center justify-between px-[78px] h-[85px] py-[27px]  bottom-0 bg-white rounded-t-[32px] shadow-2xl"
    >
      <House color="#6798de" size={32} onClick={() => navigate("/personal")} />
      <MapIcon color="#6798de" size={32} onClick={() => navigate("/search")} />
      <Wallet color="#6798de" size={32} onClick={() => navigate("/payment")} />
      <Settings
        color="#6798de"
        size={32}
        onClick={() => navigate("/settings")}
      />
    </div>
  );
};
