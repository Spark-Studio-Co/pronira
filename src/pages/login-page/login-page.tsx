"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Layout } from "@/shared/ui/layout";
import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import jin from "@/assets/greeting.png";
import { useLogin } from "@/entities/auth/hooks/mutation/use-login.mutation";

export const LoginPage = () => {
  const navigation = useNavigate();
  const { saveChatId } = useAuthStore();
  const { mutate: login, isPending } = useLogin();

  const [formData, setFormData] = useState({
    chatId: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    chatId: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    chatId: false,
    password: false,
  });

  const handleInputChange = (key: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));

    if (errors[key as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  const validateField = (field: string, value: string | boolean) => {
    let error = "";

    if (typeof value === "string" && !value.trim()) {
      error = "Это поле обязательно";
    } else if (field === "password" && (value as string).length < 6) {
      error = "Пароль должен содержать минимум 6 символов";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateForm = () => {
    const fields = ["chatId", "password"];
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

    login(
      {
        chatId: formData.chatId,
        password: formData.password,
      },
      {
        onSuccess: () => {
          localStorage.setItem("isAuth", "true");

          saveChatId(formData.chatId);
          if (formData.rememberMe) {
            localStorage.setItem("chatId", formData.chatId);
          }

          navigation("/agent");
        },
        onError: (err) => {
          console.error("Ошибка при входе:", err);
          setErrors({
            chatId: "Неверный чат ID или пароль",
            password: "Неверный чат ID или пароль",
          });
        },
      }
    );
  };

  const handleRememberMeChange = () => {
    handleInputChange("rememberMe", !formData.rememberMe);
  };

  return (
    <Layout isWelcome>
      <div className="flex items-center justify-center flex-col w-full">
        <h1 className="text-[24px] font-bold lg:text-[48px] lg:w-full">
          Добро пожаловать!
        </h1>
        <p className="text-muted-foreground mt-2 text-center lg:text-left lg:w-full">
          Войдите в свой аккаунт, используя Telegram чат ID
        </p>

        <div className="w-full mt-8 flex flex-col gap-4 max-w-md">
          <div>
            <Input
              placeholder="Ваш телеграм чат ID *"
              value={formData.chatId}
              onChange={(value) => handleInputChange("chatId", value)}
              onBlur={() => handleBlur("chatId")}
            />
            {touched.chatId && errors.chatId && (
              <p className="mt-1 text-sm text-destructive">{errors.chatId}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Пароль *"
              value={formData.password}
              onChange={(value) => handleInputChange("password", value)}
              onBlur={() => handleBlur("password")}
              type="password"
            />
            {touched.password && errors.password && (
              <p className="mt-1 text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div
            className="flex items-center cursor-pointer mt-2"
            onClick={handleRememberMeChange}
          >
            <div
              className={`w-5 h-5 flex items-center justify-center border rounded mr-2 ${
                formData.rememberMe ? "bg-main border-main" : "border-gray-300"
              }`}
            >
              {formData.rememberMe && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span className="text-sm text-gray-700">Запомнить меня</span>
          </div>
        </div>

        <div className="w-full flex flex-col items-center mt-6 gap-4">
          <Button
            onClick={handleSubmit}
            text={isPending ? "Входим..." : "Войти"}
            variant="primary"
            className="w-full max-w-md"
            isLamp
          />

          <p className="text-sm text-gray-600">
            Еще нет аккаунта?{" "}
            <Link to="/registration" className="text-main hover:underline">
              Зарегистрироваться
            </Link>
          </p>

          <Link
            to="/forgot-password"
            className="text-sm text-main hover:underline"
          >
            Забыли пароль?
          </Link>
        </div>
      </div>

      <div className="w-full flex items-center justify-center mt-8">
        <img
          src={jin || "/placeholder.svg"}
          className="w-[400px] h-[400px]"
          alt="Jin"
        />
      </div>
    </Layout>
  );
};

export default LoginPage;
