"use client";

import { Layout } from "@/shared/ui/layout";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const paymentPeriods = [
  { id: "1", name: "1 месяц", price: 100, label: "1 мес 100 руб" },
  { id: "3", name: "3 месяца", price: 270, label: "3 мес 270 руб" },
  { id: "6", name: "6 месяцев", price: 450, label: "6 мес 450 руб" },
  { id: "12", name: "12 месяцев", price: 850, label: "12 мес 850 руб" },
];

const paymentMethods = [
  { id: "spb", name: "СПБ" },
  { id: "card", name: "ПО номеру карты" },
  { id: "tbank", name: "Т банк" },
  { id: "sber", name: "Сбер" },
];

const propertyCategories = [
  { id: "rent", name: "Аренда", price: 500 },
  { id: "apartments", name: "Квартиры", price: 500 },
  { id: "houses", name: "Дома", price: 500 },
  { id: "land", name: "Участки", price: 500 },
];

export const PaymentPage = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState(paymentPeriods[0]);
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handlePeriodChange = (e: any) => {
    const periodId = e.target.value;
    const period = paymentPeriods.find((p) => p.id === periodId);
    setSelectedPeriod(period as any);
  };

  const handleMethodChange = (e: any) => {
    const methodId = e.target.value;
    const method = paymentMethods.find((m) => m.id === methodId);
    setSelectedMethod(method as any);
  };

  const handleCategoryChange = (e: any) => {
    const categoryId = e.target.value;

    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const calculateTotalPrice = () => {
    const periodPrice = selectedPeriod.price;
    const categoriesPrice = selectedCategories.length * 500;
    return periodPrice + categoriesPrice;
  };

  return (
    <Layout isWelcome={false} isHeading heading="Отправить платеж" isCenter>
      <div className="flex flex-col lg:items-center justify-center w-full lg:max-w-[408px] mx-auto">
        <span className="font-[400] text-black lg:text-center mb-4">
          За какой период собираешься оплатить Проныру?
        </span>

        <div className="w-full mt-4 flex flex-col gap-3">
          <div className="mb-2">
            <label className="text-sm font-medium mb-1 block">
              Выбери период оплаты
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedPeriod.id}
              onChange={handlePeriodChange}
            >
              {paymentPeriods.map((period) => (
                <option key={period.id} value={period.id}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="text-sm font-medium mb-1 block">
              Выбери категории (+500 руб. каждая)
            </label>
            <div className="flex flex-col gap-2">
              {propertyCategories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category.id}
                    value={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onChange={handleCategoryChange}
                    className="mr-2 h-4 w-4"
                  />
                  <label htmlFor={category.id}>
                    {category.name} (+{category.price} руб.)
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <label className="text-sm font-medium mb-1 block">
              Выбери способ оплаты
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedMethod.id}
              onChange={handleMethodChange}
            >
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>

          <Input placeholder="Номер карты" />
          <Input placeholder="Дата" />
          <Input placeholder="Код" />
        </div>
        <span className="text-black font-bold text-[24px] mt-8 text-center">
          Итого к оплате:{" "}
          <span className="text-main font-bold text-[24px]">
            {calculateTotalPrice()} руб.
          </span>
        </span>
        <Button
          onClick={() => navigate("/payment-success")}
          variant="primary"
          className="w-full mt-8"
          text="Оплатить"
        />
      </div>
    </Layout>
  );
};
