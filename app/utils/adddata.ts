import { FolderSchema } from "@/types";

const addData = (folderName: string[], folderdata: FolderSchema[], prevfolder: FolderSchema): FolderSchema => {
    return insertDataAtPath(prevfolder, folderName.slice(1), folderdata);
}

function insertDataAtPath(folder: FolderSchema, path: string[], data: FolderSchema[]): FolderSchema {
    if (path.length === 0) {
        if (folder.Folder) {
            const foldersWithContent = folder.Folder.filter(subFolder => subFolder.content);
            const foldersWithoutContent = folder.Folder.filter(subFolder => !subFolder.content);

            const updatedFolder = [...foldersWithoutContent, ...data, ...foldersWithContent];
            return { ...folder, Folder: updatedFolder };
        } else {
            return { Folder: data, ...folder };
        }
    }

    const [folderName, ...restPath] = path;
    if (!folder.Folder) {
        return folder;
    }

    const updatedFolder = folder.Folder.map((subFolder) => {
        if (subFolder.name === folderName) {
            return insertDataAtPath(subFolder, restPath, data);
        }
        return subFolder;
    });

    return { ...folder, Folder: updatedFolder };
}

export default addData;