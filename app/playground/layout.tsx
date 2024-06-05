import Image from "next/image";
import { IoCaretForward } from "react-icons/io5";
import { MdOutlineFileCopy } from "react-icons/md";
const Playground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-hidden bg-[#1E1E1E]">
      <div className="w-full flex justify-between items-center p-3 text-white border-b-2 border-slate-800">
        <div>
          <Image src={"/logo.png"} height={30} width={40} alt="logo" />
        </div>
        <div className="flex justify-center bg-[#4F46E5] w-20 rounded-lg hover:bg-blue-500">
          <IoCaretForward className="h-10 w-5" />
          <button>Run</button>
        </div>
        <div>
          <p>My Playground</p>
  </div>
      </div>
      <div className="flex h-full">
        <div className=" h-full p-5 text-white hover:text-slate-400 gap-5 border-r-2 border-slate-800">
          <MdOutlineFileCopy className="w-6 h-6" />
        </div>
        {children}
      </div>
    </div>
  );
};
export default Playground;
