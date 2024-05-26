import { ChangeEvent, FC } from "react";

interface InputProps {
  label: string;
  placeholder: string;
  head: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
const Input: FC<InputProps> = ({
  label,
  placeholder,
  head,
  onChange,
  value,
}) => {
  return (
    <div className="pb-1">
      <h2 className="text-md font-bold pb-1 text-left">{head}</h2>
      <input
        type={label}
        placeholder={placeholder}
        className="border rounded-lg p-1 w-full"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
export default Input;
