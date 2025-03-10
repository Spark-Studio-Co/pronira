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
      <div className="flex flex-col items-center">
        <h1 className="text-[24px] text-center font-bold">
          Теперь самое интересное!
          <br />
          Выбери одну или несколько моих сокровищниц
        </h1>
      </div>
      <div className="w-full flex flex-col items-center gap-4 mt-8">
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
        <Selector
          name="Аренда"
          onClick={() => setIsChecked(true)}
          isChecked={isChecked}
        />
      </div>
      <Button
        onClick={() => navigation("/links")}
        text="Продолжить"
        variant="primary"
        className="mt-[120px]"
        isLamp
      />
    </Layout>
  );
};
