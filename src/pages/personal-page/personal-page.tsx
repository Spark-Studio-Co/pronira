import { ProfileInstructionsPopup } from "@/entities/profile/profile-popup";
import { ProfileTab } from "@/entities/profile/profile-tab";
import { useProfilePopupStore } from "@/entities/profile/store/profile-popup-store";
import { Layout } from "@/shared/ui/layout";
import { AnnouncementsWidget } from "@/widgets/announcements-widget/announcements-widget";

export const PersonalPage = () => {
  const { isOpen, close } = useProfilePopupStore();

  return (
    <Layout isWelcome={false} isHeading heading="Личный кабинет">
      <ProfileTab />
      <ProfileInstructionsPopup isOpen={isOpen} onClose={close} />
      <AnnouncementsWidget />
    </Layout>
  );
};
