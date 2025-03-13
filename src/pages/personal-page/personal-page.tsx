import { ProfileInstructionsPopup } from "@/entities/profile/profile-popup";
import { ProfileTab } from "@/entities/profile/profile-tab";
import { useInstructionPopupStore } from "@/entities/profile/store/use-instruction-popup-store";
import { Layout } from "@/shared/ui/layout";
import { AnnouncementsWidget } from "@/widgets/announcements-widget/announcements-widget";

export const PersonalPage = () => {
  const { isOpen, close } = useInstructionPopupStore();

  return (
    <Layout isWelcome={false} isHeading heading="Личный кабинет">
      <ProfileTab />
      <ProfileInstructionsPopup isOpen={isOpen} onClose={close} />
      <AnnouncementsWidget />
    </Layout>
  );
};
