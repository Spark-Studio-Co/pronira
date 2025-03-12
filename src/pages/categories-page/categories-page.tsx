import { Button } from "@/shared/ui/button";
import { Layout } from "@/shared/ui/layout";
import { Selector } from "@/shared/ui/selector";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CategoriesPage = () => {
  const navigation = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Layout isWelcome>
      <div className="lg:items-center lg:justify-center w-full flex flex-col">
        <div className="flex flex-col items-start w-full">
          <h1 className="text-[24px] text-center lg:text-left font-bold">
            <span className="lg:text-[48px]">
              Теперь самое интересное!
            </span>
            <br />
            <span className="lg:text-[24px]">
              Выбери одну или несколько моих сокровищниц
            </span>
          </h1>
        </div>
        <div className="w-full flex flex-col items-center gap-4 lg:gap-x-9 mt-8 lg:mt-16 lg:grid lg:grid-cols-3">
          <Selector
            name="Квартиры"
            onClick={() => setIsChecked(true)}
            isChecked={isChecked}
          />
          <Selector
            name="Дома"
            onClick={() => setIsChecked(true)}
            isChecked={isChecked}
          />
          <Selector
            name="Земельные участки"
            onClick={() => setIsChecked(true)}
            isChecked={isChecked}
          />
          <div className="lg:col-span-1 lg:col-start-2 lg:mt-10">
            <Selector
              name="Аренда"
              onClick={() => setIsChecked(true)}
              isChecked={isChecked}
            />
          </div>
        </div>
        <Button
          onClick={() => navigation("/links")}
          text="Продолжить"
          variant="primary"
          className="mt-[120px] mb-8 lg:max-w-[382px]"
          isLamp
        />
      </div>
    </Layout>
  );
};
