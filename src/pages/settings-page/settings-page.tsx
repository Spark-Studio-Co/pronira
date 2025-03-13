import { PromoCodePopup } from "@/entities/promocode/promocode-popup";
import { Button } from "@/shared/ui/button";
import { Layout } from "@/shared/ui/layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SettingsPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Layout isWelcome={false} isHeading heading="Настройки" isCenter>
      <div className="flex flex-col items-center justify-center w-[408px] mx-auto gap-y-8">
        <Button
          text="Задать параметры поиска"
          className="w-full"
          onClick={() => navigate("")}
        />
        <Button
          text="Получить промокод для друга"
          className="w-full"
          onClick={handleOpen}
        />
        <Button
          text="Принять платеж за поисковой артефакт"
          className="w-full"
          onClick={() => navigate("/payment")}
        />
        <Button text="Изменить персональные данные" className="w-full" />
        <Button text="Инструкция по установке" className="w-full" />
        <Button
          text="Связаться с создателем"
          variant="secondary"
          className="w-full"
        />
        <Button text="Телеграмм канал" variant="secondary" className="w-full" />
      </div>
      <PromoCodePopup isOpen={isOpen} onClose={handleClose} />
    </Layout>
  );
};
