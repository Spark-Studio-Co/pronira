// src/entities/parser/hooks/mutation/use-delete-parser.mutation.ts
import { useMutation } from "@tanstack/react-query";
import { deleteParserData } from "../../api/delete/delete-parser.api";

export const useDeleteParser = () => {
  return useMutation({
    mutationFn: deleteParserData,
  });
};
