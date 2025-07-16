import api from '.';

export const importEvaluations = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await api.post('/import/evaluations', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Retorna a resposta do backend
    } catch (error: any) {
        console.error('Erro na requisição:', error);
        throw error; // Propaga o erro para o frontend
    }
};
