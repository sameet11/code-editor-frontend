import { FC } from "react";

interface SubheadingProps {
  label: string;
}
const SubHeading: FC<SubheadingProps> = ({ label }) => {
  return (
    <>
      <p className="text-slate-500 pb-2">{label}</p>
    </>
  );
};
export default SubHeading;
