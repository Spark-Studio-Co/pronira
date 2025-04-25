import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tariffsApi } from "../api/tariffs.api";

// Query keys
export const tariffKeys = {
  all: ["tariffs"] as const,
  lists: () => [...tariffKeys.all, "list"] as const,
  list: (filters: string) => [...tariffKeys.lists(), { filters }] as const,
  withUsers: () => [...tariffKeys.all, "with-users"] as const,
  detail: (id: number) => [...tariffKeys.all, "detail", id] as const,
};

// Get all tariffs
export const useGetTariffs = () => {
  return useQuery({
    queryKey: tariffKeys.lists(),
    queryFn: tariffsApi.getAllTariffs,
  });
};

// Get tariffs with user count
export const useGetTariffsWithUserCount = () => {
  return useQuery({
    queryKey: tariffKeys.withUsers(),
    queryFn: tariffsApi.getTariffsWithUserCount,
  });
};

// Update tariff price
export const useUpdateTariffPrice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, price }: { id: number; price: number }) =>
      tariffsApi.updateTariffPrice(id, price),
    onSuccess: () => {
      // Invalidate and refetch tariffs lists
      queryClient.invalidateQueries({ queryKey: tariffKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tariffKeys.withUsers() });
    },
  });
};
