"use client";

import { Button } from "@/shared/ui/button";
import { Layout } from "@/shared/ui/layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { useUpdateLinks } from "@/entities/parser/hooks/mutation/use-update-links.mutation";

export const PersonalLinksPage = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState<{ [key: string]: string }>({});
  const [activeInputs, setActiveInputs] = useState<string[]>([]);
  const { chatId } = useAuthStore();

  const { mutate: updateLinks, isPending } = useUpdateLinks();

  const categories = ["Квартиры", "Дома", "Участки", "Аренда"];

  const handleInputToggle = (category: string) => {
    setActiveInputs((prev) =>
      prev.includes(category) ? prev : [...prev, category]
    );
  };

  const handleLinkChange = (category: string, value: string) => {
    setLinks((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = () => {
    if (!chatId) {
      console.error("Chat ID не найден");
      return;
    }

    // test

    const categoryTokenMap: Record<string, string> = {
      Квартиры: "7678740477:AAGMQoWpVLIRsVUs9S2Lw7eosn8onxYOoic",
      Участки: "7364782502:AAED4nvuEYAzeI4W_rKHwUQfO7y92jQXilY",
      Дома: "7775446952:AAE7NOZXxEic8GSzXZMsNwCd6QH2prRsU7Q",
      Аренда: "7754457993:AAF2puDGSWt1mMKEWDG5lXTp19m6t1gAnWE",
    };

    const linksArray = Object.entries(links)
      .filter(([_, url]) => url.trim() !== "")
      .map(([category, url]) => ({
        category,
        url,
        tgToken: categoryTokenMap[category] || "",
      }));

    const payload = {
      userId: chatId,
      links: linksArray,
    };

    updateLinks(payload as any, {
      onSuccess: () => navigate("/personal"),
      onError: (error) => {
        console.error("Ошибка при отправке данных:", error);
      },
    });
  };

  return (
    <Layout isWelcome={false}>
      <h1 className="text-5xl text-center mb-4 text-dark">Ссылки</h1>
      <div className="flex gap-4 w-full mt-[32px] flex-col">
        {categories.map((category) => (
          <div key={category}>
            <button
              onClick={() => handleInputToggle(category)}
              className="w-full rounded-full px-4 py-3 bg-main text-white text-left flex items-start justify-start"
            >
              {category}
            </button>
            {activeInputs.includes(category) && (
              <input
                type="text"
                placeholder="Вставь ссылку сюда"
                value={links[category] || ""}
                onChange={(e) => handleLinkChange(category, e.target.value)}
                className="w-full mt-2 p-3 bg-gray-200 rounded-full text-black"
              />
            )}
          </div>
        ))}
      </div>
      <Button
        onClick={handleSubmit}
        text={isPending ? "Отправляем..." : "Продолжить"}
        variant="primary"
        className="mt-[32px] mb-8"
        isLamp
        disabled={isPending}
      />
    </Layout>
  );
};
