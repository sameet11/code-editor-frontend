import { FolderSchema } from "@/types";

export const isfolderEmpty = (Name: string, folderData: FolderSchema) => {
    const folderName = Name.split("/");
    return findFolderByName(folderData, folderName);
}
const findFolderByName = (folderdata: FolderSchema, folderName: string[]): boolean => {
    if (folderName.length === 1 && folderName[0] === folderdata.name) {
        return false;
    } else if (folderName.length > 1) {
        const next = folderName[1];
        if (folderdata.Folder) {
            for (const file of folderdata.Folder) {
                if (file.name === next && file.Folder) {
                    const ans = findFolderByName(file, folderName.slice(1));
                    if (!ans) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
};