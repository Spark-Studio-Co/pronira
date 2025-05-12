import { apiClient, parserApiClient } from "@/shared/config/apiClient";
import { useMutation } from "@tanstack/react-query";

interface UpdateLinksPayload {
  userId: string;
  links: {
    type: string;
    url: string;
  }[];
}

const updateLinks = async (payload: UpdateLinksPayload) => {
  const { data } = await parserApiClient.post("/parser/update-links", payload);
  return data;
};

export const useUpdateLinks = () => {
  return useMutation({
    mutationFn: updateLinks,
  });
};
