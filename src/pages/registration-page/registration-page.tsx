"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    privacyPolicy: false,
    userAgreement: false,
    readmeAgreement: false,
    subscriptionAgreement: false, // Added subscription agreement
  });

  const [errors, setErrors] = useState({
    chatId: "",
    name: "",
    phoneNumber: "",
    city: "",
    email: "",
    password: "",
    privacyPolicy: "",
    userAgreement: "",
    readmeAgreement: "",
    subscriptionAgreement: "", // Added subscription agreement
  });

  const [touched, setTouched] = useState({
    chatId: false,
    name: false,
    phoneNumber: false,
    city: false,
    email: false,
    password: false,
    privacyPolicy: false,
    userAgreement: false,
    readmeAgreement: false,
    subscriptionAgreement: false, // Added subscription agreement
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

    if (field === "privacyPolicy") {
      if (!value) {
        error = "Необходимо принять политику конфиденциальности";
      }
    } else if (field === "userAgreement") {
      if (!value) {
        error = "Необходимо принять пользовательское соглашение";
      }
    } else if (field === "readmeAgreement") {
      if (!value) {
        error = "Необходимо ознакомиться с информацией";
      }
    } else if (field === "subscriptionAgreement") {
      // Added validation for subscription agreement
      if (!value) {
        error = "Необходимо принять условия подписки";
      }
    } else if (!value) {
      error = "Это поле обязательно";
    } else if (field === "email" && !/\S+@\S+\.\S+/.test(value as string)) {
      error = "Введите корректный email";
    } else if (
      field === "phoneNumber" &&
      !/^\+?[0-9]{10,12}$/.test(value as string)
    ) {
      error = "Введите корректный номер телефона";
    } else if (field === "password" && (value as string).length < 6) {
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
      "privacyPolicy",
      "userAgreement",
      "readmeAgreement",
      "subscriptionAgreement", // Added to validation
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

    // Extract only the data fields needed for the API call
    // Exclude the agreement flags
    const {
      privacyPolicy,
      userAgreement,
      readmeAgreement,
      subscriptionAgreement,
      ...dataToSubmit
    } = formData;

    updateUser(dataToSubmit, {
      onSuccess: () => {
        saveChatId(formData.chatId);
        navigation("/agent");
      },
      onError: (err) => {
        console.error("Ошибка при регистрации:", err);
      },
    });
  };

  const handlePrivacyPolicyChange = () => {
    handleInputChange("privacyPolicy", !formData.privacyPolicy);
  };

  const handleUserAgreementChange = () => {
    handleInputChange("userAgreement", !formData.userAgreement);
  };

  const handleReadmeAgreementChange = () => {
    handleInputChange("readmeAgreement", !formData.readmeAgreement);
  };

  const handleSubscriptionAgreementChange = () => {
    handleInputChange("subscriptionAgreement", !formData.subscriptionAgreement);
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
        <div className="w-full mt-6 flex flex-col gap-4 items-start">
          {/* Privacy Policy Checkbox */}
          <div
            className="flex items-center cursor-pointer"
            onClick={handlePrivacyPolicyChange}
          >
            <div
              className={`w-5 h-5 flex items-center justify-center border rounded mr-2 ${
                formData.privacyPolicy
                  ? "bg-main border-main"
                  : "border-gray-300"
              }`}
            >
              {formData.privacyPolicy && (
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
            <span className="text-sm text-gray-700">
              Я принимаю условия{" "}
              <Link
                to="/privacy-policy"
                className="text-main underline"
                target="_blank"
                rel="noreferrer"
              >
                политики конфиденциальности
              </Link>{" "}
              *
            </span>
          </div>
          {touched.privacyPolicy && errors.privacyPolicy && (
            <p className="mt-1 text-sm text-red-500 ml-7">
              {errors.privacyPolicy}
            </p>
          )}

          {/* User Agreement Checkbox */}
          <div
            className="flex items-center cursor-pointer"
            onClick={handleUserAgreementChange}
          >
            <div
              className={`w-5 h-5 flex items-center justify-center border rounded mr-2 ${
                formData.userAgreement
                  ? "bg-main border-main"
                  : "border-gray-300"
              }`}
            >
              {formData.userAgreement && (
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
            <span className="text-sm text-gray-700">
              Я принимаю{" "}
              <Link
                to="/user-agreement"
                className="text-main underline"
                target="_blank"
                rel="noreferrer"
              >
                пользовательское соглашение
              </Link>{" "}
              *
            </span>
          </div>
          {touched.userAgreement && errors.userAgreement && (
            <p className="mt-1 text-sm text-red-500 ml-7">
              {errors.userAgreement}
            </p>
          )}

          {/* Readme Checkbox */}
          <div
            className="flex items-center cursor-pointer"
            onClick={handleReadmeAgreementChange}
          >
            <div
              className={`w-5 h-5 flex items-center justify-center border rounded mr-2 ${
                formData.readmeAgreement
                  ? "bg-main border-main"
                  : "border-gray-300"
              }`}
            >
              {formData.readmeAgreement && (
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
            <span className="text-sm text-gray-700">
              Я ознакомился с{" "}
              <Link
                to="/readme"
                className="text-main underline"
                target="_blank"
                rel="noreferrer"
              >
                информацией о сервисе
              </Link>{" "}
              *
            </span>
          </div>
          {touched.readmeAgreement && errors.readmeAgreement && (
            <p className="mt-1 text-sm text-red-500 ml-7">
              {errors.readmeAgreement}
            </p>
          )}

          {/* Subscription Agreement Checkbox - Added */}
          <div
            className="flex items-center cursor-pointer"
            onClick={handleSubscriptionAgreementChange}
          >
            <div
              className={`w-5 h-5 flex items-center justify-center border rounded mr-2 ${
                formData.subscriptionAgreement
                  ? "bg-main border-main"
                  : "border-gray-300"
              }`}
            >
              {formData.subscriptionAgreement && (
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
            <span className="text-sm text-gray-700">
              Я принимаю условия{" "}
              <Link
                to="/subscription-policy"
                className="text-main underline"
                target="_blank"
                rel="noreferrer"
              >
                подписки
              </Link>{" "}
              *
            </span>
          </div>
          {touched.subscriptionAgreement && errors.subscriptionAgreement && (
            <p className="mt-1 text-sm text-red-500 ml-7">
              {errors.subscriptionAgreement}
            </p>
          )}
        </div>
        <div className="w-full text-center mb-4 mt-4">
          <p className="text-sm text-gray-500">* Обязательные поля</p>
        </div>

        <div className="w-full flex flex-col items-center gap-4">
          <Button
            onClick={handleSubmit}
            text={isPending ? "Отправляем..." : "Продолжить"}
            variant="primary"
            className="mt-4 lg:max-w-[382px] lg:mt-8"
            isLamp
          />

          <p className="text-sm text-gray-600 mb-8">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="text-main hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <img
          src={jin || "/placeholder.svg"}
          className="w-[500px] h-[500px]"
          alt="Jin"
        />
      </div>
    </Layout>
  );
};

export default RegistrationPage;
