import Link from "next/link";
import { FC } from "react";

interface WarningProps {
  label: string;
  to: string;
  text: string;
}

const Warning: FC<WarningProps> = ({ label, to, text }) => {
  return (
    <div className="flex justify-center gap-1 mx-auto pt-3">
      <p>{label}</p>
      <Link className="underline" href={to}>
        {text}
      </Link>
    </div>
  );
};
export default Warning;
