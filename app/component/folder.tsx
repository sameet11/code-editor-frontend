"use client";
import { FC, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaRegFolder, FaFolderOpen } from "react-icons/fa";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { CiFileOn } from "react-icons/ci";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import toast from "react-hot-toast";
import { FolderSchema } from "@/types";
import { useSetRecoilState } from "recoil";
import { FolderAtom } from "@/app/store/folder";
import addData from "../utils/adddata";

interface FolderProps {
  name: string;
  currentpath: string;
  handleClick: () => void;
  openFolder: Boolean;
}
const Folder: FC<FolderProps> = ({
  name,
  currentpath,
  handleClick,
  openFolder,
}) => {
  const router = useRouter();
  const setFolderData = useSetRecoilState(FolderAtom);
  {
    /* creating new  folder*/
  }
  const [createfolder, setcreatefolder] = useState<Boolean>(false);
  const [folderinput, setfolderinput] = useState<string>("");
  {
    /* creating new file*/
  }
  const [createfile, setcreatefile] = useState<Boolean>(false);
  const [fileinput, setfileinput] = useState<string>("");
  const handleCreateFolder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }
    const path = currentpath + "/" + folderinput;
    const rootpath=currentpath.split('/')[0]+"/";
    try{
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/folder/create?path=${path}&rootpath=${rootpath}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.error || !response.data.data || response.status !== 200) {
      setfolderinput("");
      setcreatefolder(false);
      return toast.error("folder not created");
    }
    const data: FolderSchema[] = [{ name: folderinput }];
    const pathname = currentpath.split("/");
    setFolderData((prevData) => {
      if (prevData.Folder) {
        const ans = addData(pathname, data, prevData);
        return ans;
      }
    });
    setfolderinput("");
    setcreatefolder(false);
  }
  catch(error){
    toast.error("Something went wrong");
    router.push('/');
  }
  };
  const handleCreateFile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }
    const path = currentpath + "/" + fileinput;
    const rootpath=currentpath.split('/')[0]+"/";
    try{
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/folder/createfile?path=${path}&rootpath=${rootpath}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.error || !response.data.data || response.status !== 200) {
      setfileinput("");
      setcreatefile(false);
      return toast.error("file not created");
    }
    const data: FolderSchema[] = [{ name: fileinput, content: " " }];
    const pathname = currentpath.split("/");
    setFolderData((prevData) => {
      if (prevData) {
        const ans = addData(pathname, data, prevData);
        return ans;
      }
    });
    setfileinput("");
    setcreatefile(false);
  }
  catch(error){
    toast.error("Something went wrong");
    router.push('/');
  }
  };
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <button
            className={`flex gap-2 font-bold cursor-pointer hover:text-slate-300 w-full pl-2 hover:bg-[#37373D] `}
            onClick={handleClick}
          >
            {openFolder ? (
              <FaFolderOpen className="mt-1" />
            ) : (
              <FaRegFolder className="mt-1" />
            )}
            {openFolder ? (
              <IoMdArrowDropdown className="mt-1" />
            ) : (
              <IoMdArrowDropright className="mt-1" />
            )}
            {name.endsWith("react/") || name.endsWith("node/") ? (
              <>app</>
            ) : (
              <>{name}</>
            )}
          </button>
        </ContextMenuTrigger>
        <ContextMenuContent className="border-1 rounded-md bg-[#37373D] text-white font-semibold">
          <ContextMenuItem
            onClick={() => {
              setcreatefolder(true);
            }}
          >
            + Folder
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              setcreatefile(true);
            }}
          >
            + File
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {createfolder && (
        <div className="flex gap-2 font-bold w-full pl-2">
          <IoMdArrowDropright className="mt-1 w-1/6" />
          <input
            type="text"
            className="w-5/6 bg-[#37373D] font-normal text-base"
            value={folderinput}
            onChange={(e) => {
              setfolderinput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateFolder();
              }
            }}
          />
        </div>
      )}
      {createfile && (
        <div className="flex gap-2 font-bold w-full pl-2">
          <CiFileOn className="mt-1 w-1/6" />
          <input
            type="text"
            className="w-5/6 bg-[#37373D]"
            value={fileinput}
            onChange={(e) => {
              setfileinput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateFile();
              }
            }}
          />
        </div>
      )}
    </>
  );
};
export default Folder;
