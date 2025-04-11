import { useQuery } from "@tanstack/react-query";
import { getAdminMe } from "../../api/get/get-admin.api";

export const useAdminProfile = () => {
  return useQuery({
    queryKey: ["admin", "me"],
    queryFn: getAdminMe,
  });
};
