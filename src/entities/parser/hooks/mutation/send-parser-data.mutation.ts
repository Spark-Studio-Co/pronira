import { useMutation } from "@tanstack/react-query";
import { sendParserData } from "../../api/post/send-parser-data.api";
import { IParserData } from "../../api/post/dto/parser-data.dto";

export const useSendParserData = () => {
  return useMutation({
    mutationFn: (data: IParserData) => sendParserData(data),
  });
};
