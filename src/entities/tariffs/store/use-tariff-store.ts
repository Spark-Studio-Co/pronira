import { create } from "zustand";

type Tariff = {
  title: string;
  price: number;
  description?: string;
};

type TariffStore = {
  selectedTariff: Tariff | null;
  setSelectedTariff: (tariff: Tariff) => void;
};

export const useTariffStore = create<TariffStore>((set) => ({
  selectedTariff: null,
  setSelectedTariff: (tariff) => set({ selectedTariff: tariff }),
}));
