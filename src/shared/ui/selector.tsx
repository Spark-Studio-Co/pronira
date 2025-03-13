import { CheckCircle } from "lucide-react";

interface ISelector {
  name: string;
  isChecked: boolean;
  onClick: () => void;
}

export const Selector: React.FC<ISelector> = ({ name, isChecked, onClick }) => {
  return (
    <button
      className="w-full bg-main-light gap-2 text-[24px] text-main font-bold rounded-full py-[27px] lg:w-max-[408px] lg:max-h-[80px] flex items-center justify-center"
      onClick={onClick}
    >
      {isChecked && <CheckCircle fill="white" />}
      {name}
    </button>
  );
};
