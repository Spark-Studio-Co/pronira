"use client";

import { tariffs as staticTariffs } from "@/shared/content/tariffs-block-content";
import { TariffsCard } from "@/entities/tariffs/ui/tariffs-card";
import { useNavigate } from "react-router-dom";
import { useTariffStore } from "@/entities/tariffs/store/use-tariff-store";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useGetTariffs } from "@/entities/tariffs/hooks/use-tariffs";

// Utility to safely extract numeric price
const parsePrice = (priceStr: string | number): number => {
  if (typeof priceStr === "number") return priceStr;

  const cleaned = priceStr.replace(/[^\d]/g, ""); // remove everything but digits
  const numeric = Number(cleaned);

  return isNaN(numeric) ? 0 : numeric;
};

export default function TariffBlock() {
  const navigate = useNavigate();
  const setSelectedTariff = useTariffStore((state) => state.setSelectedTariff);

  // Create a state for the tariffs that will be updated with backend data
  const [tariffs, setTariffs] = useState(staticTariffs);

  // Fetch tariffs from backend
  const { data: backendTariffs, isLoading, error } = useGetTariffs();

  // Update tariffs with backend data when it's available
  useEffect(() => {
    if (backendTariffs && backendTariffs.length > 0) {
      // Create a map of backend tariffs by index for easy lookup
      const backendTariffsMap = backendTariffs.reduce((acc, tariff, index) => {
        acc[index] = tariff;
        return acc;
      }, {} as Record<number, (typeof backendTariffs)[number]>);

      // Update only the title and price of existing tariffs
      const updatedTariffs = staticTariffs.map((tariff, index) => {
        const backendTariff = backendTariffsMap[index];

        if (backendTariff) {
          return {
            ...tariff,
            title: backendTariff.title,
            price: backendTariff.price,
          };
        }

        return tariff;
      });

      setTariffs(updatedTariffs as any);
    }
  }, [backendTariffs]);

  const handleBuyClick = (tariff: (typeof tariffs)[number]) => {
    const numericPrice = parsePrice(tariff.price);

    if (!numericPrice) {
      alert("Ошибка: Невозможно распознать цену тарифа.");
      return;
    }

    setSelectedTariff({
      title: tariff.title,
      price: numericPrice,
    });

    navigate("/payment/t-bank");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="mx-auto px-4 py-12 pb-32 w-[80vw] flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Загрузка тарифов...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mx-auto px-4 py-12 pb-32 w-[80vw]">
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>
            Не удалось загрузить данные о тарифах. Пожалуйста, попробуйте позже.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-12 pb-32 w-[80vw]">
      <div className="w-full flex justify-center mb-3">
        <h1 className="text-3xl text-center w-full sm:w-[80vw] md:w-[60vw] lg:w-[40vw] font-bold">
          Выбери для себя комфортный платеж в зависимости от своих целей
        </h1>
      </div>

      <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {tariffs.map((tariff, index) => (
          <div key={index} className="flex flex-col justify-between h-full">
            <TariffsCard
              title={tariff.title}
              items={tariff.items}
              highlightedNote={tariff.highlightedNote}
              isActive={tariff.isActive}
            />
            <div className="mt-4">
              <button
                onClick={() => handleBuyClick(tariff)}
                className={`w-full py-3 px-6 rounded-sm ${
                  tariff.isActive
                    ? "text-dark bg-gray-300"
                    : "bg-main text-white"
                }`}
              >
                Купить за{" "}
                <span
                  className={`p-2 rounded-sm ${
                    tariff.isActive ? "text-dark" : "bg-white text-main"
                  }`}
                >
                  {tariff.price}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
