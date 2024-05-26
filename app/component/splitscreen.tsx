"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SplitPane, { Pane } from "split-pane-react";
import FileExplorer from "@/app/component/filexplorer";
import Browser from "./browser";
import EditorCode from "./editorcode";
import { useRecoilState } from "recoil";
import { useSetRecoilState } from "recoil";
import { FolderAtom } from "@/app/store/folder";
import { ContainerAtom } from "../store/container";
import { PortAtom } from "../store/port";
import { UpdateFolderAtom } from "@/app/store/folder";
import "split-pane-react/esm/themes/default.css";
import getFolder from "../utils/getfolder";
import toast from "react-hot-toast";
import axios from "axios";

interface SplitScreenProps {
  id: string;
}

const Splitscreen: FC<SplitScreenProps> = ({ id }) => {
  const [sizes, setSizes] = useState([20, 50, 30]);
  const [folderStructure,setfolderStructure] = useRecoilState(FolderAtom);
  const [updatefolderstate,setupdatefolderstate]=useRecoilState(UpdateFolderAtom);
  const setcontainerId=useSetRecoilState(ContainerAtom);
  const setport=useSetRecoilState(PortAtom);
  const router=useRouter();
  useEffect(()=>{
      const updateAllState= async()=>{
        const token=localStorage.getItem("token");
        if(!token){
         return router.push('/signin');
        }
        const response=await getFolder(id,token);
        if(response.error||!response.data){
          toast.error(response.error);
          router.push('/dashboard');
          return;
        }
        setfolderStructure({
          name:id+'/',
          Folder:response.data,
        });
        const rootpath=id+'/'
        const containerResponse=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/env/getcontainer?rootpath=${rootpath}`,{
          headers: {
            authorization: `Bearer ${token}`,
        },
        })
        if(containerResponse.data.error||!containerResponse.data){
          toast.error(containerResponse.data.error);
          router.push('/dashboard');
          return;
        }
        setcontainerId(containerResponse.data.containerId);
        console.log(containerResponse.data.port[0]);
        setport(containerResponse.data.port[0]);
      }
      updateAllState();
  },[])
  useEffect(()=>{
    const updatefolder= async()=>{
    const token=localStorage.getItem("token");
    if(!token){
     return router.push('/signin');
    }
    const response=await getFolder(id,token);
    if(response.error||!response.data){
      toast.error(response.error);
      router.push('/dashboard');
      return;
    }
    setfolderStructure({
      name:id+'/',
      Folder:response.data,
    });
  }
  updatefolder();
  },[updatefolderstate])
  return (
    <div className="h-screen w-full">
      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        allowResize
        resizerSize={4}
        sashRender={(index, active) => (
          <div
            key={index}
            className={`bg-black w-2 ${
              active ? "opacity-100" : "opacity-0"
            } transition-opacity duration-200`}
          ></div>
        )}
      >
        <Pane>
          <div className="p-3 bg-[#1E1E1E] border-r-2 border-slate-800 h-full overflow-auto">
            <div className="mb-3 text-slate-300">Explorer</div>
            <FileExplorer fileStructure={folderStructure} currentpath={id} />
          </div>
        </Pane>
        <Pane>
          <div className="bg-[#1E1E1E] border-r-2 border-slate-800 h-full">
            <EditorCode />
          </div>
        </Pane>
        <Pane>
          <div className="flex items-center justify-center h-full bg-gray-600">
            <Browser />
          </div>
        </Pane>
      </SplitPane>
    </div>
  );
};

export default Splitscreen;
