import { atom, } from "recoil";
import { FolderSchema } from "@/types";

export const FolderAtom = atom<FolderSchema>({
    key: "Folder",
    default: { name: "", Folder: [] }
});
export const UpdateFolderAtom=atom<Boolean>({
    key:"updatefolder",
    default:false
})

