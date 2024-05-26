"use client";
import { FC } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { FolderAtom } from "../store/folder";
import { ContainerAtom } from "../store/container";
import { PortAtom } from "../store/port";
interface PlaygroundProps {
  title: string;
  tagline: string;
  imgLink: string;
  setLoading: (state: boolean) => void;
}
const Playground: FC<PlaygroundProps> = ({
  title,
  tagline,
  imgLink,
  setLoading,
}) => {
  const router = useRouter();
  const setfolder = useSetRecoilState(FolderAtom);
  const setcontainer = useSetRecoilState(ContainerAtom);
  const setport = useSetRecoilState(PortAtom);
  const Folder = useRecoilValue(FolderAtom);
  const handleClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signup");
    }
    let newtitle: any;
    if (title.toLowerCase() === "node.js") {
      newtitle = title.split(".")[0].toLowerCase();
    } else {
      newtitle = title.toLowerCase();
    }
    setLoading(true);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/env/create/${newtitle}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      toast.error("Something went wrong");
      setLoading(false);
    } else if (response.data.error || !response.data.data) {
      toast.error(response.data.error);
      setLoading(false);
    } else {
      setfolder({
        name: response.data.data.path,
        Folder: response.data.data.folder,
      });
      setport(response.data.data.port);
      setcontainer(response.data.data.containerid);
      router.push(`/playground/${response.data.data.path}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="p-3 rounded-lg border m-3 hover:border-blue-600 lg:w-1/4"
    >
      <div>
        <div className="flex gap-3">
          <Image src={imgLink} height={10} width={50} alt="logo" />
          <div>
            <h1 className="font-semibold text-lg">{title}</h1>
            <p className="text-sm">{tagline}</p>
          </div>
        </div>
      </div>
    </button>
  );
};
export default Playground;
