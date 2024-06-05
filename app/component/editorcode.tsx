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
import { useState, useEffect } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import TerminalComponent from "./terminal";

const EditorCode = () => {
  const [sizes, setSizes] = useState([69, 31]);
  const [savefile, setsavefile] = useRecoilState(SaveFileAtom);
  const [Filedata, setFiledata] = useRecoilState(FileAtom);
  const setFolder = useSetRecoilState(FolderAtom);
  const router=useRouter();
  useEffect(() => {
    const updatefile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signin");
      }
      setsavefile(false);
      const pathname = Filedata.path + "/" + Filedata.name;
      const rootpath=pathname.split('/')[0]+'/';
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
    };

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

  const handlecontentChange = async (content: string | undefined) => {
    if (typeof content !== "string") {
      return;
    }
    setFiledata((prev) => ({ ...prev, content: content }));
    setsavefile(true);
  };

  return (
    <>
      <SplitPane
        split="horizontal"
        sizes={sizes}
        onChange={setSizes}
        allowResize
        resizerSize={4}
        sashRender={(index, active) => (
          <div
            key={index}
            className={`bg-white text-white w-2 ${
              active ? "opacity-100" : "opacity-0"
            } transition-opacity duration-200`}
          ></div>
        )}
      >
        <div>
          <EditorHeader savefile={savefile} setsavefile={setsavefile} />
          <Editor
            height="90vh"
            language={Filedata.language}
            defaultValue="/* write code here*/"
            theme="vs-dark"
            value={Filedata.content}
            onChange={(value) => handlecontentChange(value)}
          />
        </div>
        <Pane>
          <TerminalComponent/>
        </Pane>
      </SplitPane>
    </>
  );
};

export default EditorCode;
