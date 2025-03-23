import { apiClient } from "@/shared/config/apiClient";
import { IParserData } from "./dto/parser-data.dto";

export const sendParserData = (data: IParserData) => {
  return apiClient.post(`/parser/send-data`, data);
};
