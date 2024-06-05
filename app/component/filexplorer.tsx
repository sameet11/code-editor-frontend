"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { FolderAtom } from "@/app/store/folder";
import addData from "../utils/adddata";
import { FolderSchema } from "@/types";
import { isfolderEmpty } from "../utils/isemptyfolder";
import getFolder from "../utils/getfolder";
import File from "./file";
import Folder from "./folder";
interface FileExplorerSchema {
  fileStructure: FolderSchema;
  currentpath: string;
}

const FileExplorer: FC<FileExplorerSchema> = ({
  fileStructure,
  currentpath,
}) => {
  const [openFolder, setOpenFolder] = useState<boolean>(false);
  const [folderData, setFolderData] = useRecoilState(FolderAtom);

  const router = useRouter();
  const handleClick = async () => {
    if (currentpath.endsWith("react") || currentpath.endsWith("node")) {
      return setOpenFolder((prevstate) => !prevstate);
    }

    const check = isfolderEmpty(currentpath, folderData);
    if (check) {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signin");
        return;
      }
      const response = await getFolder(currentpath, token);
      if (response.error || !response.data) {
        return toast.error("something went wrong");
      }
      if (response.data.length === 0) {
        return setOpenFolder((prevstate) => !prevstate);
      }
      const pathname = currentpath.split("/");
      setFolderData((prevData) => {
        if (prevData.Folder) {
          const ans = addData(pathname, response.data, prevData);
          return ans;
        }
      });
    }
    setOpenFolder((prevstate) => !prevstate);
  };

  return (
    <div className="text-white">
      <Folder
        name={fileStructure.name}
        currentpath={currentpath}
        handleClick={handleClick}
        openFolder={openFolder}
      />
      <div>
        {openFolder &&
          fileStructure.Folder?.map((file, index) => {
            return (
              <div
                className="ml-2 border-l-2 pl-2 border-slate-700"
                key={index}
              >
                {file.content ? (
                  <File file={file} currentpath={currentpath} />
                ) : (
                  <FileExplorer
                    fileStructure={file}
                    currentpath={currentpath + "/" + file.name}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FileExplorer;
