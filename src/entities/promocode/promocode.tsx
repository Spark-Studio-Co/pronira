import { useEffect, useRef, useState } from "react";
import { PromocodeInput } from "@/shared/ui/promocode-input";

export const Promocode = () => {
  const [code, setCode] = useState(Array(5).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (inputsRef.current[0]) inputsRef.current[0].focus();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]?$/.test(value)) {
      setCode((prev) => {
        const newCode = [...prev];
        newCode[index] = value;
        return newCode;
      });

      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      } else if (!value && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="w-full lg:max-w-[408px] bg-main-light border-[1px] border-gray-300 p-4 rounded-[8px]">
      <div className="w-full flex items-center justify-between">
        {code.map((_, index) => (
          <PromocodeInput
            key={index}
            inputRef={(el: any) => (inputsRef.current[index] = el!)}
            value={code[index]}
            onChange={(value: string) => handleInputChange(index, value)}
          />
        ))}
      </div>
    </div>
  );
};
