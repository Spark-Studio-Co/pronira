import { apiClient } from "@/shared/config/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Define types
interface FreePlan {
  id: number;
  title: string;
  objectsLimit: number;
  linksLimit: number;
  description: string | null;
  durationDays: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Type for creating a free plan - now only requires duration
interface CreateFreePlanInput {
  duration: number;
}

// Fetch all free plans
export const useGetFreePlans = () => {
  return useQuery<FreePlan[]>({
    queryKey: ["free-plans"],
    queryFn: async () => {
      const { data } = await apiClient.get("/free-plan");
      return data;
    },
  });
};

// Fetch current active free plan
export const useGetCurrentFreePlan = () => {
  return useQuery<FreePlan>({
    queryKey: ["free-plans", "current"],
    queryFn: async () => {
      const { data } = await apiClient.get("/free-plan/one");
      return data;
    },
  });
};

// Get a single free plan by ID
export const useGetFreePlan = (id: number) => {
  return useQuery<FreePlan>({
    queryKey: ["free-plans", id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/free-plan/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

// Create a new free plan - now only requires duration
export const useCreateFreePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (freePlanData: CreateFreePlanInput) => {
      const { data } = await apiClient.post("/free-plan", freePlanData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["free-plans"] });
    },
  });
};

// Update an existing free plan
export const useUpdateFreePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Omit<FreePlan, "id" | "createdAt" | "updatedAt">>;
    }) => {
      const response = await apiClient.patch(`/free-plan/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["free-plans"] });
      queryClient.invalidateQueries({ queryKey: ["free-plans", "current"] });
    },
  });
};

// Delete a free plan
export const useDeleteFreePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/free-plan/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["free-plans"] });
      queryClient.invalidateQueries({ queryKey: ["free-plans", "current"] });
    },
  });
};
