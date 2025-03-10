import { Button } from "@/shared/ui/button";
import { Layout } from "@/shared/ui/layout";

export const SettingsPage = () => {
  return (
    <Layout isWelcome={false} isHeading heading="Настройки">
      <Button text="Задать параметры поиска" />
      <Button text="Получить промокод для друга" />
      <Button text="Принять платеж за поисковой артефакт" />
      <Button text="Инструкция по установке" />
      <Button text="Связаться с создателем" variant="secondary" />
    </Layout>
  );
};
