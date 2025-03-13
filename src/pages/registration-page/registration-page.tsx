import { Promocode } from "@/entities/promocode/promocode";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Layout } from "@/shared/ui/layout";
import { useNavigate } from "react-router-dom";

export const RegistrationPage = () => {
  const navigation = useNavigate();

  return (
    <Layout isWelcome>
      <div className="flex items-center justify-center flex-col w-full">
        <h1 className="text-[24px] font-bold lg:text-[48px] lg:w-full">
          Давай знакомиться!
        </h1>
        <div className="w-full mt-8 flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-4">
          <div className="lg:col-span-1">
            <Input placeholder="Как тебя зовут?" />
          </div>
          <div className="lg:col-span-1">
            <Input placeholder="Номер телефона привязанный к телеграм" />
          </div>
          <div className="lg:col-span-1">
            <Input placeholder="Из какого ты города?" />
          </div>
          <div className="lg:col-span-1">
            <Input placeholder="Поделись электронной почтой" />
          </div>
          <div className="lg:col-span-1">
            <Input placeholder="Ты агент или частное лицо" />
          </div>
          <div className="lg:col-span-1">
            <Input placeholder="Название агенства в котором работаешь" />
          </div>
          <div className="lg:col-span-1 lg:col-start-2">
            <Input placeholder="Придумай пароль для входа" />
          </div>
          <div className="lg:col-span-3 lg:flex lg:justify-center">
            <Promocode />
          </div>
        </div>
        <Button
          onClick={() => navigation("/categories")}
          text="Продолжить"
          variant="primary"
          className="mt-8 mb-8 lg:max-w-[382px] lg:mt-16"
          isLamp
        />
      </div>
    </Layout>
  );
};
