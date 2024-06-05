import { atom } from "recoil";
import { FileSchema } from "@/types";
export const FilesAtom = atom<Map<string, FileSchema>>({
    key: "Files",
    default: new Map<string, FileSchema>()
});
export const FileAtom = atom<FileSchema>({
    key: "File",
    default: {
        name: "",
        path: "",
        content: "",
        language: ""
    }
})

export const SaveFileAtom=atom<boolean>({
    key:"saveFile",
    default:false
})