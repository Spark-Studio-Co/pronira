import { Layout } from "@/shared/ui/layout";
import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UnauthorizedPopup } from "@/features/popup/ui/popup";

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
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isAuth = localStorage.getItem("isAuth") === "true";

  const handlePayment = () => {
    if (isAuth) {
      if (selectedMethod.id === "tbank") {
        navigate(
          `/payment/t-bank?amount=${calculateTotalPrice()}&description=Подписка`
        );
      } else {
        navigate("/payment/t-bank");
      }
    } else {
      localStorage.setItem("redirectAfterLogin", "/payment/t-bank");
      setShowAuthModal(true);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handlePeriodChange = (e: any) => {
    const period = paymentPeriods.find((p) => p.id === e.target.value);
    if (period) setSelectedPeriod(period);
  };

  const handleMethodChange = (e: any) => {
    const method = paymentMethods.find((m) => m.id === e.target.value);
    if (method) setSelectedMethod(method);
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

  useEffect(() => {
    // Load the Tinkoff script if needed
    if (selectedMethod.id === "tbank") {
      const script = document.createElement("script");
      script.src = "https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [selectedMethod]);

  useEffect(() => {
    const form = document.getElementById(
      "payform-tbank"
    ) as HTMLFormElement | null;
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const { description, amount, email, phone, receipt } = form as any;

      if (receipt) {
        if (!email.value && !phone.value) {
          return alert("Поле E-mail или Phone не должно быть пустым");
        }

        form.receipt.value = JSON.stringify({
          EmailCompany: "mail@mail.com",
          Taxation: "patent",
          FfdVersion: "1.2",
          Items: [
            {
              Name: description.value || "Оплата",
              Price: Math.round(amount.value * 100),
              Quantity: 1,
              Amount: Math.round(amount.value * 100),
              PaymentMethod: "full_prepayment",
              PaymentObject: "service",
              Tax: "none",
              MeasurementUnit: "pc",
            },
          ],
        });
      }

      // @ts-ignore
      if (typeof pay === "function") {
        // @ts-ignore
        pay(form);
      } else {
        alert("Скрипт оплаты Tinkoff не загружен");
      }
    });
  }, [selectedMethod]);

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
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
        </div>
        <span className="text-black font-bold text-[24px] mt-8 text-center">
          Итого к оплате:{" "}
          <span className="text-main font-bold text-[24px]">
            {calculateTotalPrice()} руб.
          </span>
        </span>
        {selectedMethod.id === "tbank" ? (
          <Button
            onClick={() =>
              navigate(
                `/payment/t-bank?amount=${calculateTotalPrice()}&description=Подписка`
              )
            }
            variant="primary"
            className="w-full mt-8"
            text="Перейти к оплате"
          />
        ) : (
          <Button
            onClick={handlePayment}
            variant="primary"
            className="w-full mt-8"
            text="Оплатить"
          />
        )}
      </div>
      {showAuthModal && (
        <UnauthorizedPopup
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}
    </Layout>
  );
};
