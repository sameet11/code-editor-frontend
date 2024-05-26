import { FC } from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}
const Button: FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <div className="pt-2 w-full">
      <button
        className="bg-black text-white w-full text-center rounded-lg h-10 hover:bg-slate-800 transition ease-in-out duration-300"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
