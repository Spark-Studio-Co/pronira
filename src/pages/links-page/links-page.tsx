import { Button } from "@/shared/ui/button";
import { Layout } from "@/shared/ui/layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { useUpdateUser } from "@/entities/auth/hooks/mutation/use-update-user.mutation";
import pronira from "@/assets/pronira_cool.png";

export const LinksPage = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState<{ [key: string]: string }>({});
  const [activeInputs, setActiveInputs] = useState<string[]>(["Квартиры"]);
  const { chatId } = useAuthStore();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const categories = ["Квартиры", "Дома", "Участки", "Аренда"];

  const handleInputToggle = (category: string) => {
    setActiveInputs((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
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
      onSuccess: () => {
        navigate("/personal");
        localStorage.setItem("isAuth", "true");
      },
      onError: (error) => {
        console.error("Ошибка при отправке данных:", error);
      },
    });
  };

  return (
    <Layout isWelcome>
      <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
        <div className="flex items-start mb-8">
          <div className="w-1/3">
            <img src={pronira} alt="Wizard" className="w-full max-w-[250px]" />
          </div>
          <div className="w-2/3 flex flex-col">
            <span className="text-[20px] font-bold">1. Зайди на Авито</span>
            <span className="text-[20px] mt-2 font-bold">
              2. Задай условия поиска
            </span>
            <span className="text-[20px] mt-2 font-bold">
              3. Вставь ссылку в выбранную категорию
            </span>
          </div>
        </div>

        <div className="flex gap-4 w-full flex-col">
          {categories.map((category) => (
            <div key={category} className="w-full">
              <button
                onClick={() => handleInputToggle(category)}
                className={`w-full rounded-full px-4 py-3 text-left flex items-start justify-start transition-colors ${
                  activeInputs.includes(category)
                    ? "bg-[#1E88E5] text-white"
                    : "bg-main text-white"
                }`}
              >
                {category}
              </button>

              {activeInputs.includes(category) && (
                <div className="flex flex-col gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Ссылку на категорию вставь в это поле"
                    value={links[category] || ""}
                    onChange={(e) => handleLinkChange(category, e.target.value)}
                    className="w-full p-3 bg-gray-200 rounded-full text-black"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          text={isPending ? "Отправляем..." : "Продолжить"}
          variant="primary"
          className="mt-8 mb-8"
          isLamp
          disabled={isPending}
        />
      </div>
    </Layout>
  );
};
