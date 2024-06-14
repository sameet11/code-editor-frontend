import Editor from "@monaco-editor/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSetRecoilState, useRecoilState } from "recoil";
import { FileAtom } from "../store/files";
import { FolderAtom } from "../store/folder";
import { SaveFileAtom } from "../store/files";
import EditorHeader from "./editorheader";
import addContent from "../utils/addcontent";
import { useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import  {  useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import io, { Socket } from "socket.io-client";
import { useRecoilValue } from "recoil";
import { ContainerAtom } from "../store/container";
import { UpdateFolderAtom } from "../store/folder";
const OPTIONS_TERM = {
  useStyle: true,
  screenKeys: true,
  cursorBlink: true,
};
const EditorCode = () => {
  const [savefile, setsavefile] = useRecoilState(SaveFileAtom);
  const [Filedata, setFiledata] = useRecoilState(FileAtom);
  const setFolder = useSetRecoilState(FolderAtom);
  const router=useRouter();
  const terminalRef = useRef<HTMLDivElement>(null);
  const containerId = useRecoilValue(ContainerAtom);
  const [updateFolder, setUpdateFolder] = useRecoilState(UpdateFolderAtom);
  let socket: Socket | null = null;
  let term: Terminal | null = null;
  let fitAddon: FitAddon | null = null;
  useEffect(() => {
    const updatefile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signin");
      }
      setsavefile(false);
      const pathname = Filedata.path + "/" + Filedata.name;
      const rootpath=pathname.split('/')[0]+'/';
      try{
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/folder/updatefile?path=${pathname}&rootpath=${rootpath}`,
        {
          content: Filedata.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (
        response.data.error ||
        !response.data.data ||
        response.status !== 200
      ) {
        setsavefile(true);
        toast.error("file not saved");
        return;
      }
      setFolder((prevdata) => {
        return addContent(prevdata, pathname, Filedata.content);
      });
    }
    catch(error){
      toast.error("Somethin went wrong");
      router.push('/');
    };

    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        updatefile();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [Filedata]);
  useEffect(() => {
    if (!containerId) {
      return;
    }

    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:3001", {
      query: {
        containerId: containerId,
      },
    });

    if (terminalRef.current) {
      term = new Terminal(OPTIONS_TERM);
      fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      term.onKey((e) => {
        const command = e.key;
        socket?.emit("command", JSON.stringify({ command }));
        if (e.domEvent.key === "Enter") {
          setUpdateFolder((prev) => !prev);
        }
      });
      term.onResize(()=>{
        fitAddon?.fit()
      })
      socket.on("commandoutput", (output: string) => {
        if (term) {
          term.write(output);
          fitAddon?.fit()
        }
      });
      socket.on("commandstatus", (output: string) => {
        if (output === "closed") {
          toast.error("Session expired");
          router.push("/dashboard");
        }
      });
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
      if (term) {
        term.dispose();
      }
    };
  }, [containerId]);

  const handlecontentChange = async (content: string | undefined) => {
    if (typeof content !== "string") {
      return;
    }
    setFiledata((prev) => ({ ...prev, content: content }));
    setsavefile(true);
  };

  return (
    <>
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={70}>
          <EditorHeader savefile={savefile} setsavefile={setsavefile} />
          <Editor
            height="90vh"
            language={Filedata.language}
            defaultValue="/* write code here*/"
            theme="vs-dark"
            value={Filedata.content}
            onChange={(value) => handlecontentChange(value)}
          />
        </ResizablePanel>
        <ResizableHandle/>
        <ResizablePanel defaultSize={30} onResize={()=>{
          fitAddon?.fit()
        }}>
        <div ref={terminalRef} style={{ width: '100%', height: '100%' }}></div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default EditorCode;
