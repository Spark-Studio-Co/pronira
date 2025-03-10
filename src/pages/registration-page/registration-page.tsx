import { Promocode } from "@/entities/promocode/promocode";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Layout } from "@/shared/ui/layout";
import { useNavigate } from "react-router-dom";

export const RegistrationPage = () => {
  const navigation = useNavigate();

  return (
    <Layout isWelcome>
      <h1 className="text-[24px] font-bold">Давай знакомиться!</h1>
      <div className="w-full  mt-8 flex flex-col gap-3">
        <Input placeholder="Как тебя зовут?" />
        <Input placeholder="Из какого ты города?" />
        <Input placeholder="Номер телефона привязанный к телеграм" />
        <Input placeholder="Поделись электронной почтой" />
        <Input placeholder="Ты агент или частное лицо" />
        <Input placeholder="Название агенства в котором работаешь" />
        <Input placeholder="Придумай пароль для входа" />
        <Promocode />
      </div>
      <Button
        onClick={() => navigation("/categories")}
        text="Продолжить"
        variant="primary"
        className="mt-8 mb-8"
        isLamp
      />
    </Layout>
  );
};
