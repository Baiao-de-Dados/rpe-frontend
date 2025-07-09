import Typography from "../../common/Typography";

interface NoEvaluationMessageProps {
    message?: string;
}

function NoEvaluationMessage({ message }: NoEvaluationMessageProps) {
    return (
        <div className="w-full flex flex-col items-center justify-center py-12">
            <Typography variant="body" className="text-gray-400 text-center text-lg">
                {message || 'Nenhuma avaliação disponível para este ciclo.'}
            </Typography>
        </div>
    );
}

export default NoEvaluationMessage;
