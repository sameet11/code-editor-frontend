import { FolderSchema } from "@/types";

function addContent(folder: FolderSchema, folderName: string, content: string): FolderSchema {
    return insertContentAtPath(folder, folderName.split('/').slice(1), content);
}

function insertContentAtPath(folder: FolderSchema, path: string[], contentToAdd: string): FolderSchema {
    if (path.length === 0) {
        return { ...folder, content: contentToAdd };
    }

    const [folderName, ...restPath] = path;
    if (!folder.Folder) {
        return folder;
    }

    const updatedFolder = folder.Folder.map((subFolder) => {
        if (subFolder.name === folderName) {
            return insertContentAtPath(subFolder, restPath, contentToAdd);
        }
        return subFolder;
    });

    return { ...folder, Folder: updatedFolder };
}

export default addContent;
