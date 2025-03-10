import { InputHTMLAttributes } from "react";

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <input
      className="border-[1px] w-full placeholder:text-main font-medium  py-[12px] px-4 border-main text-main rounded-[32px] bg-white"
      {...props}
    />
  );
};
