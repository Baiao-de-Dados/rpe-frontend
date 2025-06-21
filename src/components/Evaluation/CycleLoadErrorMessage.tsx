import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Typography from '../Typography';
import CardContainer from '../CardContainer';
import Button from '../Button';

const CycleLoadErrorMessage: React.FC = () => {
    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="flex items-center justify-center min-h-[60vh] p-6">
            <CardContainer className="max-w-lg mx-auto text-center border-2 border-neutral-200">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-error-500" />
                    </div>
                </div>

                <Typography variant="h2" className="mb-4">
                    Ops! Algo deu errado
                </Typography>

                <Typography
                    variant="body"
                    color="muted"
                    className="mb-6 leading-relaxed"
                >
                    Não foi possível carregar as informações do ciclo de
                    avaliação. Verifique sua conexão e tente novamente.
                </Typography>

                <div className="space-y-4 mb-6">
                    <Button
                        variant="primary"
                        onClick={handleRetry}
                        className="w-full gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Tentar novamente
                    </Button>
                </div>

                <CardContainer
                    className="bg-neutral-50 border border-neutral-200"
                    noPadding
                >
                    <div className="p-4">
                        <Typography
                            variant="body"
                            color="muted"
                            className="leading-relaxed"
                        >
                            <span className="font-semibold">
                                Precisa de ajuda?
                            </span>{' '}
                            Se o problema persistir, entre em contato com o
                            suporte técnico.
                        </Typography>
                    </div>
                </CardContainer>
            </CardContainer>
        </div>
    );
};

export default CycleLoadErrorMessage;
