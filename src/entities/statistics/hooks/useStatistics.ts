// hooks/useStatistics.ts
import { apiClient } from "@/shared/config/apiClient";
import { useQuery } from "@tanstack/react-query";

// Types for clarity (you can extend these based on your real data structure)
interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  conversionRate: number;
}

interface UserTrends {
  data: Array<{ date: string; newUsers: number; activeUsers: number }>;
}

interface UserActivityBreakdown {
  active: number;
  inactive: number;
  trial: number;
}

// Fetch Dashboard Statistics
export const useDashboardStats = (period: string) => {
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats", period],
    queryFn: () =>
      apiClient.get(`/statistics?period=${period}`).then((res) => res.data),
  });
};

// Fetch User Growth Trends
export const useUserTrends = (period: string) => {
  return useQuery<UserTrends>({
    queryKey: ["userTrends", period],
    queryFn: () =>
      apiClient
        .get(`/statistics/trends?period=${period}`)
        .then((res) => res.data),
  });
};

export const usePaymentStats = (period: string) =>
  useQuery({
    queryKey: ["paymentStats", period],
    queryFn: () =>
      apiClient
        .get(`/statistics/payments?period=${period}`)
        .then((res) => res.data),
  });

export const useTariffStats = () =>
  useQuery({
    queryKey: ["tariffStats"],
    queryFn: () => apiClient.get(`/statistics/tariffs`).then((res) => res.data),
  });

// Fetch User Activity Breakdown
export const useUserActivityBreakdown = () => {
  return useQuery<UserActivityBreakdown>({
    queryKey: ["userActivity"],
    queryFn: () =>
      apiClient.get("/statistics/activity").then((res) => res.data),
  });
};
