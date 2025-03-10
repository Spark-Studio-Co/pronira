import { ProfileTab } from "@/entities/profile/profile-tab";
import { Layout } from "@/shared/ui/layout";
import { AnnouncementsWidget } from "@/widgets/announcements-widget/announcements-widget";

export const PersonalPage = () => {
  return (
    <Layout isWelcome={false} isHeading heading="Личный кабинет">
      <ProfileTab />
      <AnnouncementsWidget />
    </Layout>
  );
};
