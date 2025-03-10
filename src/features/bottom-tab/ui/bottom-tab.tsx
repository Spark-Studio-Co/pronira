import GearIcon from "@/shared/icons/gear-icon";
import GeoIcon from "@/shared/icons/geo-icon";
import HouseIcon from "@/shared/icons/house-icon";
import WalletIcon from "@/shared/icons/wallet-icon";

export const BottomTab = () => {
  return (
    <div className="w-full bg-white py-[27px] px-[78px]">
      <HouseIcon />
      <GeoIcon />
      <WalletIcon />
      <GearIcon />
    </div>
  );
};
