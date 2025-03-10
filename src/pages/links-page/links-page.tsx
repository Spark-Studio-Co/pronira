import { Button } from "@/shared/ui/button";
import { Layout } from "@/shared/ui/layout";
import { useNavigate } from "react-router-dom";

export const LinksPage = () => {
  const navigation = useNavigate();

  return (
    <Layout isWelcome>
      <span className="text-[20px] text-center font-bold">
        1.Зайди на авито
      </span>
      <span className="text-[20px] mt-2 text-center font-bold">
        2.Задай условия поиска
      </span>
      <span className="text-[20px] mt-2 text-center font-bold">
        3.Вставь сюда ссылку, или ссылки если ты выбрал несколько категорий
      </span>
      <div className="flex gap-4 w-full mt-[96px] flex-col">
        <button className="w-full rounded-full px-4 py-3 bg-main text-white text-left flex items-start justify-start">
          Квартиры
        </button>
        <button className="w-full rounded-full px-4 py-3 bg-main text-white text-left flex items-start justify-start">
          Дома
        </button>
        <button className="w-full rounded-full px-4 py-3 bg-main text-white text-left flex items-start justify-start">
          Участки
        </button>
      </div>
      <Button
        onClick={() => navigation("/personal")}
        text="Продолжить"
        variant="primary"
        className="mt-[286px]"
        isLamp
      />
    </Layout>
  );
};
