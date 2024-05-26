import { FC } from "react";

interface HeadingProps {
  label: string;
}
const Heading: FC<HeadingProps> = ({ label }) => {
  return (
    <>
      <h1 className="text-3xl font-bold pb-1">{label}</h1>
    </>
  );
};
export default Heading;
