"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  Check,
  CreditCard,
  Mail,
  Phone,
  User,
  FileText,
  Coins,
  Tag,
  Loader,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTariffStore } from "@/entities/tariffs/store/use-tariff-store"; // 👈 Zustand store
import { useGetPromocodes } from "@/entities/promocode/hooks/queries/use-get-promocodes.query";
import { useApplyPromocode } from "@/entities/promocode/hooks/mutations/use-apply-promocode.mutation";

declare global {
  interface Window {
    pay: any;
  }
}

export default function TBankPaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const { selectedTariff } = useTariffStore(); // 👈 Get selected tariff

  const defaultAmount =
    selectedTariff?.price?.toString() || query.get("amount") || "100";
  const defaultDescription =
    selectedTariff?.title || query.get("description") || "Оплата подписки";
  const queryPromocode = query.get("promocode") || "";

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [amount, setAmount] = useState(defaultAmount);
  const [originalAmount, setOriginalAmount] = useState(defaultAmount);

  // Promocode state
  const [promocode, setPromocode] = useState(queryPromocode);
  const [appliedPromocode, setAppliedPromocode] = useState<any | null>(null);
  const [promocodeError, setPromocodeError] = useState("");

  // Fetch promocodes from backend
  const { data: promocodes, isLoading: isLoadingPromocodes } =
    useGetPromocodes();

  // Apply promocode mutation
  const applyPromocodeMutation = useApplyPromocode();

  useEffect(() => {
    // Check if there's a promocode in the URL and apply it
    if (queryPromocode && promocodes) {
      handleApplyPromocode(queryPromocode);
    }
  }, [queryPromocode, promocodes]);

  useEffect(() => {
    // Redirect if no tariff is selected
    if (!selectedTariff && !query.get("amount")) {
      navigate("/tariffs"); // or "/" if that's your default
    }

    // Load Tinkoff script
    const script = document.createElement("script");
    script.src = "https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [selectedTariff, navigate, query]);

  // Update the handleApplyPromocode function to show the discount amount
  const handleApplyPromocode = async (code: string = promocode) => {
    if (!code.trim()) {
      setPromocodeError("Введите промокод");
      return;
    }

    setPromocodeError("");

    try {
      const result = await applyPromocodeMutation.mutateAsync({
        code: code.trim(),
        amount: Number(originalAmount),
      });

      setAppliedPromocode(result.promocode);
      setAmount(result.discountedAmount.toFixed(2));
    } catch (error: any) {
      setPromocodeError(
        error.response?.data?.message || "Недействительный промокод"
      );
      setAppliedPromocode(null);
      setAmount(originalAmount); // Reset to original amount
    }
  };

  const handleRemovePromocode = () => {
    setAppliedPromocode(null);
    setPromocode("");
    setPromocodeError("");
    setAmount(originalAmount); // Reset to original amount
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formElements = form.elements as HTMLFormControlsCollection;

    const description = (
      formElements.namedItem("description") as HTMLInputElement
    ).value;
    const amount = (formElements.namedItem("amount") as HTMLInputElement).value;
    const email = (formElements.namedItem("email") as HTMLInputElement).value;
    const phone = (formElements.namedItem("phone") as HTMLInputElement).value;
    const receiptInput = formElements.namedItem("receipt") as HTMLInputElement;

    if (!email && !phone) {
      alert("Поле E-mail или Phone не должно быть пустым");
      return;
    }

    if (receiptInput) {
      receiptInput.value = JSON.stringify({
        EmailCompany: "mail@mail.com",
        Taxation: "patent",
        FfdVersion: "1.2",
        Items: [
          {
            Name: description || "Оплата",
            Price: Math.round(Number.parseFloat(amount) * 100),
            Quantity: 1,
            Amount: Math.round(Number.parseFloat(amount) * 100),
            PaymentMethod: "full_prepayment",
            PaymentObject: "service",
            Tax: "none",
            MeasurementUnit: "pc",
          },
        ],
      });
    }

    if (typeof window.pay === "function") {
      window.pay(form);
    } else {
      alert("Скрипт оплаты Tinkoff не загружен");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#e1eaf8] to-white dark:from-[#1e1e1e] dark:to-[#2a2a2a]">
      <div className="w-full max-w-md p-6 bg-white dark:bg-[#222] rounded-lg shadow-lg border border-[#6798de]/20">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#6798de] mb-2">Оплата</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Безопасная оплата через Тинькофф Банк
          </p>
          {selectedTariff && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              Вы выбрали тариф: <strong>{selectedTariff.title}</strong>
              {appliedPromocode ? (
                <>
                  <span className="block mt-1">
                    <span className="line-through">
                      {selectedTariff.price} ₽
                    </span>{" "}
                    <strong className="text-green-600">{amount} ₽</strong>{" "}
                    <span className="text-xs text-green-600">
                      (-{appliedPromocode.discount}%)
                    </span>
                  </span>
                </>
              ) : (
                <span>
                  {" "}
                  — <strong>{selectedTariff.price} ₽</strong>
                </span>
              )}
            </p>
          )}
        </div>

        <form id="payform-tbank" onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="terminalkey" value="1744092581993DEMO" />
          <input type="hidden" name="frame" value="false" />
          <input type="hidden" name="language" value="ru" />
          <input type="hidden" name="receipt" value="" />

          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <Coins className="h-4 w-4 text-[#6798de]" />
              Сумма
            </label>
            <input
              id="amount"
              name="amount"
              type="text"
              value={amount}
              readOnly
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-gray-100 dark:bg-[#333] dark:text-white transition-colors"
            />
          </div>

          {/* Promocode section */}
          <div className="space-y-2">
            <label
              htmlFor="promocode"
              className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <Tag className="h-4 w-4 text-[#6798de]" />
              Промокод
            </label>
            <div className="flex gap-2">
              <input
                id="promocode"
                type="text"
                value={promocode}
                onChange={(e) => setPromocode(e.target.value)}
                disabled={!!appliedPromocode || isLoadingPromocodes}
                placeholder={
                  isLoadingPromocodes
                    ? "Загрузка промокодов..."
                    : "Введите промокод"
                }
                className={`flex-1 px-3 py-2 border rounded-md ${
                  promocodeError ? "border-red-500" : "border-gray-300"
                } ${
                  appliedPromocode
                    ? "bg-gray-100 dark:bg-[#444]"
                    : "bg-white dark:bg-[#333]"
                } ${isLoadingPromocodes ? "opacity-70" : ""} dark:text-white`}
              />
              {appliedPromocode ? (
                <button
                  type="button"
                  onClick={handleRemovePromocode}
                  className="px-3 py-2 bg-gray-200 dark:bg-[#444] text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-[#555] transition-colors"
                >
                  Отменить
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleApplyPromocode()}
                  disabled={
                    applyPromocodeMutation.isPending ||
                    !promocode.trim() ||
                    isLoadingPromocodes
                  }
                  className="px-3 py-2 bg-[#6798de] text-white rounded-md hover:bg-[#5687cd] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {applyPromocodeMutation.isPending ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    "Применить"
                  )}
                </button>
              )}
            </div>

            {promocodeError && (
              <div className="flex items-center text-red-500 text-sm mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {promocodeError}
              </div>
            )}

            {/* Update the applied promocode display to show the correct discount percentage */}
            {appliedPromocode && (
              <div className="flex items-center text-green-600 text-sm mt-1">
                <Check className="h-4 w-4 mr-1" />
                Промокод применен: скидка {appliedPromocode.discount}%
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <FileText className="h-4 w-4 text-[#6798de]" />
              Описание
            </label>
            <input
              id="description"
              name="description"
              type="text"
              defaultValue={defaultDescription}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white dark:bg-[#333] dark:text-white transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <User className="h-4 w-4 text-[#6798de]" />
              ФИО плательщика
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Иванов Иван Иванович"
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-[#333] dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <Mail className="h-4 w-4 text-[#6798de]" />
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@mail.com"
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-[#333] dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <Phone className="h-4 w-4 text-[#6798de]" />
              Телефон
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+7 (999) 123-45-67"
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-[#333] dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-3 bg-[#FBC520] hover:bg-[#FAB619] text-[#3C2C0B] font-bold text-lg rounded-md transition-all"
          >
            <CreditCard className="mr-2 h-5 w-5" />
            Оплатить {amount} ₽
          </button>

          {!isScriptLoaded && (
            <p className="text-sm text-amber-600 dark:text-amber-400 text-center mt-2">
              Загрузка платежной системы...
            </p>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            Нажимая кнопку «Оплатить», вы соглашаетесь с условиями оплаты и
            политикой конфиденциальности
          </p>
        </form>
      </div>
    </div>
  );
}
