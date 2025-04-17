import { tariffs } from "@/shared/content/tariffs-block-content";
import { TariffsCard } from "@/shared/ui/tariffs-card";

import TariffsImage from "@/assets/treasure.png";

export default function TariffBlock() {
  return (
    <div className="container mx-auto px-4 py-12 pb-16">
      <div className="flex flex-col items-start text-left">
        <div className="flex items-center gap-6 ">
          <div className="relative w-32 h-32 shrink-0">
            <img src={TariffsImage} alt="Businessman character" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold mb-2">
              Давай меняться. <br /> Ты мне деньги, <br /> я тебе "ключ от своих
              сокровищниц"
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mb-3">
        <p className="text-lg text-center w-sm">
          Выбери для себя комфортный платеж в зависимости от своих целей
        </p>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start w-full lg:w-[75%]">
          {tariffs.map((tariff, index) => (
            <div key={index} className="flex flex-col items-center">
              <TariffsCard
                title={tariff.title}
                items={tariff.items}
                highlightedNote={tariff.highlightedNote}
                isActive={tariff.isActive}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:w-[75%]">
          {tariffs.map((tariff, index) => (
            <button
              key={index}
              className={`w-full py-3 px-6 rounded-sm ${
                tariff.isActive
                  ? "bg-gray-200 text-dark" // Стиль для активной кнопки
                  : "bg-main text-white" // Стиль для неактивной
              }`}
            >
              Купить за{" "}
              <span
                className={`p-2 rounded-sm ${
                  tariff.isActive
                    ? "bg-gray-300 text-dark" // Стиль для активного спана
                    : "bg-white text-main" // Стиль для неактивного
                }`}
              >
                {tariff.price}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
