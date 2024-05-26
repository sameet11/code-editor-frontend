export type FolderSchema = {
    name: string;
    content?: string;
    Folder?: FolderSchema[];

}
export type FileSchema = {
    name: string;
    path: string;
    content: string;
    language: string;
}
export type CliSchema = {
    id: string;
    commands: string[];
}