import { useEffect, useState } from "react";
import { Avatar } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { InfoIcon } from "lucide-react";
import { useInstructionPopupStore } from "./store/use-instruction-popup-store";
import { useGetUser } from "../auth/hooks/queries/use-get-user.query";
import { useAuthStore } from "../auth/store/use-auth-store";
import { useSendParserData } from "../parser/hooks/mutation/send-parser-data.mutation";

export const ProfileTab = () => {
  const { open } = useInstructionPopupStore();
  const { chatId } = useAuthStore();
  const { mutate: activateParser } = useSendParserData();
  const { data: userData } = useGetUser(chatId);

  const [isParserActive, setIsParserActive] = useState(() => {
    return localStorage.getItem("isParserActive") === "true";
  });

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
    } else {
      // Implement parser stop logic if needed
      console.log("Парсер остановлен");
    }

    setIsParserActive((prev) => !prev);
  };

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
        className="mt-[19px]"
        variant="primary"
      />
      <Button text="Создать промокод" className="mt-[19px]" variant="primary" />
    </div>
  );
};
