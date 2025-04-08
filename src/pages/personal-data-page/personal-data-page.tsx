"use client";

import { useState, useEffect } from "react";
import { Input } from "@/shared/ui/input";
import { Layout } from "@/shared/ui/layout";
import { Button } from "@/shared/ui/button";
import { useUpdateUser } from "@/entities/auth/hooks/mutation/use-update-user.mutation";

export const PersonalDataPage = () => {
  const { mutate: updateUser, isPending } = useUpdateUser();

  const [chatId, setChatId] = useState("");

  useEffect(() => {
    const storedChatId = localStorage.getItem("chatId");
    if (storedChatId) setChatId(storedChatId);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    city: "",
    isAgent: false,
    agency: "",
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    city: "",
    isAgent: "",
    agency: "",
    password: "",
    email: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    phoneNumber: false,
    city: false,
    isAgent: false,
    agency: false,
    password: false,
    email: false,
  });

  const handleChange = (
    key: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    let error = "";

    if (typeof value === "string" && !value.trim()) {
      error = "Это поле обязательно";
    } else if (
      field === "phoneNumber" &&
      typeof value === "string" &&
      !/^\+?[0-9]{10,12}$/.test(value)
    ) {
      error = "Введите корректный номер";
    } else if (
      field === "password" &&
      typeof value === "string" &&
      value.length < 6
    ) {
      error = "Минимум 6 символов";
    } else if (
      field === "email" &&
      typeof value === "string" &&
      value &&
      !/\S+@\S+\.\S+/.test(value)
    ) {
      error = "Введите корректный email";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateForm = () => {
    let valid = true;
    const newTouched = { ...touched };

    Object.keys(formData).forEach((key) => {
      const field = key as keyof typeof formData;
      newTouched[field] = true;
      const isValid = validateField(field, formData[field]);
      if (!isValid) valid = false;
    });

    setTouched(newTouched);
    return valid;
  };

  const handleSave = () => {
    if (!chatId) {
      alert("❌ Чат ID не найден в localStorage");
      return;
    }

    if (!validateForm()) return;

    const dto = {
      chatId,
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      city: formData.city,
      isAgent: formData.isAgent,
      agency: formData.agency,
      password: formData.password,
      email: formData.email,
    };

    updateUser(dto, {
      onSuccess: () => {
        alert("✅ Данные успешно сохранены");
      },
      onError: (err) => {
        console.error("Ошибка при обновлении:", err);
      },
    });
  };

  return (
    <Layout isWelcome={false} isHeading heading="Смена личных данных">
      <div className="w-full mt-8 flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-4">
        <div className="lg:col-span-1">
          <Input
            placeholder="Как тебя зовут?"
            value={formData.name}
            onChange={(val) => handleChange("name", val)}
            onBlur={() => handleBlur("name")}
          />
          {touched.name && errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div className="lg:col-span-1">
          <Input
            placeholder="Номер телефона привязанный к телеграм"
            value={formData.phoneNumber}
            onChange={(val) => handleChange("phoneNumber", val)}
            onBlur={() => handleBlur("phoneNumber")}
          />
          {touched.phoneNumber && errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="lg:col-span-1">
          <Input
            placeholder="Из какого ты города?"
            value={formData.city}
            onChange={(val) => handleChange("city", val)}
            onBlur={() => handleBlur("city")}
          />
          {touched.city && errors.city && (
            <p className="mt-1 text-sm text-red-500">{errors.city}</p>
          )}
        </div>

        <div className="lg:col-span-1">
          <Input
            placeholder="Ты агент или частное лицо?"
            value={formData.isAgent ? "агент" : "частное лицо"}
            onChange={(val) =>
              handleChange("isAgent", val.toLowerCase().includes("агент"))
            }
            onBlur={() => handleBlur("isAgent")}
          />
        </div>

        <div className="lg:col-span-1">
          <Input
            placeholder="Название агентства в котором работаешь"
            value={formData.agency}
            onChange={(val) => handleChange("agency", val)}
            onBlur={() => handleBlur("agency")}
          />
          {touched.agency && errors.agency && (
            <p className="mt-1 text-sm text-red-500">{errors.agency}</p>
          )}
        </div>

        <div className="lg:col-span-1">
          <Input
            placeholder="Электронная почта"
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
            onBlur={() => handleBlur("email")}
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="lg:col-span-1 lg:col-start-2">
          <Input
            placeholder="Придумай пароль для входа"
            type="password"
            value={formData.password}
            onChange={(val) => handleChange("password", val)}
            onBlur={() => handleBlur("password")}
          />
          {touched.password && errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center mt-8">
        <Button
          text={isPending ? "Сохраняем..." : "Сохранить"}
          variant="primary"
          className="w-full max-w-[300px]"
          onClick={handleSave}
          isLamp
        />
      </div>
    </Layout>
  );
};
