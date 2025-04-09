import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/get/get-users.api";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: getUsers,
  });
};
