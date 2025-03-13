import { ProfileInstructionsPopup } from "@/entities/profile/profile-popup";
import { useInstructionPopupStore } from "@/entities/profile/store/use-instruction-popup-store";
import { PromoCodePopup } from "@/entities/promocode/promocode-popup";
import { Button } from "@/shared/ui/button";
import { Layout } from "@/shared/ui/layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SettingsPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    isOpen: isInstructionPopupOpen,
    close,
    open,
  } = useInstructionPopupStore();

  const handleCodePopupOpen = () => {
    setIsOpen(true);
  };

  const handleCodePopupClose = () => {
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
          onClick={handleCodePopupOpen}
        />
        <Button
          text="Принять платеж за поисковой артефакт"
          className="w-full"
          onClick={() => navigate("/payment")}
        />
        <Button
          text="Изменить персональные данные"
          onClick={() => navigate("/settings/personal-data")}
          className="w-full"
        />
        <Button
          text="Инструкция по установке"
          className="w-full"
          onClick={() => open()}
        />
        <Button
          text="Связаться с создателем"
          variant="secondary"
          onClick={() => (
            (window.location.href = "https://wa.me/+79785054554"), "_blank"
          )}
          className="w-full"
        />
        <Button text="Телеграмм канал" variant="secondary" className="w-full" />
      </div>
      <ProfileInstructionsPopup
        isOpen={isInstructionPopupOpen}
        onClose={close}
      />
      <PromoCodePopup isOpen={isOpen} onClose={handleCodePopupClose} />
    </Layout>
  );
};
