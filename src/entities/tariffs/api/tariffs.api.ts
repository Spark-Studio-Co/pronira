import { apiClient } from "@/shared/config/apiClient";

export interface Tariff {
  id: number;
  title: string;
  price: number;
}

export interface TariffWithUserCount extends Tariff {
  usersCount: number;
}

export interface UpdateTariffDto {
  title?: string;
  price?: number;
}

export const tariffsApi = {
  // Get all tariffs (only title and price)
  getAllTariffs: async (): Promise<Tariff[]> => {
    const response = await apiClient.get("/tariffs");
    return response.data;
  },

  getTariffsWithUserCount: async (): Promise<TariffWithUserCount[]> => {
    const response = await apiClient.get("/tariffs/with-users");
    return response.data;
  },

  // Update tariff price
  updateTariffPrice: async (id: number, price: number): Promise<Tariff> => {
    const response = await apiClient.patch(`/tariffs/${id}`, { price });
    return response.data;
  },

  updateTariff: async (id: number, data: UpdateTariffDto): Promise<Tariff> => {
    const response = await apiClient.patch(`/tariffs/${id}`, data);
    return response.data;
  },

  createTariff: async (data: {
    title: string;
    price: number;
  }): Promise<Tariff> => {
    const response = await apiClient.post("/tariffs", data);
    return response.data;
  },
};
