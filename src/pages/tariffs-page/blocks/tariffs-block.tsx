import { tariffs } from "@/shared/content/tariffs-block-content";
import { TariffsCard } from "@/entities/tariffs/ui/tariffs-card";
import { useNavigate } from "react-router-dom";
import { useTariffStore } from "@/entities/tariffs/store/use-tariff-store";

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
