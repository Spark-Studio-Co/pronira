import { Input } from "@/shared/ui/input";
import { Layout } from "@/shared/ui/layout";

export const PersonalDataPage = () => {
  return (
    <Layout isWelcome={false} isHeading heading="Смена личных данных">
      <div className="w-full mt-8 flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-4">
        <div className="lg:col-span-1">
          <Input placeholder="Как тебя зовут?" />
        </div>
        <div className="lg:col-span-1">
          <Input placeholder="Номер телефона привязанный к телеграм" />
        </div>
        <div className="lg:col-span-1">
          <Input placeholder="Из какого ты города?" />
        </div>
        <div className="lg:col-span-1">
          <Input placeholder="Ты агент или частное лицо?" />
        </div>
        <div className="lg:col-span-1">
          <Input placeholder="Название агенства в котором работаешь" />
        </div>
        <div className="lg:col-span-1 lg:col-start-2">
          <Input placeholder="Придумай пароль для входа" />
        </div>
      </div>
    </Layout>
  );
};
