import { Button } from "@/shared/ui/button";
import { Layout } from "@/shared/ui/layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import treasure from "/treasure.png";

export const LinksPage = () => {
  const navigation = useNavigate();
  const [links, setLinks] = useState<{ [key: string]: string }>({});
  const [activeInputs, setActiveInputs] = useState<string[]>([]);

  const categories = ["Квартиры", "Дома", "Участки", "Аренда"];

  const handleInputToggle = (category: string) => {
    setActiveInputs((prev) =>
      prev.includes(category) ? prev : [...prev, category]
    );
  };

  const handleLinkChange = (category: string, value: string) => {
    setLinks((prev) => ({ ...prev, [category]: value }));
  };

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
        onClick={() => navigation("/personal")}
        text="Продолжить"
        variant="primary"
        className="mt-[128px] mb-8"
        isLamp
      />
    </Layout>
  );
};
