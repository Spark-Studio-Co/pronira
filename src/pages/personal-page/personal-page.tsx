import { ProfileInstructionsPopup } from "@/entities/profile/profile-popup";
import { ProfileTab } from "@/entities/profile/profile-tab";
import { useInstructionPopupStore } from "@/entities/profile/store/use-instruction-popup-store";
import { Layout } from "@/shared/ui/layout";
import money_bag from "@/assets/money_bag.png";

export const PersonalPage = () => {
  const { isOpen, close } = useInstructionPopupStore();

  return (
    <Layout isWelcome={false} isHeading heading="Личный кабинет">
      <ProfileTab />
      <ProfileInstructionsPopup isOpen={isOpen} onClose={close} />
      <img src={money_bag} className="w-[500px] h-[500px]" alt="money_bag" />
    </Layout>
  );
};
