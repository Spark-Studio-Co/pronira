"use client";

import React, { useEffect, useState } from "react";
import { CreditCard, Mail, Phone, User, FileText, Coins } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTariffStore } from "@/entities/tariffs/store/use-tariff-store"; // 👈 Zustand store

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

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Redirect if no tariff is selected
    if (!selectedTariff) {
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
  }, [selectedTariff, navigate]);

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

  useEffect(() => {
    console.log(selectedTariff);
  }, []);

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
              Вы выбрали тариф: <strong>{selectedTariff.title}</strong> —{" "}
              <strong>{selectedTariff.price} ₽</strong>
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
              disabled
              name="amount"
              type="text"
              defaultValue={defaultAmount}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white dark:bg-[#333] dark:text-white transition-colors"
            />
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
            Оплатить
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
