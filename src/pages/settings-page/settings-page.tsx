import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { ProfileInstructionsPopup } from "@/entities/profile/profile-popup";
import { useInstructionPopupStore } from "@/entities/profile/store/use-instruction-popup-store";
import { PromoCodePopup } from "@/entities/promocode/promocode-popup";
import { usePromoCodeStore } from "@/entities/promocode/store/use-promocode-store";
import { Button } from "@/shared/ui/button";
import { Layout } from "@/shared/ui/layout";
import { useNavigate } from "react-router-dom";

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { removeChatId } = useAuthStore();
  const {
    isOpen: isInstructionPopupOpen,
    close,
    open,
  } = useInstructionPopupStore();

  const {
    isOpen: isPromoPopupOpen,
    close: promoClose,
    open: promoOpen,
  } = usePromoCodeStore();

  const handleCodePopupOpen = () => {
    promoOpen();
  };

  const handleCodePopupClose = () => {
    promoClose();
  };

  const handleLogout = () => {
    localStorage.setItem("isAuth", "false");
    removeChatId();
    navigate("/");
  };

  return (
    <Layout isWelcome={false} isHeading heading="Настройки" isCenter>
      <div className="flex flex-col items-center justify-center w-[408px] mx-auto gap-y-4">
        <Button
          text="Задать параметры поиска"
          className="w-full"
          onClick={() => navigate("/personal/links")}
        />
        <Button
          text="Получить промокод для друга"
          className="w-full"
          onClick={handleCodePopupOpen}
        />
        <Button
          text="Отправить платеж за поисковой артефакт"
          className="w-full"
          onClick={() => navigate("/tariffs")}
        />
        <Button
          text="Изменить персональные данные"
          onClick={() => navigate("/settings/personal-data")}
          className="w-full"
        />
        <Button
          text="Инструкция по установке"
          className="w-full bg-green-500"
          onClick={() => open()}
        />
        <Button
          text="Связаться с создателем"
          onClick={() =>
            window.open(
              "https://t.me/svejy_veter92",
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="w-full bg-green-500"
        />
        <Button
          onClick={() => (
            (window.location.href = "https://t.me/Pravilo_N1_ne_byt_N2"),
            "_blank"
          )}
          text="Телеграмм канал"
          variant="secondary"
          className="w-full bg-green-500"
        />
        <Button
          text="Выйти"
          onClick={handleLogout}
          className="w-full bg-red-500"
        />
      </div>
      <ProfileInstructionsPopup
        isOpen={isInstructionPopupOpen}
        onClose={close}
      />
      <PromoCodePopup
        isOpen={isPromoPopupOpen}
        onClose={handleCodePopupClose}
      />
      <span className="flex flex-col justify-center w-full items-center text-center gap-2 mt-8 mb-32">
        ИП Тымченко Ярослав Викторович <br /> <br /> ИНН: 920001086086
      </span>
    </Layout>
  );
};
