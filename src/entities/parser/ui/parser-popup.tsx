"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useParserPopupStore } from "../store/use-parser-popup.store";

export const ParserSuccessPopup = () => {
  const { isOpen, close } = useParserPopupStore();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-md p-6 bg-white rounded-lg">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4"></div>
          <div className="bg-blue-50 text-center p-3 rounded-md text-blue-800 font-medium">
            Всё ОК, полетел собирать объекты, удачной охоты 🎯
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={close}
              className="px-4 py-2 bg-main text-white rounded-full  m-auto transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
