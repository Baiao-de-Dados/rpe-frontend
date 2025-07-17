export interface FileItem {
    file(file: File): Promise<string>;
    name: string;
    size: number;
    fileData: File;
}