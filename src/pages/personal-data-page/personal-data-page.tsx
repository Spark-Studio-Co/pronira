"use client";

import { useState } from "react";
import { Input } from "@/shared/ui/input";
import { Layout } from "@/shared/ui/layout";
import { Button } from "@/shared/ui/button";
import { useUpdateUser } from "@/entities/auth/hooks/mutation/use-update-user.mutation";

export const PersonalDataPage = () => {
  const { mutate: updateUser, isPending } = useUpdateUser();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    role: "",
    agency: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    city: "",
    role: "",
    agency: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    city: false,
    role: false,
    agency: false,
    password: false,
  });

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field: keyof typeof formData, value: string) => {
    let error = "";

    if (!value) {
      error = "Это поле обязательно";
    } else if (field === "phone" && !/^\+?[0-9]{10,12}$/.test(value)) {
      error = "Введите корректный номер";
    } else if (field === "password" && value.length < 6) {
      error = "Минимум 6 символов";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateForm = () => {
    let valid = true;
    const fields = Object.keys(formData) as (keyof typeof formData)[];
    const newTouched = { ...touched };

    fields.forEach((field) => {
      newTouched[field] = true;
      const isValid = validateField(field, formData[field]);
      if (!isValid) valid = false;
    });

    setTouched(newTouched);
    return valid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    updateUser(formData, {
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
            value={formData.phone}
            onChange={(val) => handleChange("phone", val)}
            onBlur={() => handleBlur("phone")}
          />
          {touched.phone && errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
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
            value={formData.role}
            onChange={(val) => handleChange("role", val)}
            onBlur={() => handleBlur("role")}
          />
          {touched.role && errors.role && (
            <p className="mt-1 text-sm text-red-500">{errors.role}</p>
          )}
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
