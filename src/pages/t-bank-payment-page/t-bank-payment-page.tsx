"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { CreditCard, Mail, Phone, User, FileText, Coins } from "lucide-react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    pay: any;
  }
}

export default function TBankPaymentPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const defaultAmount = query.get("amount") || "100";
  const defaultDescription = query.get("description") || "Оплата подписки";

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
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
  }, []);

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
        </div>

        <form id="payform-tbank" onSubmit={handleSubmit} className="space-y-4">
          <input
            type="hidden"
            name="terminalkey"
            value="1744092581993DEMO
"
          />
          <input type="hidden" name="frame" value="false" />
          <input type="hidden" name="language" value="ru" />
          <input type="hidden" name="receipt" value="" />

          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <Coins className="h-4 w-4 text-[#6798de]" />
              Сумма
            </label>
            <input
              id="amount"
              name="amount"
              type="text"
              placeholder="Сумма платежа"
              defaultValue={defaultAmount}
              required
              className="w-full px-3 py-2 border border-[#DFE3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6798de]/20 focus:border-[#6798de] bg-white dark:bg-[#333] dark:border-gray-700 dark:text-white transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <FileText className="h-4 w-4 text-[#6798de]" />
              Описание
            </label>
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Описание платежа"
              defaultValue={defaultDescription}
              className="w-full px-3 py-2 border border-[#DFE3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6798de]/20 focus:border-[#6798de] bg-white dark:bg-[#333] dark:border-gray-700 dark:text-white transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <User className="h-4 w-4 text-[#6798de]" />
              ФИО плательщика
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Иванов Иван Иванович"
              className="w-full px-3 py-2 border border-[#DFE3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6798de]/20 focus:border-[#6798de] bg-white dark:bg-[#333] dark:border-gray-700 dark:text-white transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <Mail className="h-4 w-4 text-[#6798de]" />
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@mail.com"
              className="w-full px-3 py-2 border border-[#DFE3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6798de]/20 focus:border-[#6798de] bg-white dark:bg-[#333] dark:border-gray-700 dark:text-white transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <Phone className="h-4 w-4 text-[#6798de]" />
              Телефон
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+7 (999) 123-45-67"
              className="w-full px-3 py-2 border border-[#DFE3F3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6798de]/20 focus:border-[#6798de] bg-white dark:bg-[#333] dark:border-gray-700 dark:text-white transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-3 bg-[#FBC520] hover:bg-[#FAB619] text-[#3C2C0B] font-bold text-lg rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#FBC520]/50"
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
