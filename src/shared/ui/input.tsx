import { useState } from "react";

interface InputProps {
  isSelector?: boolean;
  options?: string[];
  onBlur?: any;
  value?: string;
  placeholder: any;
  onChange?: (value: string) => void;
  type?: any;
}

export const Input: React.FC<InputProps> = ({
  isSelector,
  options = [],
  value,
  onChange,
  placeholder,
  type,
  onBlur,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isSelector) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className="border-[1px] w-full placeholder:text-main font-medium py-[12px] px-4 border-main text-main rounded-[32px] bg-white"
        value={value}
        onBlur={onBlur}
        onChange={(e) => onChange?.(e.target.value)}
        {...props}
      />
    );
  }

  return (
    <div className="relative w-full">
      <div
        className="border-[1px] w-full placeholder:text-main font-medium py-[12px] px-4 border-main text-main rounded-[32px] bg-white cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || "Выберите значение"}</span>
        <span className="text-main">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <ul className="absolute w-full mt-2 border-[1px] border-main rounded-[12px] bg-white shadow-lg z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onChange?.(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
