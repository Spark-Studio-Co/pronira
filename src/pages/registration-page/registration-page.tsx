import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Promocode } from "@/entities/promocode/promocode";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Layout } from "@/shared/ui/layout";
import { useUpdateUser } from "@/entities/auth/hooks/mutation/use-update-user.mutation";

export const RegistrationPage = () => {
  const navigation = useNavigate();
  const { mutate: updateUser } = useUpdateUser();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    city: "",
    email: "",
    role: "",
    agencyName: "",
    password: "",
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    updateUser(
      {
        ...formData,
        id: Number(formData.id),
        isAgent: formData.role === "Агент",
      },
      {
        onSuccess: () => navigation("/categories"),
        onError: (err) => console.error("Ошибка при регистрации:", err),
      }
    );
  };

  return (
    <Layout isWelcome>
      <div className="flex items-center justify-center flex-col w-full">
        <h1 className="text-[24px] font-bold lg:text-[48px] lg:w-full">
          Давай знакомиться!
        </h1>
        <div className="w-full mt-8 flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-4">
          <div className="lg:col-span-1">
            <Input
              placeholder="Ваш телеграм id"
              value={formData.id}
              onChange={(e) => handleInputChange("id", e.target.value)}
            />
          </div>
          <div className="lg:col-span-1">
            <Input
              placeholder="Как тебя зовут?"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div className="lg:col-span-1">
            <Input
              placeholder="Номер телефона привязанный к телеграм"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
          </div>
          <div className="lg:col-span-1">
            <Input
              placeholder="Из какого ты города?"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>
          <div className="lg:col-span-1">
            <Input
              placeholder="Поделись электронной почтой"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div className="lg:col-span-1">
            <Input
              placeholder="Ты агент или частное лицо"
              isSelector
              options={["Агент", "Частное лицо"]}
              value={formData.role}
              onChange={(value: any) => handleInputChange("role", value)}
            />
          </div>
          <div className="lg:col-span-1">
            <Input
              placeholder="Название агенства в котором работаешь"
              value={formData.agencyName}
              onChange={(e) => handleInputChange("agencyName", e.target.value)}
            />
          </div>
          <div className="lg:col-span-1 lg:col-start-2">
            <Input
              placeholder="Придумай пароль для входа"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </div>
          <div className="lg:col-span-3 lg:flex lg:justify-center">
            <Promocode />
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          text="Продолжить"
          variant="primary"
          className="mt-8 mb-8 lg:max-w-[382px] lg:mt-16"
          isLamp
        />
      </div>
    </Layout>
  );
};
