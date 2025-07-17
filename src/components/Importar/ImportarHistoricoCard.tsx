import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Trash, FileUp } from 'lucide-react';

import formatSize from './utils/formatSize';
import { importEvaluations } from '../../services/api/import'; // Importar a função para chamar o backend
import { useToast } from '../../hooks/useToast'; // Importar o hook useToast

import type { FileItem } from '../../types/file';

import CardContainer from '../common/CardContainer';

import { useOptimizedAnimation } from '../../hooks/useOptimizedAnimation';

const ImportarHistoricoCard = () => {
    const { variants } = useOptimizedAnimation();
    const { showToast } = useToast(); // Usar o hook useToast para exibir mensagens

    const inputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<FileItem | null>(null); // Alterado para aceitar apenas um arquivo
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

    const handleFile = (file: File | null) => {
        if (!file) return;
        const newFile: FileItem = {
            name: file.name,
            size: file.size,
            fileData: file, // Adicionar o arquivo original para envio
            file: async () => Promise.resolve(file.name), // Implementar o método file
        };
        setFile(newFile); // Substituir o arquivo anterior
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]); // Aceitar apenas o primeiro arquivo
        }
        if (inputRef.current) inputRef.current.value = '';
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]); // Aceitar apenas o primeiro arquivo
        }
    };

    const handleRemove = () => {
        setFile(null); // Remover o arquivo selecionado
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);

        try {
            await importEvaluations(file.fileData); // Enviar o arquivo para o backend
            showToast('Arquivo importado com sucesso!', 'success', {
                title: 'Sucesso',
                duration: 4000,
            }); // Exibir mensagem de sucesso
            setFile(null); // Limpar o arquivo após o envio
        } catch (error: unknown) {
            console.error('Erro ao enviar o arquivo:', error);
            const errorMessage =
                error instanceof Error && 'response' in error && error.response?.data?.message 
                    ? error.response.data.message 
                    : 'Erro ao importar o arquivo. Tente novamente mais tarde!';
            showToast(errorMessage, 'error', {
                title: 'Erro ao importar',
                duration: -1,
            }); // Exibir mensagem de erro
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div variants={variants.animatedCard} initial="hidden" animate="visible">
            <CardContainer className="w-full">
                <div
                    className={`border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center py-8 px-4 mb-6 cursor-pointer hover:border-primary-500 transition ${
                        !file ? 'h-120' : 'h-82.5'
                    }`}
                    onClick={() => inputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={e => e.preventDefault()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".xlsx,.xls"
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
                {file && (
                    <div className="rounded-xl overflow-hidden">
                        <div className="flex items-center border border-gray-200 rounded-2xl my-3 bg-white justify-between">
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
                                        onClick={handleRemove}
                                    >
                                        <Trash className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex flex-col items-center mt-6">
                    <button
                        onClick={handleUpload}
                        disabled={!file || loading}
                        className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-xl shadow transition disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
                    >
                        {loading ? 'Enviando...' : 'Enviar Arquivo'}
                    </button>
                </div>
            </CardContainer>
        </motion.div>
    );
};

export default ImportarHistoricoCard;
