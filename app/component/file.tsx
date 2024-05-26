"use client";
import { FC } from "react";
import { CiFileOn } from "react-icons/ci";
import { FolderSchema } from "@/types";
import { FileSchema } from "@/types";
import { useSetRecoilState } from "recoil";
import { FileAtom } from "../store/files";
import { FilesAtom } from "../store/files";
interface FileProps {
  file: FolderSchema;
  currentpath: string;
}
const File: FC<FileProps> = ({ file, currentpath }) => {
  const setFile = useSetRecoilState(FileAtom);
  const setFiles = useSetRecoilState(FilesAtom);
  const handleClick = () => {
    let language;
    if (
      file.name.endsWith(".ts") ||
      file.name.endsWith(".tsx") ||
      file.name.endsWith(".js") ||
      file.name.endsWith(".jsx")
    ) {
      language = "javascript";
    } else if (file.name.endsWith(".html")) {
      language = "html";
    } else if (file.name.endsWith(".css")) {
      language = "css";
    } else if (file.name.endsWith(".json")) {
      language = "json";
    } else {
      language = "text";
    }
    const newfile: FileSchema = {
      name: file.name,
      path: currentpath,
      content: file.content || "",
      language: language,
    };
    setFile(newfile);
    setFiles(
      (prev) => new Map(prev.set(currentpath + "/" + file.name, newfile))
    );
  };
  return (
    <button className="flex gap-2 text-gray-300" onClick={handleClick}>
      <CiFileOn className="mt-1" />
      <div>{file.name}</div>
    </button>
  );
};
export default File;
