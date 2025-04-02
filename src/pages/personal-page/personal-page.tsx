import { ProfileInstructionsPopup } from "@/entities/profile/profile-popup";
import { ProfileTab } from "@/entities/profile/profile-tab";
import { useInstructionPopupStore } from "@/entities/profile/store/use-instruction-popup-store";
import { Layout } from "@/shared/ui/layout";
import money_bag from "@/assets/money_bag.png";
import { PromoCodePopup } from "@/entities/promocode/promocode-popup";
import { usePromoCodeStore } from "@/entities/promocode/store/use-promocode-store";

export const PersonalPage = () => {
  const { isOpen, close } = useInstructionPopupStore();
  const { isOpen: isPromoOpen, close: closePromo } = usePromoCodeStore();

  return (
    <Layout isWelcome={false} isHeading heading="Личный кабинет">
      <ProfileTab />
      <PromoCodePopup isOpen={isPromoOpen} onClose={closePromo} />
      <ProfileInstructionsPopup isOpen={isOpen} onClose={close} />
      <img src={money_bag} className="w-[500px] h-[500px]" alt="money_bag" />
    </Layout>
  );
};
