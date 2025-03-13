import { Avatar } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { InfoIcon } from "lucide-react";
import { useInstructionPopupStore } from "./store/use-instruction-popup-store";

export const ProfileTab = () => {
  const { open } = useInstructionPopupStore();

  return (
    <div className="rounded-[16px] w-full flex flex-col bg-gray-light p-4">
      <div className="w-full flex items-center gap-4">
        <Avatar />
        <div className="w-full flex flex-col items-start">
          <div className="w-full flex items-center justify-between">
            <span className="text-main text-[20px] font-bold">Имя</span>
            <InfoIcon color="#6798de" onClick={() => open()} />
          </div>
          <span className="text-dark text-[16px] ">
            Подписка: <span className="text-secondary">18.02.2025</span>
          </span>
        </div>
      </div>
      <Button
        text="Создать промокод"
        className="mt-[19px]"
        variant="secondary"
      />
    </div>
  );
};
