import { FC } from "react";
import { useRecoilState } from "recoil";
import { FilesAtom } from "../store/files";
import { FileAtom } from "../store/files";
import { CiFileOn } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaCircle } from "react-icons/fa";
import { FileSchema } from "@/types";

interface EditorHeaderProps {
  savefile: boolean;
  setsavefile: (savefile: boolean) => void;
}

const EditorHeader: FC<EditorHeaderProps> = ({ savefile, setsavefile }) => {
  const [Files, setFiles] = useRecoilState(FilesAtom);
  const [file, setfile] = useRecoilState(FileAtom);
  const handleRemove = (key: string) => {
    setFiles((prev) => {
      const newmap = new Map(prev);
      newmap.delete(key);
      return newmap;
    });
    const keys = Array.from(Files.keys());
    const lastKey = keys[keys.length - 2];
    const lastValue = Files.get(lastKey);
    if (lastValue) {
      setfile(lastValue);
    } else {
      setfile({ name: "", path: "", content: "", language: "" });
    }
  };
  const handleClick = (ele: FileSchema) => {
    setfile(ele);
  };
  return (
    <div className="h-15 w-full overflow-hidden flex shadow-lg">
      {Array.from(Files.entries()).map(([key, ele]) => {
        return (
          <div
            className={`h-15 flex text-white gap-2 border border-slate-800 p-1 items-center ${
              file.path + "/" + file.name === key ? `bg-slate-800` : ``
            }`}
            key={key}
          >
            <button
              className="flex gap-2 items-center"
              onClick={() => {
                handleClick(ele);
              }}
            >
              <CiFileOn />
              <h2>{ele.name}</h2>
            </button>
            {savefile && file.path + "/" + file.name === key ? (
              <FaCircle
                className=" h-3 w-3"
                onClick={() => {
                  setsavefile(false);
                }}
              />
            ) : (
              <RxCross2 onClick={() => handleRemove(key)} />
            )}
          </div>
        );
      })}
    </div>
  );
};
export default EditorHeader;
