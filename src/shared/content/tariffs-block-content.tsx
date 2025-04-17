import House from "@/assets/houses.jpg";
import Grounds from "@/assets/grounds.jpg";
import Apart from "@/assets/rents.jpg";
import Comers from "@/assets/flats.jpg";

export const tariffs = [
  {
    title: "Для Уверенных",
    price: "2 900 руб",
    buttonText: "Купить",
    iconSrc: House,
    iconAlt: "House",
    items: [
      { text: "Новые Дома", icon: House, iconAlt: "Дом" },
      { text: "Новые Участки", icon: Grounds, iconAlt: "Участки" },
      { text: "Новые Квартиры", icon: Apart, iconAlt: "Квартиры" },
      { text: "Новая Коммерция", icon: Comers, iconAlt: "Коммерция" },
    ],
    highlightedNote: "Доступны ВСЕ категории",
  },
  {
    title: "Для Профи",
    price: "4 300 руб",
    buttonText: "Купить",
    items: [
      { text: "Новые Дома", icon: House, iconAlt: "Дом" },
      { text: "Новые Участки", icon: Grounds, iconAlt: "Участки" },
      { text: "Новые Квартиры", icon: Apart, iconAlt: "Квартиры" },
      { text: "Новая Коммерция", icon: Comers, iconAlt: "Коммерция" },
    ],
    highlightedNote: (
      <div className="text-left">
        <p className="font-bold text-[16px]">Доступны ВСЕ категории +</p>
        <span className="font-bold text-[12px]">1. Продавец понизил цену</span>
        <br />
        <p className="text-[8px]">
          когда произойдет понижение цены на объект, ты об этом узнаешь
        </p>

        <p className="font-bold text-[12px]">
          2. Поиск новых по ключевым словам
        </p>

        <span className="text-[8px]">
          Пример: Ключевые слова «первая линия»
        </span>
        <br />
        <p className="text-[8px]">
          Проныра пришлет только те новые, где есть эта фраза
        </p>

        <p className="text-[8px] text-red-600 font-semibold">
          ВНИМАНИЕ!{" "}
          <span className="text-black font-normal">
            Поиск по ключевым — это более тонкие настройки. <br />
            Будь готов к тому, что количество сильно уменьшится
          </span>
        </p>
      </div>
    ),
    isActive: true,
  },
  {
    title: "Для БОЛЬШИХ продаж",
    price: "7 900 руб",
    buttonText: "Купить",
    items: [
      { text: "Новые Дома", icon: House, iconAlt: "Дом" },
      { text: "Новые Участки", icon: Grounds, iconAlt: "Участки" },
      { text: "Новые Квартиры", icon: Apart, iconAlt: "Квартиры" },
      { text: "Новая Коммерция", icon: Comers, iconAlt: "Коммерция" },
    ],
    isActive: true,

    highlightedNote: (
      <div className="text-center text-dark">
        <p className="font-bold text-[16px]">
          Бизнес класс <br /> Всё, как у Профи +
        </p>

        <p className="font-bold text-[14px]">Активная Кнопка</p>
        <button className="border-2 border-dark text-dark px-4 py-1 rounded text-sm">
          Поиск под запрос
        </button>

        <p className="text-[10px] text-dark/90">
          Проныра пришлет всё по ключевым словам <br />
          за последние несколько месяцев
        </p>
      </div>
    ),
  },
];
