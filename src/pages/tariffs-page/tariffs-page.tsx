import { Layout } from "@/shared/ui/layout";
import TariffBlock from "./blocks/tariffs-block";

export const TariffsPage = () => {
  return (
    <Layout isWelcome={false} isCenter>
      <TariffBlock />
    </Layout>
  );
};
