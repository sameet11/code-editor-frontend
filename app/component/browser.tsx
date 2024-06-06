"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { PortAtom } from "../store/port";
import { SaveFileAtom } from "../store/files";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TfiReload } from "react-icons/tfi";
import { GrShare } from "react-icons/gr";
import { IoMdLock } from "react-icons/io";
import BrowserLoader from "./browserloader";


const Browser = () => {
  const [url, setUrl] = useState("");
  const port = useRecoilValue(PortAtom);
  const [iframeKey, setIframeKey] = useState(0);
  const savefile=useRecoilValue(SaveFileAtom);
  const [reload, setreload] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    if(!port){
      return;
    }
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/signin");
          return;
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/url/sendurl?port=${port}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (
          response.status !== 200 ||
          response.data.error ||
          !response.data.data
        ) {
          toast.error("something went wrong");
        }
        setUrl(response.data.data);
      } catch (error) {
        console.error("Error fetching URL:", error);
      }
    };
   const timeoutId= setTimeout(()=>{
      fetchData();
    },2000)

    return ()=>{
      clearTimeout(timeoutId);
    }
  }, [port]);
  useEffect(() => {
    const reloadIframe = () => {
      setIframeKey((prevKey) => prevKey + 1);
    };
    reloadIframe();
  }, [savefile,reload]);
  return (
    <>
      {url ? (
        <div className="w-full h-full">
          <div className="flex gap-3 p-1 h-10 items-center text-white bg-[#27272A]">
            <button
              className="w-fit hover:bg-gray-600 cursor-pointer rounded-full p-1"
              onClick={() => setreload((prev) => !prev)}
            >
              <TfiReload />
            </button>

            <div className="bg-black w-11/12 rounded-lg p-1 flex gap-1 items-center">
              <IoMdLock className="w-1/12" />
              <input
                type="text"
                value={url}
                className="bg-black w-11/12"
                readOnly
              />
            </div>
            <a href={url} className="w-fit" target="_blank">
              <GrShare />
            </a>
          </div>
          <iframe
            key={iframeKey}
            src={url}
            title="Embedded webpage"
            className="w-full h-full bg-white"
          />
        </div>
      ) : (
        <BrowserLoader/>
      )}
    </>
  );
};

export default Browser;
