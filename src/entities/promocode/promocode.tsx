import { PromocodeInput } from "@/shared/ui/promocode-input";

export const Promocode = () => {
  return (
    <div className="w-full bg-main-light border-[1px] border-main rounded-[16px] px-[28px]  flex flex-col items-center justify-center pt-4 pb-[41px]">
      <span className="text-main text-[18px] font-bold">
        Промокод если есть
      </span>
      <div className="w-full flex items-center justify-between mt-4">
        <PromocodeInput />
        <PromocodeInput />
        <PromocodeInput />
        <PromocodeInput />
        <PromocodeInput />
      </div>
    </div>
  );
};
