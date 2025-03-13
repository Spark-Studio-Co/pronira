interface PromocodeInputProps {
  value: string;
  onChange: (value: string) => void;
  inputRef: any;
}

export const PromocodeInput = ({
  onChange,
  value,
  inputRef,
}: PromocodeInputProps) => {
  return (
    <input
      ref={inputRef}
      value={value}
      maxLength={1}
      className="bg-[#6798DE]/30 w-[64px] text-[32px] text-center font-bold text-main h-[64px] border-[1px] border-main rounded-[4px]"
      onChange={(e) => onChange(e.target.value.slice(-1))}
    />
  );
};
