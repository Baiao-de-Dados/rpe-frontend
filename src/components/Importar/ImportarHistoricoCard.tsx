import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Trash, FileUp } from 'lucide-react';

import formatSize from './utils/formatSize';
import { importEvaluations } from '../../services/api/import'; // Importar a função para chamar o backend

import type { FileItem } from '../../types/file';

import CardContainer from '../common/CardContainer';

import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';

const ImportarHistoricoCard = () => {
    const { variants } = useOptimizedAnimation();

    const inputRef = useRef<HTMLInputElement>(null);

    const [files, setFiles] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
    const [message, setMessage] = useState<string | null>(null); // Estado para exibir mensagens de sucesso ou erro

    const handleFiles = (fileList: FileList | null) => {
        if (!fileList) return;
        const newFiles: FileItem[] = Array.from(fileList).map((file: File) => ({
            name: file.name,
            size: file.size,
            fileData: file, // Adicionar o arquivo original para envio
            file: async () => Promise.resolve(file.name), // Implementar o método file
        }));
        setFiles(prev => [...prev, ...newFiles]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
        if (inputRef.current) inputRef.current.value = '';
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleRemove = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setLoading(true);
        setMessage(null);

        try {
            const responses = await Promise.all(
                files.map((fileItem: FileItem) => importEvaluations(fileItem.fileData)) // Enviar cada arquivo para o backend
            );
            setMessage(`${responses.length} arquivo(s) enviado(s) com sucesso.`);
            setFiles([]); // Limpar os arquivos após o envio
        } catch (error: any) {
            console.error('Erro ao enviar os arquivos:', error);
            setMessage(
                error.response?.data?.message || 'Erro ao enviar os arquivos. Tente novamente.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div variants={variants.animatedCard} initial="hidden" animate="visible">
            <CardContainer className="w-full">
                <div
                    className={`border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center py-8 px-4 mb-6 cursor-pointer hover:border-primary-500 transition ${
                        files.length === 0 ? 'h-120' : files.length === 1 ? 'h-82.5' : 'h-60'
                    }`}
                    onClick={() => inputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={e => e.preventDefault()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".xlsx,.xls"
                        multiple
                        className="hidden"
                        onChange={handleInputChange}
                    />
                    <div className="flex flex-col items-center">
                        <FileUp color="#08605F" width={64} height={64} className="mb-2" />
                        <span className="font-semibold text-lg mb-1">Escolha um arquivo</span>
                        <span className="text-gray-500 text-sm">
                            Clique para procurar ou arraste e solte seu arquivo .xlsx ou .xls
                        </span>
                    </div>
                </div>
                {files.length > 0 && (
                    <div className="rounded-xl overflow-hidden">
                        <div className="flex font-semibold text-gray-700 px-4 text-center justify-between bg-white sticky top-0 z-10">
                            <span className="w-40 text-center">Nome do arquivo</span>
                            <div className="flex justify-between items-center w-55 px-4">
                                <span className="w-40 text-center">Tamanho</span>
                                <span className="w-32 text-center">Apagar</span>
                            </div>
                        </div>
                        <div className={`${files.length >= 3 ? 'max-h-48 overflow-y-auto' : ''}`}>
                            {files.map((file, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center border border-gray-200 rounded-2xl my-3 bg-white justify-between"
                                >
                                    <span
                                        title={file.name}
                                        className="w-155 font-semibold text-lg py-6 truncate text-start pl-8 pr-8"
                                    >
                                        {file.name}
                                    </span>
                                    <div className="flex justify-between items-center w-55 pr-7">
                                        <span className="w-40 text-gray-500 text-base text-center">
                                            {formatSize(file.size)}
                                        </span>
                                        <div className="w-32 flex justify-center items-center">
                                            <button
                                                title="Remover"
                                                className="text-red-500 hover:text-red-700 cursor-pointer"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    handleRemove(idx);
                                                }}
                                            >
                                                <Trash className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {files.length >= 0 && (
                    <div className="flex flex-col items-center mt-6">
                        <button
                            onClick={handleUpload}
                            disabled={files.length === 0 || loading}
                            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-xl shadow transition disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
                        >
                            {loading ? 'Enviando...' : 'Enviar Arquivos'}
                        </button>
                        {message && <p className="mt-4 text-center">{message}</p>}
                    </div>
                )}
            </CardContainer>
        </motion.div>
    );
};

export default ImportarHistoricoCard;
