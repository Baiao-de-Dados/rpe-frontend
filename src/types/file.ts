export interface FileItem {
    file(file: any): Promise<string>;
    name: string;
    size: number;
    fileData: File;
}