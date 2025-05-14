"use client";

import { useEffect, useRef, useState } from "react";
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
import { useStartParsersByChatId } from "../parser/hooks/mutation/use-start-parser-by-chat-id.mutation";

export const ProfileTab = () => {
  const { open } = useInstructionPopupStore();
  const { chatId } = useAuthStore();
  const { mutate: activateParser } = useSendParserData();
  const { mutate: startParsersByChatId } = useStartParsersByChatId();
  const { data: userData, isLoading } = useGetUser(chatId);
  const { open: openParserPopup } = useParserPopupStore();
  const { mutate: stopParserByChatId } = useStopByChatId();
  const { open: openSubscriptionAlert } = useSubscriptionPopupStore();

  const { data: subscriptionCheck, isLoading: isSubscriptionLoading } =
    useCheckSubscription(chatId as any);

  const [isParserActive, setIsParserActive] = useState(() => {
    return localStorage.getItem("isParserActive") === "true";
  });

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const navigate = useNavigate();

  // Автозапуск парсера — только один раз
  const hasStartedParser = useRef(false);

  useEffect(() => {
    localStorage.setItem("isParserActive", String(isParserActive));
  }, [isParserActive]);

  // ✅ Логика автозапуска парсера - обновлена для использования нового API
  useEffect(() => {
    if (
      chatId &&
      subscriptionCheck?.active &&
      isParserActive &&
      userData &&
      !hasStartedParser.current
    ) {
      hasStartedParser.current = true;

      // Используем новый метод API для запуска парсера по chatId
      startParsersByChatId(chatId);
      openParserPopup();
    }
  }, [
    chatId,
    subscriptionCheck?.active,
    isParserActive,
    userData,
    startParsersByChatId,
    openParserPopup,
  ]);

  // Timer logic
  useEffect(() => {
    if (subscriptionCheck?.active && subscriptionCheck?.expiresAt) {
      const calculateTimeLeft = () => {
        const expiryTime = new Date(subscriptionCheck.expiresAt).getTime();
        const now = new Date().getTime();
        const difference = expiryTime - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeRemaining({ days, hours, minutes, seconds });
        } else {
          setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(timer);
    }
  }, [subscriptionCheck]);

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

      // Используем новый метод API для запуска парсера по chatId
      startParsersByChatId(chatId);
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

          {/* Subscription timer */}
          {subscriptionCheck?.active && (
            <div className="w-full mt-2 p-2 bg-blue-50 rounded-md border border-blue-200">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-blue-700">
                  Осталось времени:
                </p>
                {subscriptionCheck?.freePlan && (
                  <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    Бесплатный тариф
                  </span>
                )}
              </div>
              <div className="flex justify-between mt-1 text-blue-800">
                <div className="text-center">
                  <span className="text-lg font-bold">
                    {timeRemaining.days}
                  </span>
                  <p className="text-xs">дней</p>
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold">
                    {timeRemaining.hours}
                  </span>
                  <p className="text-xs">часов</p>
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold">
                    {timeRemaining.minutes}
                  </span>
                  <p className="text-xs">минут</p>
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold">
                    {timeRemaining.seconds}
                  </span>
                  <p className="text-xs">секунд</p>
                </div>
              </div>
            </div>
          )}
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
