import { useEffect, useState } from "react";
import { Avatar } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { InfoIcon } from "lucide-react";
import { useInstructionPopupStore } from "./store/use-instruction-popup-store";
import { useGetUser } from "../auth/hooks/queries/use-get-user.query";
import { useAuthStore } from "../auth/store/use-auth-store";
import { useSendParserData } from "../parser/hooks/mutation/send-parser-data.mutation";
import { useStopByChatId } from "../parser/hooks/mutation/use-stop-parser.mutation";
import { ProfileTabSkeleton } from "./profile-skeleton";
import { useParserPopupStore } from "../parser/store/use-parser-popup.store";
import { useNavigate } from "react-router-dom";
import { useSubscriptionPopupStore } from "../tariffs/store/use-subscription-popup-store";
import { SubscriptionAlert } from "../tariffs/ui/subscription-popup";
import { useCheckSubscription } from "../users/hooks/queries/use-check-subscription";

export const ProfileTab = () => {
  const { open } = useInstructionPopupStore();
  const { chatId } = useAuthStore();
  const { mutate: activateParser } = useSendParserData();
  const { data: userData, isLoading } = useGetUser(chatId);
  const { open: openParserPopup } = useParserPopupStore();
  const { mutate: stopParserByChatId } = useStopByChatId();
  const { open: openSubscriptionAlert } = useSubscriptionPopupStore();

  const { data: subscriptionCheck, isLoading: isSubscriptionLoading } =
    useCheckSubscription(chatId as any);

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
      if (!subscriptionCheck?.active) {
        openSubscriptionAlert();
        return;
      }

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
      stopParserByChatId(chatId);
    }

    setIsParserActive((prev) => !prev);
  };

  if (isLoading || isSubscriptionLoading) {
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
          <span className="text-dark text-[16px]">
            Подписка:{" "}
            {subscriptionCheck?.active ? (
              <span className="text-secondary">
                {new Date(subscriptionCheck.expiresAt).toLocaleDateString(
                  "ru-RU"
                )}
              </span>
            ) : (
              <span className="text-red-500 font-semibold">неактивна</span>
            )}
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
        text="Связаться с создателем"
        className="mt-[19px]"
        variant="primary"
        onClick={() =>
          window.open(
            "https://t.me/svejy_veter92",
            "_blank",
            "noopener,noreferrer"
          )
        }
      />
      <Button text="Вывести средства" className="mt-[19px]" variant="primary" />
      <Button
        text="Поменять пароль"
        className="mt-[19px] bg-red-500"
        variant="secondary"
        onClick={() => navigate("/reset-password")}
      />
      <SubscriptionAlert />
    </div>
  );
};
