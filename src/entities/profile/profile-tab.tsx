import { useEffect, useState } from "react";
import { Avatar } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { InfoIcon } from "lucide-react";
import { useInstructionPopupStore } from "./store/use-instruction-popup-store";
import { useGetUser } from "../auth/hooks/queries/use-get-user.query";
import { useAuthStore } from "../auth/store/use-auth-store";
import { useSendParserData } from "../parser/hooks/mutation/send-parser-data.mutation";
import { useDeleteParser } from "../parser/hooks/mutation/use-delete-parser.mutation"; // ⬅️ добавили
import { ProfileTabSkeleton } from "./profile-skeleton";
import { usePromoCodeStore } from "../promocode/store/use-promocode-store";
import { useParserPopupStore } from "../parser/store/use-parser-popup.store";
import { useNavigate } from "react-router-dom";

export const ProfileTab = () => {
  const { open } = useInstructionPopupStore();
  const { chatId } = useAuthStore();
  const { mutate: activateParser } = useSendParserData();
  const { mutate: deleteParser } = useDeleteParser(); // ⬅️ используем delete
  const { data: userData, isLoading } = useGetUser(chatId);
  const { open: openPromo } = usePromoCodeStore();
  const { open: openParserPopup } = useParserPopupStore();

  const [isParserActive, setIsParserActive] = useState(() => {
    return localStorage.getItem("isParserActive") === "true";
  });

  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("isParserActive", String(isParserActive));
  }, [isParserActive]);

  const handleParserToggle = async () => {
    if (!chatId) {
      console.error("Chat ID не найден");
      return;
    }

    if (!isParserActive) {
      activateParser({
        url_flats: userData?.flatsLink,
        url_grounds: userData?.groundsLink,
        url_houses: userData?.housesLink,
        url_rents: userData?.rentLink,
        chat_id: Number(chatId),
        min_price: "0",
        max_price: "10000000000",
      });

      openParserPopup();
    } else {
      // 🛑 Остановка парсера
      deleteParser();
    }

    setIsParserActive((prev) => !prev);
  };

  if (isLoading) {
    return <ProfileTabSkeleton />;
  }

  return (
    <div className="rounded-[16px] w-full flex flex-col bg-gray-light p-4">
      <div className="w-full flex items-center gap-4">
        <Avatar />
        <div className="w-full flex flex-col items-start">
          <div className="w-full flex items-center justify-between">
            <span className="text-main text-[20px] font-bold">
              {userData?.name}
            </span>
            <InfoIcon color="#6798de" onClick={() => open()} />
          </div>
          <span className="text-main text-[16px] mt-1 mb-1 font-bold">
            Баланс: {userData?.balance} руб.
          </span>
          <span className="text-dark text-[16px] ">
            Подписка: <span className="text-secondary">18.02.2025</span>
          </span>
        </div>
      </div>
      <Button
        text={isParserActive ? "Остановить парсер" : "Запустить парсер"}
        onClick={handleParserToggle}
        className={`mt-[19px] ${isParserActive ? "bg-red-500" : ""}`}
        variant="primary"
      />
      <Button
        text="Создать промокод"
        className="mt-[19px]"
        variant="primary"
        onClick={() => openPromo()}
      />
      <Button
        text="Поменять пароль"
        className="mt-[19px] bg-red-500"
        variant="secondary"
        onClick={() => navigate("/reset-password")}
      />
    </div>
  );
};
