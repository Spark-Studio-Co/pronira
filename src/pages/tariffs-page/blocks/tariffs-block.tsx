import { tariffs } from "@/shared/content/tariffs-block-content";
import { TariffsCard } from "@/shared/ui/tariffs-card";
import { useNavigate } from "react-router-dom";

// import TariffsImage from "@/assets/treasure.png";

export default function TariffBlock() {
  const navigation = useNavigate();

  return (
    <div className="mx-auto px-4 py-12 pb-16 w-[80vw]">
      <div className="w-full flex justify-center mb-3">
        <h1 className="text-3xl text-center w-full sm:w-[80vw] md:w-[60vw] lg:w-[40vw] font-bold">
          Выбери для себя комфортный платеж в зависимости от своих целей
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
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
                onClick={() => navigation("/payment")}
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
