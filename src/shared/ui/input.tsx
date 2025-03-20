import { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isSelector?: boolean;
  options?: string[]; // Dropdown options
}

export const Input: React.FC<InputProps> = ({
  isSelector,
  options = [],
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");

  if (!isSelector) {
    return (
      <input
        className="border-[1px] w-full placeholder:text-main font-medium py-[12px] px-4 border-main text-main rounded-[32px] bg-white"
        {...props}
      />
    );
  }

  return (
    <div className="relative w-full">
      {/* Selected Option (Dropdown Trigger) */}
      <div
        className="border-[1px] w-full placeholder:text-main font-medium py-[12px] px-4 border-main text-main rounded-[32px] bg-white cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected || "Выберите значение"}</span>
        <span className="text-main">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute w-full mt-2 border-[1px] border-main rounded-[12px] bg-white shadow-lg z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelected(option);
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
