import { CheckCircle } from "lucide-react";

interface ISelector {
  name: string;
  isChecked: boolean;
  onClick: () => void;
}

export const Selector: React.FC<ISelector> = ({ name, isChecked, onClick }) => {
  return (
    <button
      className="w-full bg-main-light text-[24px] text-main font-bold rounded-full py-[27px]"
      onClick={onClick}
    >
      {isChecked && <CheckCircle fill="#6798DE" />}
      {name}
    </button>
  );
};
