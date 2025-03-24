import { Button } from "@/shared/ui/button";
import { Layout } from "@/shared/ui/layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import treasure from "/treasure.png";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { useUpdateUser } from "@/entities/auth/hooks/mutation/use-update-user.mutation";

export const LinksPage = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState<{ [key: string]: string }>({});
  const [activeInputs, setActiveInputs] = useState<string[]>([]);
  const { chatId } = useAuthStore();

  const { mutate: updateUser, isPending } = useUpdateUser();

  // const { mutateAsync: sendData, isPending } = useSendparserData();

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

    const payload = {
      chatId,
      flatsLink: links["Квартиры"] || "",
      housesLink: links["Дома"] || "",
      groundsLink: links["Участки"] || "",
      rentLink: links["Аренда"] || "",
    };

    updateUser(payload, {
      onSuccess: () => navigate("/personal"),
      onError: (error) => {
        console.error("Ошибка при отправке данных:", error);
      },
    });
  };

  // const handleSubmit = async () => {
  //   if (!chatId) {
  //     console.error("Chat ID не найден");
  //     return;
  //   }

  //   const promises = Object.entries(links)
  //     .filter(([_, url]) => url.trim() !== "")
  //     .map(([category, url]) =>
  //       sendData({
  //         url,
  //         chat_id: Number(chatId),
  //         min_price: "0", // You can collect real values from inputs
  //         max_price: "10000000000", // or from previous pages
  //       })
  //     );

  //   try {
  //     await Promise.all(promises);
  //     navigate("/personal");
  //   } catch (error) {
  //     console.error("Ошибка при отправке ссылок:", error);
  //   }
  // };

  return (
    <Layout isWelcome>
      <span className="text-[20px] text-center font-bold">
        1. Зайди на авито
      </span>
      <span className="text-[20px] mt-2 text-center font-bold">
        2. Задай условия поиска
      </span>
      <span className="text-[20px] mt-2 text-center font-bold">
        3. Вставь сюда ссылку, или ссылки если ты выбрал несколько категорий
      </span>
      <div className="flex gap-4 w-full mt-[96px] flex-col">
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
      <div className="w-full flex items-center justify-center mt-8">
        <img src={treasure} className="w-[400px]" alt="Money" />
      </div>
      <Button
        onClick={handleSubmit}
        text={isPending ? "Отправляем..." : "Продолжить"}
        variant="primary"
        className="mt-[128px] mb-8"
        isLamp
        disabled={isPending}
      />
    </Layout>
  );
};
