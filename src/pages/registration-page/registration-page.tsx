"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Layout } from "@/shared/ui/layout";
import { useUpdateUser } from "@/entities/auth/hooks/mutation/use-update-user.mutation";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import jin from "@/assets/greeting.png";

export const RegistrationPage = () => {
  const navigation = useNavigate();
  const { saveChatId } = useAuthStore();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const [formData, setFormData] = useState({
    chatId: "",
    name: "",
    phoneNumber: "",
    city: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    chatId: "",
    name: "",
    phoneNumber: "",
    city: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    chatId: false,
    name: false,
    phoneNumber: false,
    city: false,
    email: false,
    password: false,
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));

    if (errors[key as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  const validateField = (field: string, value: string) => {
    let error = "";

    if (!value) {
      error = "Это поле обязательно";
    } else if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Введите корректный email";
    } else if (field === "phoneNumber" && !/^\+?[0-9]{10,12}$/.test(value)) {
      error = "Введите корректный номер телефона";
    } else if (field === "password" && value.length < 6) {
      error = "Пароль должен содержать минимум 6 символов";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateForm = () => {
    const fields = [
      "chatId",
      "name",
      "phoneNumber",
      "city",
      "email",
      "password",
    ];
    let isValid = true;
    const newTouched = { ...touched };

    fields.forEach((field) => {
      newTouched[field as keyof typeof touched] = true;
      const valid = validateField(
        field,
        formData[field as keyof typeof formData]
      );
      if (!valid) isValid = false;
    });

    setTouched(newTouched);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    updateUser(
      {
        ...formData,
      },
      {
        onSuccess: () => {
          saveChatId(formData.chatId);
          navigation("/agent");
        },
        onError: (err) => {
          console.error("Ошибка при регистрации:", err);
        },
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
              placeholder="Ваш телеграм чат id *"
              value={formData.chatId}
              onChange={(value) => handleInputChange("chatId", value)}
              onBlur={() => handleBlur("chatId")}
            />
            {touched.chatId && errors.chatId && (
              <p className="mt-1 text-sm text-red-500">{errors.chatId}</p>
            )}
          </div>
          <div className="lg:col-span-1">
            <Input
              placeholder="Как тебя зовут? *"
              value={formData.name}
              onChange={(value) => handleInputChange("name", value)}
              onBlur={() => handleBlur("name")}
            />
            {touched.name && errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="lg:col-span-1">
            <Input
              placeholder="Номер телефона привязанный к телеграм *"
              value={formData.phoneNumber}
              onChange={(value) => handleInputChange("phoneNumber", value)}
              onBlur={() => handleBlur("phoneNumber")}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="lg:col-span-1">
            <Input
              placeholder="Из какого ты города? *"
              value={formData.city}
              onChange={(value) => handleInputChange("city", value)}
              onBlur={() => handleBlur("city")}
            />
            {touched.city && errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city}</p>
            )}
          </div>
          <div className="lg:col-span-1">
            <Input
              placeholder="Поделись электронной почтой *"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              onBlur={() => handleBlur("email")}
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="lg:col-span-1">
            <Input
              placeholder="Придумай пароль для входа *"
              value={formData.password}
              onChange={(value) => handleInputChange("password", value)}
              onBlur={() => handleBlur("password")}
              type="password"
            />
            {touched.password && errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
        </div>
        <div className="w-full text-center mb-4">
          <p className="text-sm text-gray-500">* Обязательные поля</p>
        </div>
        <Button
          onClick={handleSubmit}
          text={isPending ? "Отправляем..." : "Продолжить"}
          variant="primary"
          className="mt-4 mb-8 lg:max-w-[382px] lg:mt-8"
          isLamp
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <img src={jin} className="w-[500px] h-[500px]" alt="Jin" />
      </div>
    </Layout>
  );
};
