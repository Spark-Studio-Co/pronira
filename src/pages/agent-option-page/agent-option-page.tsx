"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, User } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Layout } from "@/shared/ui/layout";
import { useUpdateUser } from "@/entities/auth/hooks/mutation/use-update-user.mutation";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";

export const AgentPage = () => {
  const navigation = useNavigate();
  const { chatId } = useAuthStore();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const [formData, setFormData] = useState({
    role: "",
    agencyName: "",
  });

  const [errors, setErrors] = useState({
    role: "",
    agencyName: "",
  });

  const [touched, setTouched] = useState({
    role: false,
    agencyName: false,
  });

  useEffect(() => {
    console.log("🚀 useEffect triggered");
    console.log("Current role:", formData.role);
    console.log("Is agent?", formData.role === "Агент");
  }, [formData.role]);

  const handleInputChange = (key: string, value: string) => {
    console.log("Changed:", key, value);
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
    } else if (field === "agencyName" && formData.role === "Агент" && !value) {
      error = "Укажите название агентства";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateForm = () => {
    let isValid = true;
    const fields = ["role"];

    if (formData.role === "Агент") {
      fields.push("agencyName");
    }

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
        chatId,
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
      <div className="flex items-center justify-center flex-col w-full max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-[24px] font-bold lg:text-[48px] lg:w-full mb-2">
            Ответь на один вопрос!
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Выбери свой статус для продолжения регистрации
          </p>
        </div>

        <div className="w-full p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="w-full flex flex-col gap-6">
            <div>
              <div className="flex items-center mb-2">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">Твой статус *</span>
              </div>
              <Input
                placeholder="Ты агент или частное лицо"
                isSelector
                options={["Агент", "Частное лицо"]}
                value={formData.role}
                onChange={(value: any) => handleInputChange("role", value)}
                onBlur={() => handleBlur("role")}
              />
              {touched.role && errors.role && (
                <p className="mt-1 text-sm text-red-500">{errors.role}</p>
              )}
            </div>

            {formData.role === "Агент" && (
              <div className="transition-all duration-300 ease-in-out">
                <div className="flex items-center mb-2">
                  <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="font-medium">Название агентства *</span>
                </div>
                <Input
                  placeholder="Название агентства в котором работаешь"
                  value={formData.agencyName}
                  onChange={(value: string) =>
                    handleInputChange("agencyName", value)
                  }
                  onBlur={() => handleBlur("agencyName")}
                />

                {touched.agencyName && errors.agencyName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.agencyName}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="w-full text-center mt-4">
            <p className="text-sm text-gray-500">* Обязательные поля</p>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          text={isPending ? "Отправляем..." : "Продолжить"}
          variant="primary"
          className="mt-8 mb-8 lg:max-w-[382px] transition-all hover:scale-105"
          isLamp
        />
      </div>
    </Layout>
  );
};
