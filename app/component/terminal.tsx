import React, { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import io from "socket.io-client";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { ContainerAtom } from "../store/container";
import { UpdateFolderAtom } from "../store/folder";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const OPTIONS_TERM = {
  useStyle: true,
  screenKeys: true,
  cursorBlink: true,
};

const TerminalComponent = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const containerId = useRecoilValue(ContainerAtom);
  const [updatefolder,setupdatefolder]=useRecoilState(UpdateFolderAtom);
  const router=useRouter();
  useEffect(() => {
    if(!containerId){
      return ;
    }
    let socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:3001", {
      query: {
        containerId: containerId,
      },
    });

    let term: Terminal;

    if (terminalRef.current) {
      term = new Terminal(OPTIONS_TERM);
      term.open(terminalRef.current);

      term.onKey((e) => {
        const command=e.key;
        socket.emit("command", JSON.stringify({command}));
      });

      socket.on("commandoutput", (output: string) => {
        if (term) {
          term.write(output);
            setupdatefolder((prev)=>{
             return !prev
            });
        }
      });
      socket.on("commandstatus",(output:string)=>{
        if(output==="closed"){
          toast.error("session expired");
          router.push('/dashboard');
        }
      })
    }

    return () => {
      if(socket){
      socket.disconnect();
      }
      if (term) {
        term.dispose();
      }
    };
  }, [containerId]);

  return <div ref={terminalRef}></div>;
};

export default TerminalComponent;

