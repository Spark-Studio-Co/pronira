import { Button } from "@/shared/ui/button";
import { Layout } from "@/shared/ui/layout";

export const SettingsPage = () => {
  return (
    <Layout isWelcome={false} isHeading heading="Настройки" isCenter>
      <div className="flex flex-col items-center justify-center w-[408px] mx-auto gap-y-8">
        <Button text="Задать параметры поиска" className="w-full" />
        <Button text="Получить промокод для друга" className="w-full" />
        <Button text="Принять платеж за поисковой артефакт" className="w-full" />
        <Button text="Инструкция по установке" className="w-full" />
        <Button text="Связаться с создателем" variant="secondary" className="w-full" />
      </div>
    </Layout>
  );
};
