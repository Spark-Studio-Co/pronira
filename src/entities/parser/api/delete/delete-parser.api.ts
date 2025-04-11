import { apiClient } from "@/shared/config/apiClient";
import { IParserData } from "../post/dto/parser-data.dto";

export const deleteParserData = () => {
  return apiClient.delete(`/parser/delete`);
};
